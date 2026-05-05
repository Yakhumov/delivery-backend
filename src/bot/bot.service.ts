import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;

  onModuleInit() {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, {
      polling: true,
    });

    // 👉 получить chatId
    this.bot.on('message', (msg) => {
      console.log('CHAT_ID:', msg.chat.id);
    });

    // 👉 обработка кнопок
    this.bot.on('callback_query', async (query) => {
      const data = query.data;
      const chatId = query.message?.chat.id;

      if (!data || !chatId) return;

      const [action, orderId] = data.split(':');

      try {
        await fetch(`${process.env.BASE_URL}/orders/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: action }),
        });

        await this.bot.answerCallbackQuery(query.id, {
          text: 'Статус обновлён ✅',
        });

        await this.bot.sendMessage(
          chatId,
          `Заказ #${orderId} → ${action}`,
        );
      } catch (e) {
        await this.bot.answerCallbackQuery(query.id, {
          text: 'Ошибка ❌',
        });

        await this.bot.sendMessage(
          chatId,
          `Ошибка при обновлении заказа #${orderId}`,
        );
      }
    });
  }

  async sendNewOrder(order: any) {
    const text = `
🆕 Новый заказ

👤 ${order.name}
📞 ${order.phone}
📍 ${order.address}

💰 ${order.total ?? '—'} ₽
`;

    await this.bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, text, {
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