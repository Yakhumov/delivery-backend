import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // ───── Родительские категории (10 штук) ─────
  await prisma.category.createMany({
    data: [
      {
        id: 1,
        name: "Молочные продукты",
        imageUrl: "/images/categories/Молочка.webp",
      },
      {
        id: 2,
        name: "Овощи и фрукты",
        imageUrl: "/images/categories/Овощи и фрукты.webp",
      },
      {
        id: 3,
        name: "Чай кофе",
        imageUrl: "/images/categories/Чай кофе (1).webp",
      },
      { id: 4, name: "Бакалея", imageUrl: "/images/categories/Бакалея.webp" },
      {
        id: 5,
        name: "Замороженные продукты",
        imageUrl: "/images/categories/Замороженные продукты.webp",
      },
      { id: 6, name: "Морепродукты", imageUrl: "/images/categories/Рыба.webp" },
      {
        id: 7,
        name: "Вода и напитки",
        imageUrl: "/images/categories/Напитки.webp",
      },
      { id: 8, name: "Сладости", imageUrl: "/images/categories/Сладости.webp" },
      {
        id: 9,
        name: "Снеки и чипсы",
        imageUrl: "/images/categories/Снеки и чипсы.webp",
      },
      {
        id: 10,
        name: "Хлеб и выпечка",
        imageUrl: "/images/categories/Хлеб и выпечка.webp",
      },
    ],
  });

  // ───── Подкатегории ─────
  await prisma.category.createMany({
    data: [
      // Молочные продукты (1)
      { id: 11, name: "Молоко", imageUrl: null, parentId: 1 },
      { id: 12, name: "Кефир и йогурты", imageUrl: null, parentId: 1 },
      { id: 13, name: "Творог и сыры", imageUrl: null, parentId: 1 },
      { id: 14, name: "Сметана и масло", imageUrl: null, parentId: 1 },
      { id: 15, name: "Яйца", imageUrl: null, parentId: 1 },

      // Замороженные продукты (5)
      { id: 54, name: "Пельмени", imageUrl: null, parentId: 5 },
      { id: 55, name: "Манты", imageUrl: null, parentId: 5 },
      { id: 56, name: "Вареники", imageUrl: null, parentId: 5 },
      { id: 57, name: "Замороженное мясо", imageUrl: null, parentId: 5 },

      // Овощи и фрукты (2)
      { id: 21, name: "Фрукты", imageUrl: null, parentId: 2 },
      { id: 22, name: "Овощи", imageUrl: null, parentId: 2 },

      // Бакалея (4)
      { id: 41, name: "Крупы", imageUrl: null, parentId: 4 },
      { id: 42, name: "Макароны", imageUrl: null, parentId: 4 },
      { id: 43, name: "Масла", imageUrl: null, parentId: 4 },
      { id: 44, name: "Сахар и соль", imageUrl: null, parentId: 4 },

      // Морепродукты (6)
      { id: 61, name: "Рыба", imageUrl: null, parentId: 6 },
      { id: 62, name: "Морепродукты", imageUrl: null, parentId: 6 },
      { id: 63, name: "Консервы", imageUrl: null, parentId: 6 },

      // Вода и напитки (7)
      { id: 71, name: "Вода", imageUrl: null, parentId: 7 },
      { id: 72, name: "Соки", imageUrl: null, parentId: 7 },
      { id: 73, name: "Газированные", imageUrl: null, parentId: 7 },
      { id: 74, name: "Энергетики", imageUrl: null, parentId: 7 },

      // Сладости (8)
      { id: 81, name: "Шоколад", imageUrl: null, parentId: 8 },
      { id: 82, name: "Конфеты", imageUrl: null, parentId: 8 },
      { id: 83, name: "Мармелад и желе", imageUrl: null, parentId: 8 },

      // Снеки и чипсы (9)
      { id: 91, name: "Чипсы", imageUrl: null, parentId: 9 },
      { id: 92, name: "Орехи", imageUrl: null, parentId: 9 },
      { id: 93, name: "Сухарики", imageUrl: null, parentId: 9 },

      // Чай кофе (3)
      { id: 31, name: "Чай", imageUrl: null, parentId: 3 },
      { id: 32, name: "Кофе", imageUrl: null, parentId: 3 },

      // Хлеб и выпечка (10)
      { id: 101, name: "Хлеб", imageUrl: null, parentId: 10 },
      { id: 102, name: "Выпечка", imageUrl: null, parentId: 10 },
    ],
  });

  // ───── Продукты (привязаны к подкатегориям) ─────
  await prisma.product.createMany({
    data: [
      // Молоко (11)
      {
        id: 1,
        name: "Молоко зеленое село 3.2% 1л",
        price: 89,
        categoryId: 11,
        imageUrl: "/images/products/product-1.png",
      },

      // Кефир и йогурты (12)
      {
        id: 2,
        name: "Кефир 2.5% 1л",
        price: 79,
        categoryId: 12,
        imageUrl: "/images/products/product-2.png",
      },
      // Творог и сыры (13)
      {
        id: 3,
        name: "Творог 5% 300г",
        price: 129,
        categoryId: 13,
        imageUrl: "/images/products/product-3.png",
      },
      // Сметана и масло (14)
      {
        id: 4,
        name: "Сметана 20% 400г",
        price: 109,
        categoryId: 14,
        imageUrl: "/images/products/product-4.png",
      },
      {
        id: 6,
        name: "Масло сливочное 200г",
        price: 149,
        categoryId: 14,
        imageUrl: "/images/products/product-6.png",
      },
      // Яйца (15)
      {
        id: 5,
        name: "Яйца С1 10шт",
        price: 99,
        categoryId: 15,
        imageUrl: "/images/products/product-5.png",
      },

      // Пельмени (54)
      {
        id: 23,
        name: "Пельмени 1кг",
        price: 320,
        categoryId: 54,
        imageUrl: "/images/products/product-23.png",
      },
      // Манты (55)
      {
        id: 24,
        name: "Манты с мясом 1кг",
        price: 400,
        categoryId: 55,
        imageUrl: "/images/products/product-24.png",
      },
      // Вареники (56)
      {
        id: 25,
        name: "Вареники с картошкой 800г",
        price: 359,
        categoryId: 56,
        imageUrl: "/images/products/product-25.png",
      },

      // Фрукты (21)
      {
        id: 7,
        name: "Яблоки 1кг",
        price: 99,
        categoryId: 21,
        imageUrl: "/images/products/product-7.png",
      },
      {
        id: 8,
        name: "Бананы 1кг",
        price: 79,
        categoryId: 21,
        imageUrl: "/images/products/product-8.png",
      },
      {
        id: 47,
        name: "Киви 1кг",
        price: 150,
        categoryId: 21,
        imageUrl: "/images/products/product-47.png",
      },
      {
        id: 48,
        name: "Груши 1кг",
        price: 170,
        categoryId: 21,
        imageUrl: "/images/products/product-48.png",
      },
      {
        id: 50,
        name: "Виноград белый 500г",
        price: 170,
        categoryId: 21,
        imageUrl: "/images/products/product-50.png",
      },
      {
        id: 51,
        name: "Виноград красный 1кг",
        price: 270,
        categoryId: 21,
        imageUrl: "/images/products/product-51.png",
      },

      // Овощи (22)
      {
        id: 9,
        name: "Помидоры 1кг",
        price: 119,
        categoryId: 22,
        imageUrl: "/images/products/product-9.png",
      },
      {
        id: 10,
        name: "Огурцы 1кг",
        price: 89,
        categoryId: 22,
        imageUrl: "/images/products/product-10.png",
      },
      {
        id: 11,
        name: "Морковь 1кг",
        price: 49,
        categoryId: 22,
        imageUrl: "/images/products/product-11.png",
      },
      {
        id: 12,
        name: "Картофель 2кг",
        price: 79,
        categoryId: 22,
        imageUrl: "/images/products/product-12.png",
      },
      // Крупы (41)
      {
        id: 17,
        name: "Рис длиннозерный 1кг",
        price: 99,
        categoryId: 41,
        imageUrl: "/images/products/product-17.png",
      },
      {
        id: 18,
        name: "Гречка 1кг",
        price: 89,
        categoryId: 41,
        imageUrl: "/images/products/product-18.png",
      },
      // Макароны (42)
      {
        id: 19,
        name: "Макароны спагетти 500г",
        price: 69,
        categoryId: 42,
        imageUrl: "/images/products/product-19.png",
      },
      // Масла (43)
      {
        id: 20,
        name: "Масло подсолнечное 1л",
        price: 129,
        categoryId: 43,
        imageUrl: "/images/products/product-20.png",
      },
      // Сахар и соль (44)
      {
        id: 21,
        name: "Сахар 450г",
        price: 79,
        categoryId: 44,
        imageUrl: "/images/products/product-21.png",
      },

      // Рыба (61)
      {
        id: 26,
        name: "Лосось стейк 500г",
        price: 599,
        categoryId: 61,
        imageUrl: "/images/products/product-26.png",
      },
      // Морепродукты (62)
      {
        id: 28,
        name: "Креветки 500г",
        price: 449,
        categoryId: 62,
        imageUrl: "/images/products/product-28.png",
      },
      // Консервы (63)
      {
        id: 27,
        name: "Тунец консервированный",
        price: 149,
        categoryId: 63,
        imageUrl: "/images/products/product-27.png",
      },

      // Вода (71)
      {
        id: 29,
        name: "Вода минеральная 1.5л",
        price: 59,
        categoryId: 71,
        imageUrl: "/images/products/product-29.png",
      },
      // Соки (72)
      {
        id: 30,
        name: "Сок апельсиновый 1л",
        price: 119,
        categoryId: 72,
        imageUrl: "/images/products/product-30.png",
      },
      {
        id: 52,
        name: "Палпи Апельсин 900мл",
        price: 100,
        categoryId: 72,
        imageUrl: "/images/products/product-52.png",
      },
      {
        id: 53,
        name: "Нектар Вико 1л мультифрукт с мякотью",
        price: 139,
        categoryId: 72,
        imageUrl: "/images/products/product-53.png",
      },
      {
        id: 54,
        name: "Нектар Вико Персик 1л",
        price: 159,
        categoryId: 72,
        imageUrl: "/images/products/product-54.png",
      },
      // Газированные (73)
      {
        id: 31,
        name: "Кола 1.5л",
        price: 99,
        categoryId: 73,
        imageUrl: "/images/products/product-31.png",
      },
      {
        id: 55,
        name: "Kinza Orange газированный 360мл",
        price: 100,
        categoryId: 73,
        imageUrl: "/images/products/product-55.png",
      },
      // Энергетики (74)
      {
        id: 56,
        name: "Адреналин Раш 0.33л ж/б",
        price: 150,
        categoryId: 74,
        imageUrl: "/images/products/product-56.png",
      },
      {
        id: 57,
        name: "Red Bull Белый Персик 0.25л ж/б",
        price: 144,
        categoryId: 74,
        imageUrl: "/images/products/product-57.png",
      },

      // Чай (31)
      {
        id: 32,
        name: "Зелёный чай 100г",
        price: 149,
        categoryId: 31,
        imageUrl: "/images/products/product-32.png",
      },
      {
        id: 43,
        name: "Чай МК 250г",
        price: 210,
        categoryId: 31,
        imageUrl: "/images/products/product-43.png",
      },
      {
        id: 44,
        name: "Чай Марьям брокен 100г",
        price: 142,
        categoryId: 31,
        imageUrl: "/images/products/product-44.png",
      },
      // Кофе (32)
      {
        id: 45,
        name: "Кофе Якобс 95г",
        price: 453,
        categoryId: 32,
        imageUrl: "/images/products/product-45.png",
      },
      {
        id: 46,
        name: "Кофе Нескафе голд 95г",
        price: 550,
        categoryId: 32,
        imageUrl: "/images/products/product-46.png",
      },

      // Шоколад (81)
      {
        id: 33,
        name: "Шоколад Молочный 100г",
        price: 99,
        categoryId: 81,
        imageUrl: "/images/products/product-33.png",
      },
      {
        id: 58,
        name: "Шоколад молочный Alpen Gold",
        price: 99,
        categoryId: 81,
        imageUrl: "/images/products/product-58.png",
      },

      // Конфеты (82)
      {
        id: 34,
        name: "Конфеты Мишка 200г",
        price: 199,
        categoryId: 82,
        imageUrl: "/images/products/product-34.png",
      },
      // Мармелад и желе (83)
      {
        id: 35,
        name: "Мармелад 300г",
        price: 129,
        categoryId: 83,
        imageUrl: "/images/products/product-35.png",
      },

      // Чипсы (91)
      {
        id: 36,
        name: "Чипсы Лэйс 150г",
        price: 99,
        categoryId: 91,
        imageUrl: "/images/products/product-36.png",
      },
      // Орехи (92)
      {
        id: 37,
        name: "Орешки солёные 200г",
        price: 149,
        categoryId: 92,
        imageUrl: "/images/products/product-37.png",
      },
      // Сухарики (93)
      {
        id: 38,
        name: "Сухарики ржаные 100г",
        price: 59,
        categoryId: 93,
        imageUrl: "/images/products/product-38.png",
      },

      // Хлеб (101)
      {
        id: 39,
        name: "Хлеб белый нарезной",
        price: 49,
        categoryId: 101,
        imageUrl: "/images/products/product-39.png",
      },
      {
        id: 42,
        name: "Хлеб Бородинский",
        price: 59,
        categoryId: 101,
        imageUrl: "/images/products/product-42.png",
      },
      // Выпечка (102)
      {
        id: 40,
        name: "Батон классический",
        price: 39,
        categoryId: 102,
        imageUrl: "/images/products/product-40.png",
      },
      {
        id: 41,
        name: "Круассан масляный",
        price: 69,
        categoryId: 102,
        imageUrl: "/images/products/product-41.png",
      },
    ],
  });

  console.log("✅ Seed: 10 категорий + 32 подкатегории + 53 товара");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
