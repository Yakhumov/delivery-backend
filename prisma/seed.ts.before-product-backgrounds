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
      { id: 1,  name: "Молочные продукты", imageUrl: "/images/categories/Молочка.webp" },
      { id: 2,  name: "Овощи и фрукты",    imageUrl: "/images/categories/Овощи и фрукты.webp" },
      { id: 3,  name: "Чай кофе",        imageUrl: "/images/categories/Чай кофе (1).webp" },
      { id: 4,  name: "Бакалея",            imageUrl: "/images/categories/Бакалея.webp" },
      { id: 5,  name: "Замороженные продукты",       imageUrl: "/images/categories/Замороженные продукты.webp" },
      { id: 6,  name: "Морепродукты",       imageUrl: "/images/categories/Рыба.webp" },
      { id: 7,  name: "Вода и напитки",     imageUrl: "/images/categories/Напитки.webp" },
      { id: 8,  name: "Сладости",           imageUrl: "/images/categories/Сладости.webp" },
      { id: 9,  name: "Снеки и чипсы",      imageUrl: "/images/categories/Снеки и чипсы.webp" },
      { id: 10, name: "Хлеб и выпечка",     imageUrl: "/images/categories/Хлеб и выпечка.webp" },
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

      // Замороженные продукты (5)
      { id: 54, name: "Пельмени",              imageUrl: null, parentId: 5 },
      { id: 55, name: "Манты",                 imageUrl: null, parentId: 5 },
      { id: 56, name: "Вареники",              imageUrl: null, parentId: 5 },
      { id: 57, name: "Замороженное мясо",     imageUrl: null, parentId: 5 },
        
      // Овощи и фрукты (2)
      { id: 21, name: "Фрукты",             imageUrl: null, parentId: 2 },
      { id: 22, name: "Овощи",              imageUrl: null, parentId: 2 },

      // Бакалея (4)
      { id: 41, name: "Крупы",              imageUrl: null, parentId: 4 },
      { id: 42, name: "Макароны",           imageUrl: null, parentId: 4 },
      { id: 43, name: "Масла",              imageUrl: null, parentId: 4 },
      { id: 44, name: "Сахар и соль",       imageUrl: null, parentId: 4 },

      // Морепродукты (6)
      { id: 61, name: "Рыба",               imageUrl: null, parentId: 6 },
      { id: 62, name: "Морепродукты",       imageUrl: null, parentId: 6 },
      { id: 63, name: "Консервы",           imageUrl: null, parentId: 6 },

      // Вода и напитки (7)
      { id: 71, name: "Вода",               imageUrl: null, parentId: 7 },
      { id: 72, name: "Соки",               imageUrl: null, parentId: 7 },
      { id: 73, name: "Газированные",       imageUrl: null, parentId: 7 },

      // Сладости (8)
      { id: 81, name: "Шоколад",            imageUrl: null, parentId: 8 },
      { id: 82, name: "Конфеты",            imageUrl: null, parentId: 8 },
      { id: 83, name: "Мармелад и желе",    imageUrl: null, parentId: 8 },

      // Снеки и чипсы (9)
      { id: 91, name: "Чипсы",              imageUrl: null, parentId: 9 },
      { id: 92, name: "Орехи",              imageUrl: null, parentId: 9 },
      { id: 93, name: "Сухарики",           imageUrl: null, parentId: 9 },

      // Чай кофе (3)
      { id: 31, name: "Чай",               imageUrl: null, parentId: 3 },
      { id: 32, name: "Кофе",              imageUrl: null, parentId: 3 },

      // Хлеб и выпечка (10)
      { id: 101, name: "Хлеб",             imageUrl: null, parentId: 10 },
      { id: 102, name: "Выпечка",          imageUrl: null, parentId: 10 },


    ],
  });

  // ───── Продукты (привязаны к подкатегориям) ─────
  await prisma.product.createMany({
    data: [
      // Молоко (11)
      { id: 1, name: "Молоко зеленое село 3.2% 1л", price: 89,  categoryId: 11, imageUrl: "https://babymarket.uz/wp-content/uploads/2021/06/selo-zelenoe-moloko-32-1l.jpg" },
      // Кефир и йогурты (12)
      { id: 2, name: "Кефир 2.5% 1л",               price: 79,  categoryId: 12, imageUrl: "https://ir.ozone.ru/s3/multimedia-1-v/c1000/7557633427.jpg" },
      // Творог и сыры (13)
      { id: 3, name: "Творог 5% 300г",               price: 129, categoryId: 13, imageUrl: "https://resizer.mail.ru/p/ebfbeffa-aa44-595e-abba-2d6009da1edb/AQA5t86KbCPIvU32jRTCBH0F5xdI6mPvR62D2QeUTPqYKAbJb3NC2rX0GJsNlL089MZMQbdSh6hb1ycXgO0ZZ48b7Tc.jpg" },
      // Сметана и масло (14)
      { id: 4, name: "Сметана 20% 400г",             price: 109, categoryId: 14, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ke3vc7u6H4rxt2wJKztRVdByZWinYbdiPA&s" },
      { id: 6, name: "Масло сливочное 200г",         price: 149, categoryId: 14, imageUrl: "https://apeti.ru/upload/resize_cache/iblock/749/ysujjvurb55urgn56uch0ds0js6557xs/218_218_0/maslo_sladko_slivochnoe_nesolenoe_brest_litovsk_82_5_180_g_bzmzh.jpg" },
      // Яйца (15)
      { id: 5, name: "Яйца С1 10шт",                 price: 99,  categoryId: 15, imageUrl: "https://agrokomplexshop.ru/upload/iblock/15e/o2931tv0d6dpi52q0s6abloatgmmkz3x/845081c2-033e-11e4-9720-782bcb24e027_d591dafc-2611-11ee-ab39-00155d0a9c17.jpg" },

      // Фрукты (21)
      { id: 7,  name: "Яблоки 1кг",   price: 99, categoryId: 21, imageUrl: "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/16/82/d7a3a2fa93e8bdf02688a45c6405.jpg" },
      { id: 8,  name: "Бананы 1кг",   price: 79, categoryId: 21, imageUrl: "https://fruitsparadise.ru/wp-content/uploads/2019/02/Banana1-1.jpg" },
      { id: 47, name: "Киви 1кг",   price: 150, categoryId: 21, imageUrl: "https://media.vprok.ru/products/x700/sq/3x/sexvnv4iedn5hwbikocpquv4myvg3xsq.jpeg" },
      { id: 48, name: "Груши 1кг",   price: 170, categoryId: 21, imageUrl: "https://media.vprok.ru/products/x700/vj/p6/n2g7uqmgonmbbzj563lac3nxf66ap6vj.jpeg" },


      // Овощи (22)
      { id: 9,  name: "Помидоры 1кг", price: 119, categoryId: 22, imageUrl: "https://sibprod.info/upload/resize_cache/iblock/6c7/1680_1050_19d1669f6609e6dfcaeac28e5aab5b3be/6c7d8d259fc5a7a5b05941bdb0abc788.jpg" },
      { id: 10, name: "Огурцы 1кг",   price: 89,  categoryId: 22, imageUrl: "https://sibprod.info/upload/resize_cache/iblock/b85/1800_1200_19d1669f6609e6dfcaeac28e5aab5b3be/b85a11f31960948145e43fde0bbdb5b8.jpg" },
      { id: 11, name: "Морковь 1кг",  price: 49,  categoryId: 22, imageUrl: "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/51/d7/0b72908e8078619617f924081d51.jpg" },
      { id: 12, name: "Картофель 2кг",price: 79,  categoryId: 22, imageUrl: "https://img.megastroycdn.ru/_8jRn3ruDs0/products/e678d7be60db0da91725ef45d07f3795227b22549f35817904eb2c805c9196a9/491849_1.jpg" },

      // Крупы (41)
      { id: 17, name: "Рис длиннозерный 1кг",  price: 99,  categoryId: 41, imageUrl: "https://tsx.x5static.net/i/400x400-fit/xdelivery/files/ee/64/169b9428cca182eddc132410c15b.jpg" },
      { id: 18, name: "Гречка 1кг",             price: 89,  categoryId: 41, imageUrl: "https://tsx.x5static.net/i/400x400-fit/xdelivery/files/ee/64/169b9428cca182eddc132410c15b.jpg" },
      // Макароны (42)
      { id: 19, name: "Макароны спагетти 500г", price: 69,  categoryId: 42, imageUrl: "https://krasnodar.svetofors.ru/upload/catalog/ru/0_33083400_1662458065.jpg" },
      // Масла (43)
      { id: 20, name: "Масло подсолнечное 1л",  price: 129, categoryId: 43, imageUrl: "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/d0/97/0c60cea3725faee4b90edf76c26e.jpg" },
      // Сахар и соль (44)
      { id: 21, name: "Сахар 450г",             price: 79,  categoryId: 44, imageUrl: "https://ir.ozone.ru/s3/multimedia-1-8/c400/7725447152.jpg" },

      // Рыба (61)
      { id: 26, name: "Лосось стейк 500г",      price: 599, categoryId: 61, imageUrl: "https://artiseafood.ru/upload/iblock/a87/a87af2159ad5f48cf757c91bf15fc42b.jpg" },
      // Морепродукты (62)
      { id: 28, name: "Креветки 500г",           price: 449, categoryId: 62, imageUrl: "https://tsx.x5static.net/i/800x800-fit/xdelivery/files/44/4b/61f760b66c0a44756c5e22xd13da.jpg" },
      // Консервы (63)
      { id: 27, name: "Тунец консервированный",  price: 149, categoryId: 63, imageUrl: "https://ir.ozone.ru/s3/multimedia-1-j/c400/8541536527.jpg" },

      // Вода (71)
      { id: 29, name: "Вода минеральная 1.5л",   price: 59,  categoryId: 71, imageUrl: "https://mineralka.store/wa-data/public/shop/products/63/08/10863/images/125178/125178.970.png" },
      // Соки (72)
      { id: 30, name: "Сок апельсиновый 1л",     price: 119, categoryId: 72, imageUrl: "https://opttorg-horeca.ru/assets/images/catalog/sok/dobryj-apelsin.jpg" },
      // Газированные (73)
      { id: 31, name: "Кола 1.5л",               price: 99,  categoryId: 73, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdp8YM-y0Egy3eOu40aNXK0APIGx2qPS1ovw&s" },
      // Чай (31)
      { id: 32, name: "Зелёный чай 100г",        price: 149, categoryId: 31, imageUrl: "https://www.deloks.ru/upload/iblock/2bc/ffunwh3a6o3gno3yl7qau1pogle9n547/chay_zelenyy_lipton_green_100_paketikov_v_upakovke_9_full.jpg" },

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
      { id: 42, name: "Хлеб Бородинский",         price: 59,  categoryId: 101, imageUrl: "https://rusbread.ru/uploads/image_item/image/7598/IMG_0761.jpg" },
      // Выпечка (102)
      { id: 40, name: "Батон классический",       price: 39,  categoryId: 102, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrnKzuRNvaVk1L4pkdxMMxaRKCjKWBq3hgeQ&s" },
      { id: 41, name: "Круассан масляный",        price: 69,  categoryId: 102, imageUrl: "https://thumbs.dreamstime.com/b/%D0%BA%D1%80%D1%83%D0%B0%D1%81%D1%81%D0%B0%D0%BD-%D1%81-%D0%BC%D0%B0%D1%81%D0%BB%D1%8F%D0%BD%D1%8B%D0%BC-%D0%BD%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%BC-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-267932714.jpg" },


        // Замороженные продукты (54)
      { id: 23, name: "Пельмени 1кг ", price: 320, categoryId: 54, imageUrl:  "https://img.freepik.com/premium-photo/frozen-dumplings-white-background_128937-835.jpg" },
      // Манты (55)
      { id: 24, name: "Манты с мясом 1кг",       price: 400, categoryId: 55, imageUrl: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/352/125/291/116/213/2/100045242047b0.jpg" },
      // Вареники (56)
      { id: 25, name: "Вареники с картошкой 800г", price: 359, categoryId: 56, imageUrl: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/-20/166/156/098/122/44/100058607312b0.jpg" },

      // Чай (31)
      { id: 43, name: "Чай МК 250г",              price: 210, categoryId: 31, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZXWCmd8r02iwXq6owNMyvA6GAeijuaF0Pg&s" },
      { id: 44, name: "Чай Марьям брокен 100г",   price: 142, categoryId: 31, imageUrl: "https://teaport.ru/wp-content/uploads/2021/04/416255_68992_%D0%9C%D0%90%D0%A0%D0%AC%D0%AF%D0%9C-%D1%87%D0%B0%D0%B9-%D1%87%D0%B5%D1%80%D0%BD%D1%8B%D0%B9-%D0%B1%D1%80%D0%BE%D0%BA%D0%B5%D0%BD-100%D0%B3-600x600.jpg" },
      // Кофе (32)
      { id: 45, name: "Кофе Якобс 95г",           price: 453, categoryId: 32, imageUrl: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/753/060/429/431/135/100023256376b0.jpg" },
      { id: 46, name: "Кофе Нескафе голд 95г",    price: 550, categoryId: 32, imageUrl: "https://mastfood.ru/upload/iblock/6dd/6dd50460d51b057dddc87fa5d066b6b9.jpg" },


    ],
  });

  console.log("✅ Seed: 10 категорий + 30 подкатегорий + 34 товара");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
