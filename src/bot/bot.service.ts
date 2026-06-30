import { Injectable, OnModuleInit } from "@nestjs/common";
import * as TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;

  onModuleInit() {
    if (this.bot) return; // 🔥 ВАЖНО

    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      throw new Error("TELEGRAM_BOT_TOKEN is missing");
    }
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
      polling: true,
    });


    // 👉 обработка кнопок
    this.bot.on("callback_query", async (query) => {
      const data = query.data;
      const chatId = query.message?.chat.id;

      if (!data || !chatId) return;

      const [action, orderId] = data.split(":");

      try {
        await fetch(`${process.env.BASE_URL}/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: action }),
        });

        await this.bot.answerCallbackQuery(query.id, {
          text: "Статус обновлён ✅",
        });

        await this.bot.sendMessage(chatId, `Заказ #${orderId} → ${action}`);
      } catch (e) {
        await this.bot.answerCallbackQuery(query.id, {
          text: "Ошибка ❌",
        });

        await this.bot.sendMessage(
          chatId,
          `Ошибка при обновлении заказа #${orderId}`,
        );
      }
    });
  }

 async sendNewOrder(order: any) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) {
    console.error('TELEGRAM_CHAT_ID is not set');
    return;
  }

  const itemLines = order.items
    .map((i: any) => `• ${i.product.name} × ${i.quantity} — ${i.price * i.quantity} ₽`)
    .join('\n');

  const total = order.items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity, 0
  );

  const text = `
🆕 Новый заказ #${order.id}

👤 ${order.name}
📞 ${order.phone}
📍 ${order.address}

${itemLines}

💰 Итого: ${total} ₽ 
  `.trim();

  await this.bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✅ Принять', callback_data: `accepted:${order.id}` },
          { text: '❌ Отклонить', callback_data: `rejected:${order.id}` },
        ],
        [
          { text: '🚚 В пути', callback_data: `delivering:${order.id}` },
          { text: '📦 Доставлено', callback_data: `delivered:${order.id}` },
        ],
      ],
    },
  });
}
}
