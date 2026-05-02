import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: [
      { id: 1, name: "Молочные продукты и яйца", imageUrl: "/images/categories/Молоко.jpg" },
      { id: 2, name: "Овощи и фрукты", imageUrl: "/images/categories/Овощи.jpg" },
      { id: 3, name: "Готовая еда", imageUrl: "/images/categories/Еда.jpg" },
      { id: 4, name: "Бакалея", imageUrl: "/images/categories/Бакалея.jpg" },
      { id: 5, name: "Мясо, птица, колбаса", imageUrl: "/images/categories/Мясо.jpg" },
      { id: 6, name: "Рыба и морепродукты", imageUrl: "/images/categories/Рыба.jpg" },
      { id: 7, name: "Вода и напитки", imageUrl: "/images/categories/Напитки.jpg" },
      { id: 8, name: "Сладости", imageUrl: "/images/categories/Сладости.jpg" },
      { id: 9, name: "Снеки и чипсы", imageUrl: "/images/categories/Снеки.jpg" },
      { id: 10, name: "Хлеб и выпечка", imageUrl: "/images/categories/Хлеб.jpg" },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: "Молоко 3.2% 1л",
        price: 89,
        categoryId: 1,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/moloko_ekomilk_2_5_bzmzh_930_ml.jpg",
      },
      {
        id: 2,
        name: "Кефир 2.5% 1л",
        price: 79,
        categoryId: 1,
        imageUrl:
          "https://da-mart.ru/storage/catalog/goods/c043cab0ab1d01988ca4bfb63370eb18.w220h220.jpeg",
      },
      {
        id: 3,
        name: "Творог 5% 300г",
        price: 129,
        categoryId: 1,
        imageUrl:
          "https://resizer.mail.ru/p/ebfbeffa-aa44-595e-abba-2d6009da1edb/AQA5t86KbCPIvU32jRTCBH0F5xdI6mPvR62D2QeUTPqYKAbJb3NC2rX0GJsNlL089MZMQbdSh6hb1ycXgO0ZZ48b7Tc.jpg",
      },
      {
        id: 4,
        name: "Сметана 20% 400г",
        price: 109,
        categoryId: 1,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5ke3vc7u6H4rxt2wJKztRVdByZWinYbdiPA&s",
      },
      {
        id: 5,
        name: "Яйца С1 10шт",
        price: 99,
        categoryId: 1,
        imageUrl:
          "https://agrokomplexshop.ru/upload/iblock/15e/o2931tv0d6dpi52q0s6abloatgmmkz3x/845081c2-033e-11e4-9720-782bcb24e027_d591dafc-2611-11ee-ab39-00155d0a9c17.jpg",
      },
      {
        id: 6,
        name: "Масло сливочное 200г",
        price: 149,
        categoryId: 1,
        imageUrl:
          "https://apeti.ru/upload/resize_cache/iblock/749/ysujjvurb55urgn56uch0ds0js6557xs/218_218_0/maslo_sladko_slivochnoe_nesolenoe_brest_litovsk_82_5_180_g_bzmzh.jpg",
      },
      {
        id: 7,
        name: "Яблоки 1кг",
        price: 99,
        categoryId: 2,
        imageUrl:
          "https://main-cdn.sbermegamarket.ru/big1/hlr-system/101/480/338/641/317/35/100029281056b0.jpg",
      },
      {
        id: 8,
        name: "Бананы 1кг",
        price: 79,
        categoryId: 2,
        imageUrl:
          "https://fruitsparadise.ru/wp-content/uploads/2019/02/Banana1-1.jpg",
      },
      {
        id: 9,
        name: "Помидоры 1кг",
        price: 119,
        categoryId: 2,
        imageUrl:
          "https://sibprod.info/upload/resize_cache/iblock/6c7/1680_1050_19d1669f6609e6dfcaeac28e5aab5b3be/6c7d8d259fc5a7a5b05941bdb0abc788.jpg",
      },
      {
        id: 10,
        name: "Огурцы 1кг",
        price: 89,
        categoryId: 2,
        imageUrl:
          "https://sibprod.info/upload/resize_cache/iblock/b85/1800_1200_19d1669f6609e6dfcaeac28e5aab5b3be/b85a11f31960948145e43fde0bbdb5b8.jpg",
      },
      {
        id: 11,
        name: "Морковь 1кг",
        price: 49,
        categoryId: 2,
        imageUrl:
          "https://ir.ozone.ru/s3/multimedia-1-2/c1000/7557622238.jpg",
      },
      {
        id: 12,
        name: "Картофель 2кг",
        price: 79,
        categoryId: 2,
        imageUrl:
          "https://img.megastroycdn.ru/_8jRn3ruDs0/products/e678d7be60db0da91725ef45d07f3795227b22549f35817904eb2c805c9196a9/491849_1.jpg",
      },
      {
        id: 13,
        name: "Пицца Маргарита",
        price: 399,
        categoryId: 3,
        imageUrl:
          "https://s3v3dn.elitibi.ru/static/8044/square/558318711a3ec047ec662ead7031e82c.jpg?ca001a5ac4c893b0f8b03437b1d94ba4",
      },
      {
        id: 14,
        name: "Цезарь с курицей",
        price: 349,
        categoryId: 3,
        imageUrl:
          "https://main-cdn.sbermegamarket.ru/big1/hlr-system/325/767/344/419/175/9/100027524214b0.jpg",
      },
      {
        id: 15,
        name: "Суши сет 20шт",
        price: 699,
        categoryId: 3,
        imageUrl:
          "https://sushispace74.ru/upload/56283d7a-3112-f51b-2de9-67dd34f72291_image_c",
      },
      {
        id: 16,
        name: "Плов с говядиной 500г",
        price: 299,
        categoryId: 3,
        imageUrl:
          "https://yastatic.net/avatars/get-grocery-goods/2888787/5f0074e7-e81c-4177-bdfa-1a14c85e603f/500x500-orig",
      },
      {
        id: 17,
        name: "Рис длиннозерный 1кг",
        price: 99,
        categoryId: 4,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/ris_dlinnozernyy_1_kg.jpg",
      },
      {
        id: 18,
        name: "Гречка 1кг",
        price: 89,
        categoryId: 4,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/grechka_1_kg.jpg",
      },
      {
        id: 19,
        name: "Макароны спагетти 500г",
        price: 69,
        categoryId: 4,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/makaronu_spagetti_500_g.jpg",
      },
      {
        id: 20,
        name: "Масло подсолнечное 1л",
        price: 129,
        categoryId: 4,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/maslo_podsolnechnoe_1_l.jpg",
      },
      {
        id: 21,
        name: "Сахар 1кг",
        price: 79,
        categoryId: 4,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/sugar_1_kg.jpg",
      },
      {
        id: 22,
        name: "Куриное филе 1кг",
        price: 299,
        categoryId: 5,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/kurinoe_filye_1_kg.jpg",
      },
      {
        id: 23,
        name: "Говядина вырезка 1кг",
        price: 699,
        categoryId: 5,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/govyadina_virezka_1_kg.jpg",
      },
      {
        id: 24,
        name: "Колбаса Докторская 400г",
        price: 249,
        categoryId: 5,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/kolbasa_doktorskaya_400_g.jpg",
      },
      {
        id: 25,
        name: "Сосиски молочные 500г",
        price: 199,
        categoryId: 5,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/sosiski_molochnyye_500_g.jpg",
      },
      {
        id: 26,
        name: "Лосось стейк 500г",
        price: 599,
        categoryId: 6,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/losos_steyk_500_g.jpg",
      },
      {
        id: 27,
        name: "Тунец консервированный",
        price: 149,
        categoryId: 6,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/tunets_konservirovannyy.jpg",
      },
      {
        id: 28,
        name: "Креветки 500г",
        price: 449,
        categoryId: 6,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/krivety_500_g.jpg",
      },
      {
        id: 29,
        name: "Вода минеральная 1.5л",
        price: 59,
        categoryId: 7,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/voda_mineralnaya_1.5_l.jpg",
      },
      {
        id: 30,
        name: "Сок апельсиновый 1л",
        price: 119,
        categoryId: 7,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/sok_apelsinovyy_1_l.jpg",
      },
      {
        id: 31,
        name: "Кола 1.5л",
        price: 99,
        categoryId: 7,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/kola_1.5_l.jpg",
      },
      {
        id: 32,
        name: "Зелёный чай 100г",
        price: 149,
        categoryId: 7,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/zelyoniy_chay_100_g.jpg",
      },
      {
        id: 33,
        name: "Шоколад Молочный 100г",
        price: 99,
        categoryId: 8,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/shokolad_molochnyy_100_g.jpg",
      },
      {
        id: 34,
        name: "Конфеты Мишка 200г",
        price: 199,
        categoryId: 8,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/konfety_mishka_200_g.jpg",
      },
      {
        id: 35,
        name: "Мороженое Пломбир",
        price: 79,
        categoryId: 8,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/morozhenoe_plombir.jpg",
      },
      {
        id: 36,
        name: "Мармелад 300г",
        price: 129,
        categoryId: 8,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/marmelad_300_g.jpg",
      },
      {
        id: 37,
        name: "Чипсы Лэйс 150г",
        price: 99,
        categoryId: 9,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/chipsy_leys_150_g.jpg",
      },
      {
        id: 38,
        name: "Орешки солёные 200г",
        price: 149,
        categoryId: 9,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/oreshki_solennyye_200_g.jpg",
      },
      {
        id: 39,
        name: "Сухарики ржаные 100г",
        price: 59,
        categoryId: 9,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/sukhariki_rzhanyye_100_g.jpg",
      },
      {
        id: 40,
        name: "Хлеб белый нарезной",
        price: 49,
        categoryId: 10,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/hleb_belyi_nareznoi.jpg",
      },
      {
        id: 41,
        name: "Батон классический",
        price: 39,
        categoryId: 10,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/baton_klassicheskiy.jpg",
      },
      {
        id: 42,
        name: "Круассан масляный",
        price: 69,
        categoryId: 10,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/kruassan_maslyanyy.jpg",
      },
      {
        id: 43,
        name: "Хлеб Бородинский",
        price: 59,
        categoryId: 10,
        imageUrl:
          "https://apeti.ru/upload/iblock/2cb/zcncftln93yexagd1dsykhjze5ybgt9u/hleb_borodinskiy.jpg",
      },
    ],
  });

  console.log("✅ Seed completed — 10 категорий, 43 товара");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
