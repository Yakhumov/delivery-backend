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
      { id: 1,  name: "Молочные продукты", imageUrl: "/images/categories/Молочка.jpg" },
      { id: 2,  name: "Овощи и фрукты",    imageUrl: "/images/categories/Овощи и фрукты.jpg" },
      { id: 3,  name: "Готовая еда",        imageUrl: "/images/categories/Готовая еда.jpg" },
      { id: 4,  name: "Бакалея",            imageUrl: "/images/categories/Бакалея.jpg" },
      { id: 5,  name: "Мясо и птица",       imageUrl: "/images/categories/Мясо.jpg" },
      { id: 6,  name: "Морепродукты",       imageUrl: "/images/categories/Рыба.jpg" },
      { id: 7,  name: "Вода и напитки",     imageUrl: "/images/categories/Напитки.jpg" },
      { id: 8,  name: "Сладости",           imageUrl: "/images/categories/Сладости.jpg" },
      { id: 9,  name: "Снеки и чипсы",      imageUrl: "/images/categories/Снеки.jpg" },
      { id: 10, name: "Хлеб и выпечка",     imageUrl: "/images/categories/Хлеб.jpg" },
    ],
  });

  // ───── Подкатегории ─────
  await prisma.category.createMany({
    data: [
      // Молочные продукты (1)
      { id: 11, name: "Молоко",             imageUrl: null, parentId: 1 },
      { id: 12, name: "Кефир и йогурты",    imageUrl: null, parentId: 1 },
      { id: 13, name: "Творог и сыры",      imageUrl: null, parentId: 1 },
      { id: 14, name: "Сметана и масло",    imageUrl: null, parentId: 1 },
      { id: 15, name: "Яйца",               imageUrl: null, parentId: 1 },

      // Овощи и фрукты (2)
      { id: 21, name: "Фрукты",             imageUrl: null, parentId: 2 },
      { id: 22, name: "Овощи",              imageUrl: null, parentId: 2 },

      // Готовая еда (3)
      { id: 31, name: "Пицца",              imageUrl: null, parentId: 3 },
      { id: 32, name: "Салаты",             imageUrl: null, parentId: 3 },
      { id: 33, name: "Суши и роллы",       imageUrl: null, parentId: 3 },
      { id: 34, name: "Горячие блюда",      imageUrl: null, parentId: 3 },

      // Бакалея (4)
      { id: 41, name: "Крупы",              imageUrl: null, parentId: 4 },
      { id: 42, name: "Макароны",           imageUrl: null, parentId: 4 },
      { id: 43, name: "Масла",              imageUrl: null, parentId: 4 },
      { id: 44, name: "Сахар и соль",       imageUrl: null, parentId: 4 },

      // Мясо и птица (5)
      { id: 51, name: "Птица",              imageUrl: null, parentId: 5 },
      { id: 52, name: "Говядина",           imageUrl: null, parentId: 5 },
      { id: 53, name: "Колбасы и сосиски",  imageUrl: null, parentId: 5 },

      // Морепродукты (6)
      { id: 61, name: "Рыба",               imageUrl: null, parentId: 6 },
      { id: 62, name: "Морепродукты",       imageUrl: null, parentId: 6 },
      { id: 63, name: "Консервы",           imageUrl: null, parentId: 6 },

      // Вода и напитки (7)
      { id: 71, name: "Вода",               imageUrl: null, parentId: 7 },
      { id: 72, name: "Соки",               imageUrl: null, parentId: 7 },
      { id: 73, name: "Газированные",       imageUrl: null, parentId: 7 },
      { id: 74, name: "Чай и кофе",         imageUrl: "/images/categories/Чай кофе.jpg", parentId: 7 },

      // Сладости (8)
      { id: 81, name: "Шоколад",            imageUrl: null, parentId: 8 },
      { id: 82, name: "Конфеты",            imageUrl: null, parentId: 8 },
      { id: 83, name: "Мармелад и желе",    imageUrl: null, parentId: 8 },

      // Снеки и чипсы (9)
      { id: 91, name: "Чипсы",              imageUrl: null, parentId: 9 },
      { id: 92, name: "Орехи",              imageUrl: null, parentId: 9 },
      { id: 93, name: "Сухарики",           imageUrl: null, parentId: 9 },

      // Хлеб и выпечка (10)
      { id: 101, name: "Хлеб",             imageUrl: null, parentId: 10 },
      { id: 102, name: "Выпечка",          imageUrl: null, parentId: 10 },
    ],
  });

  // ───── Продукты (привязаны к подкатегориям) ─────
  await prisma.product.createMany({
    data: [
      // Молоко (11)
      { id: 1, name: "Молоко зеленое село 3.2% 1л", price: 89,  categoryId: 11, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7uPXfDQ-fZAXVhQuTNBAUkCLeoWj6fbJcBQ&s" },
      // Кефир и йогурты (12)
      { id: 2, name: "Кефир 2.5% 1л",               price: 79,  categoryId: 12, imageUrl: "https://da-mart.ru/storage/catalog/goods/c043cab0ab1d01988ca4bfb63370eb18.w220h220.jpeg" },
      // Творог и сыры (13)
      { id: 3, name: "Творог 5% 300г",               price: 129, categoryId: 13, imageUrl: "https://resizer.mail.ru/p/ebfbeffa-aa44-595e-abba-2d6009da1edb/AQA5t86KbCPIvU32jRTCBH0F5xdI6mPvR62D2QeUTPqYKAbJb3NC2rX0GJsNlL089MZMQbdSh6hb1ycXgO0ZZ48b7Tc.jpg" },
      // Сметана и масло (14)
      { id: 4, name: "Сметана 20% 400г",             price: 109, categoryId: 14, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ke3vc7u6H4rxt2wJKztRVdByZWinYbdiPA&s" },
      { id: 6, name: "Масло сливочное 200г",         price: 149, categoryId: 14, imageUrl: "https://apeti.ru/upload/resize_cache/iblock/749/ysujjvurb55urgn56uch0ds0js6557xs/218_218_0/maslo_sladko_slivochnoe_nesolenoe_brest_litovsk_82_5_180_g_bzmzh.jpg" },
      // Яйца (15)
      { id: 5, name: "Яйца С1 10шт",                 price: 99,  categoryId: 15, imageUrl: "https://agrokomplexshop.ru/upload/iblock/15e/o2931tv0d6dpi52q0s6abloatgmmkz3x/845081c2-033e-11e4-9720-782bcb24e027_d591dafc-2611-11ee-ab39-00155d0a9c17.jpg" },

      // Фрукты (21)
      { id: 7,  name: "Яблоки 1кг",   price: 99, categoryId: 21, imageUrl: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/101/480/338/641/317/35/100029281056b0.jpg" },
      { id: 8,  name: "Бананы 1кг",   price: 79, categoryId: 21, imageUrl: "https://fruitsparadise.ru/wp-content/uploads/2019/02/Banana1-1.jpg" },
      // Овощи (22)
      { id: 9,  name: "Помидоры 1кг", price: 119, categoryId: 22, imageUrl: "https://sibprod.info/upload/resize_cache/iblock/6c7/1680_1050_19d1669f6609e6dfcaeac28e5aab5b3be/6c7d8d259fc5a7a5b05941bdb0abc788.jpg" },
      { id: 10, name: "Огурцы 1кг",   price: 89,  categoryId: 22, imageUrl: "https://sibprod.info/upload/resize_cache/iblock/b85/1800_1200_19d1669f6609e6dfcaeac28e5aab5b3be/b85a11f31960948145e43fde0bbdb5b8.jpg" },
      { id: 11, name: "Морковь 1кг",  price: 49,  categoryId: 22, imageUrl: "https://ir.ozone.ru/s3/multimedia-1-2/c1000/7557622238.jpg" },
      { id: 12, name: "Картофель 2кг",price: 79,  categoryId: 22, imageUrl: "https://img.megastroycdn.ru/_8jRn3ruDs0/products/e678d7be60db0da91725ef45d07f3795227b22549f35817904eb2c805c9196a9/491849_1.jpg" },

      // Пицца (31)
      { id: 13, name: "Пицца Маргарита",      price: 399, categoryId: 31, imageUrl: "https://s3v3dn.elitibi.ru/static/8044/square/558318711a3ec047ec662ead7031e82c.jpg?ca001a5ac4c893b0f8b03437b1d94ba4" },
      // Салаты (32)
      { id: 14, name: "Цезарь с курицей",     price: 349, categoryId: 32, imageUrl: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/325/767/344/419/175/9/100027524214b0.jpg" },
      // Суши и роллы (33)
      { id: 15, name: "Суши сет 20шт",        price: 699, categoryId: 33, imageUrl: "https://sushispace74.ru/upload/56283d7a-3112-f51b-2de9-67dd34f72291_image_c" },
      // Горячие блюда (34)
      { id: 16, name: "Плов с говядиной 500г",price: 299, categoryId: 34, imageUrl: "https://yastatic.net/avatars/get-grocery-goods/2888787/5f0074e7-e81c-4177-bdfa-1a14c85e603f/500x500-orig" },

      // Крупы (41)
      { id: 17, name: "Рис длиннозерный 1кг",  price: 99,  categoryId: 41, imageUrl: "https://tsx.x5static.net/i/400x400-fit/xdelivery/files/ee/64/169b9428cca182eddc132410c15b.jpg" },
      { id: 18, name: "Гречка 1кг",             price: 89,  categoryId: 41, imageUrl: "https://tsx.x5static.net/i/400x400-fit/xdelivery/files/ee/64/169b9428cca182eddc132410c15b.jpg" },
      // Макароны (42)
      { id: 19, name: "Макароны спагетти 500г", price: 69,  categoryId: 42, imageUrl: "https://krasnodar.svetofors.ru/upload/catalog/ru/0_33083400_1662458065.jpg" },
      // Масла (43)
      { id: 20, name: "Масло подсолнечное 1л",  price: 129, categoryId: 43, imageUrl: "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/d0/97/0c60cea3725faee4b90edf76c26e.jpg" },
      // Сахар и соль (44)
      { id: 21, name: "Сахар 450г",             price: 79,  categoryId: 44, imageUrl: "https://ir.ozone.ru/s3/multimedia-1-8/c400/7725447152.jpg" },

      // Птица (51)
      { id: 22, name: "Куриное филе 1кг",       price: 299, categoryId: 51, imageUrl: "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/14/9e/307d392f38de5f322d523cbb2f10.jpg" },
      // Говядина (52)
      { id: 23, name: "Говядина вырезка 1кг",   price: 699, categoryId: 52, imageUrl: "https://ir.ozone.ru/s3/multimedia-1-a/c400/8247255238.jpg" },
      // Колбасы и сосиски (53)
      { id: 24, name: "Колбаса Аргунский 400г", price: 249, categoryId: 53, imageUrl: "https://parhato.ru/wp-content/uploads/2022/11/14e2ee5a611a11eda27800155d01c83b_d2bed86a615811ed98d100155d203202.jpg" },
      { id: 25, name: "Сосиски молочные 500г",  price: 199, categoryId: 53, imageUrl: "https://kochevniki-halal.ru/wp-content/uploads/2024/08/sosiski-slivochnye-1.jpg" },

      // Рыба (61)
      { id: 26, name: "Лосось стейк 500г",      price: 599, categoryId: 61, imageUrl: "https://artiseafood.ru/upload/iblock/a87/a87af2159ad5f48cf757c91bf15fc42b.jpg" },
      // Морепродукты (62)
      { id: 28, name: "Креветки 500г",           price: 449, categoryId: 62, imageUrl: "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/krivety_500_g.jpg" },
      // Консервы (63)
      { id: 27, name: "Тунец консервированный",  price: 149, categoryId: 63, imageUrl: "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/tunets_konservirovannyy.jpg" },

      // Вода (71)
      { id: 29, name: "Вода минеральная 1.5л",   price: 59,  categoryId: 71, imageUrl: "https://mineralka.store/wa-data/public/shop/products/63/08/10863/images/125178/125178.970.png" },
      // Соки (72)
      { id: 30, name: "Сок апельсиновый 1л",     price: 119, categoryId: 72, imageUrl: "https://opttorg-horeca.ru/assets/images/catalog/sok/dobryj-apelsin.jpg" },
      // Газированные (73)
      { id: 31, name: "Кола 1.5л",               price: 99,  categoryId: 73, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdp8YM-y0Egy3eOu40aNXK0APIGx2qPS1ovw&s" },
      // Чай и кофе (74)
      { id: 32, name: "Зелёный чай 100г",        price: 149, categoryId: 74, imageUrl: "https://www.deloks.ru/upload/iblock/2bc/ffunwh3a6o3gno3yl7qau1pogle9n547/chay_zelenyy_lipton_green_100_paketikov_v_upakovke_9_full.jpg" },

      // Шоколад (81)
      { id: 33, name: "Шоколад Молочный 100г",   price: 99,  categoryId: 81, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRST5Xw9AaI8l1LSPSdJVee3BL4iihJEpY_IQ&s" },
      // Конфеты (82)
      { id: 34, name: "Конфеты Мишка 200г",      price: 199, categoryId: 82, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL6FlSOydUjoYmL-Cygu8zg06pnQTUmWw0VA&s" },
      // Мармелад и желе (83)
      { id: 35, name: "Мармелад 300г",            price: 129, categoryId: 83, imageUrl: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/111/840/676/511/262/337/100045547788b0.jpg" },

      // Чипсы (91)
      { id: 36, name: "Чипсы Лэйс 150г",         price: 99,  categoryId: 91, imageUrl: "https://tsx.x5static.net/i/400x400-fit/xdelivery/files/94/ce/f5c48f9b5545c4c8765bb1821f8f.jpg" },
      // Орехи (92)
      { id: 37, name: "Орешки солёные 200г",      price: 149, categoryId: 92, imageUrl: "https://tsx.x5static.net/i/400x400-fit/xdelivery/files/6e/e9/02ba9056a80f3cfd40f216fe22ca.jpg" },
      // Сухарики (93)
      { id: 38, name: "Сухарики ржаные 100г",     price: 59,  categoryId: 93, imageUrl: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-42/795/820/871/215/27/100028792519b0.jpg" },

      // Хлеб (101)
      { id: 39, name: "Хлеб белый нарезной",      price: 49,  categoryId: 101, imageUrl: "https://thumbs.dreamstime.com/b/none-362830391.jpg" },
      { id: 42, name: "Хлеб Бородинский",         price: 59,  categoryId: 101, imageUrl: "https://1xleb.ru/upload/iblock/68e/68e28a1a287e21e0aedd2acfc73c9c97.JPG" },
      // Выпечка (102)
      { id: 40, name: "Батон классический",       price: 39,  categoryId: 102, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrnKzuRNvaVk1L4pkdxMMxaRKCjKWBq3hgeQ&s" },
      { id: 41, name: "Круассан масляный",        price: 69,  categoryId: 102, imageUrl: "https://thumbs.dreamstime.com/b/%D0%BA%D1%80%D1%83%D0%B0%D1%81%D1%81%D0%B0%D0%BD-%D1%81-%D0%BC%D0%B0%D1%81%D0%BB%D1%8F%D0%BD%D1%8B%D0%BC-%D0%BD%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-267932714.jpg" },
    ],
  });

  console.log("✅ Seed: 10 категорий + 33 подкатегории + 42 товара");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
