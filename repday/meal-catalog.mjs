// USDA SR28, per 100 g: kcal, carbohydrate g, protein g, fat g, fiber g, sodium mg.
export const extraFoodNutrients = {
  flour: [332, 74.48, 9.61, 1.95, 13.1, 3], // NDB 20649
  banana: [89, 22.84, 1.09, 0.33, 2.6, 1], // NDB 09040
  apple: [52, 13.81, 0.26, 0.17, 2.4, 1], // NDB 09003
  strawberry: [32, 7.68, 0.67, 0.3, 2, 1], // NDB 09316
  mango: [60, 14.98, 0.82, 0.38, 1.6, 1], // NDB 09176
  blackBeans: [132, 23.71, 8.86, 0.54, 8.7, 1], // NDB 16015
  quinoa: [120, 21.3, 4.4, 1.92, 2.8, 7], // NDB 20137
  tortilla: [306, 49.38, 8.2, 7.99, 3.5, 736], // NDB 18364
  lentil: [116, 20.13, 9.02, 0.38, 7.9, 2], // NDB 16070
  beef: [201, 0, 20.3, 12.71, 0, 52], // NDB 13929
  cod: [82, 0, 17.81, 0.67, 0, 54], // NDB 15015
  cabbage: [25, 5.8, 1.28, 0.1, 2.5, 18], // NDB 11109
  curry: [325, 55.83, 14.29, 14.01, 53.2, 52], // NDB 02015
  mushroom: [22, 3.26, 3.09, 0.34, 1, 5], // NDB 11260
  salt: [0, 0, 0, 0, 0, 38758], // NDB 02047
  sesameOil: [884, 0, 0, 100, 0, 0], // NDB 04058
  peanut: [567, 16.13, 25.8, 49.24, 8.5, 18], // NDB 16087
  bakingPowder: [51, 24.1, 0.1, 0, 0.2, 7893], // NDB 18370
};

export const extraMeals = [
  {
    time: '아침', title: '바나나 블루베리 팬케이크', minutes: 20, photo: 'pancakes.jpg',
    photographer: 'nikldn',
    source: 'https://unsplash.com/photos/baked-pancake-with-blueberry-and-slice-of-banan-qp7WA8AV2x0',
    allergens: '달걀 · 우유 · 밀',
    ingredients: [
      ['통밀가루', 65, 'flour', 'starch'],
      ['달걀(껍데기 제외)', 50, 'egg', 'protein'],
      ['저지방 우유', 85, 'milk'],
      ['바나나', 90, 'banana'],
      ['블루베리', 55, 'blueberries']
    ],
    reason: '통밀가루와 과일에서 식이섬유를, 달걀과 우유에서 단백질을 챙길 수 있어요. 잘 익은 바나나가 반죽에 자연스러운 단맛을 더해요.',
    seasoningWeights: [
      ['올리브유', 4.5, 'oil'],
      ['베이킹파우더', 3, 'bakingPowder']
    ],
    seasoning: '올리브유 1작은술, 베이킹파우더 약 ¾작은술',
    steps: [
      '바나나를 으깨 달걀과 우유를 섞고, 통밀가루와 베이킹파우더를 넣어 가볍게 저어요.',
      '팬에 기름을 얇게 두르고 작은 팬케이크를 만들어요. 표면에 기포가 올라오면 뒤집어 가운데 반죽까지 익혀요.',
      '블루베리를 올려 따뜻할 때 먹어요.'
    ]
  },
  {
    time: '아침', title: '시금치 오믈렛과 통밀 토스트', minutes: 15, photo: 'omelet.jpg',
    photographer: 'Ayotunde Ikuesan',
    source: 'https://unsplash.com/photos/an-omelet-and-a-piece-of-bread-on-a-plate-4wnJpAs8baE',
    allergens: '달걀 · 밀',
    ingredients: [
      ['달걀(껍데기 제외)', 100, 'egg', 'protein'],
      ['통밀빵', 90, 'wholeWheatBread', 'starch'],
      ['시금치', 65, 'spinach'],
      ['양송이', 60, 'mushroom']
    ],
    reason: '달걀에서 단백질을, 통밀빵과 시금치에서 식이섬유를 챙길 수 있어요. 버섯을 먼저 볶으면 오믈렛이 물러지지 않아요.',
    seasoningWeights: [
      ['올리브유', 4.5, 'oil'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 1작은술, 후추 약간',
    steps: [
      '양송이를 썰어 기름을 두른 팬에 볶고, 시금치를 넣어 숨이 죽으면 잠시 덜어요.',
      '푼 달걀을 약불에 붓고 채소를 넣어 접어요. 속의 달걀이 흐르지 않을 때까지 익혀요.',
      '구운 통밀빵을 곁들이고 후추를 뿌려요.'
    ]
  },
  {
    time: '아침', title: '사과 계피 오트밀', minutes: 15, photo: 'apple-oats.jpg',
    photographer: 'Stephanie Sarlos',
    source: 'https://unsplash.com/photos/a-bowl-of-oatmeal-apple-slices-and-a-spoon-on-a-cYVFvldOq5k',
    allergens: '우유 · 귀리 제품에 따라 밀 혼입 가능',
    ingredients: [
      ['오트밀(마른 귀리)', 60, 'oats', 'starch'],
      ['저지방 우유', 200, 'milk', 'protein'],
      ['사과', 140, 'apple'],
      ['플레인 그릭요거트', 65, 'yogurt', 'protein']
    ],
    reason: '귀리와 사과의 식이섬유를 챙기기 좋은 따뜻한 아침이에요. 요거트를 얹으면 단백질과 산뜻한 맛을 더할 수 있어요.',
    seasoningWeights: [
      ['계피', 0.5, 'cinnamon']
    ],
    seasoning: '계피가루 약간',
    steps: [
      '사과를 작게 썰어 냄비에 물 한 숟가락과 계피를 넣고 3분 정도 끓여요.',
      '귀리와 우유를 붓고 걸쭉해질 때까지 약불에서 저어요.',
      '불을 끄고 플레인 그릭요거트를 한 숟가락씩 올려요.'
    ]
  },
  {
    time: '아침', title: '딸기 그래놀라 요거트 볼', minutes: 5, photo: 'strawberry-yogurt.jpg',
    photographer: 'Cosmin Ursea',
    source: 'https://unsplash.com/photos/a-bowl-of-granola-with-strawberries-and-yogurt-4i756gs8rWE',
    allergens: '우유 · 그래놀라 제품에 따라 밀이나 견과류',
    ingredients: [
      ['플레인 그릭요거트', 200, 'yogurt', 'protein'],
      ['그래놀라', 50, 'granola', 'starch'],
      ['딸기', 140, 'strawberry']
    ],
    reason: '요거트의 단백질과 그래놀라의 탄수화물에 딸기의 산뜻한 맛을 더했어요. 불 없이 바로 준비할 수 있어요.',
    seasoningWeights: [],
    seasoning: '별도 양념 없이 준비해요.',
    steps: [
      '딸기를 씻고 꼭지를 떼어 먹기 좋게 썰어요.',
      '딸기 일부를 으깨 요거트에 섞어요.',
      '남은 딸기와 그래놀라는 먹기 직전에 올려요.'
    ]
  },
  {
    time: '아침', title: '노릇한 달걀 토마토 토스트', minutes: 15, photo: 'egg-toast.jpg',
    photographer: 'Leti Kugler',
    source: 'https://unsplash.com/photos/sunny-side-up-egg-on-toasted-breads-I-ykyShydj0',
    allergens: '달걀 · 밀',
    ingredients: [
      ['통밀빵', 95, 'wholeWheatBread', 'starch'],
      ['달걀(껍데기 제외)', 100, 'egg', 'protein'],
      ['토마토', 100, 'tomato']
    ],
    reason: '달걀과 통밀빵으로 단백질과 탄수화물을 챙기고, 구운 토마토로 촉촉함을 더해요.',
    seasoningWeights: [
      ['올리브유', 4.5, 'oil'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 1작은술, 후추 약간',
    steps: [
      '빵을 굽고 토마토를 도톰하게 썰어요.',
      '팬에 기름을 두르고 토마토를 앞뒤로 구운 뒤 덜어내요. 같은 팬에서 달걀의 흰자와 노른자가 모두 굳을 때까지 익혀요.',
      '빵 위에 토마토와 달걀을 올리고 후추를 뿌려요.'
    ]
  },
  {
    time: '아침', title: '망고 바나나 요거트 스무디', minutes: 5, photo: 'mango-smoothie.jpg',
    photographer: 'Julia Zyablova',
    source: 'https://unsplash.com/photos/a-glass-filled-with-a-smoothie-next-to-a-mango-KlVIYmGVRQ8',
    allergens: '우유 · 귀리 제품에 따라 밀 혼입 가능',
    ingredients: [
      ['망고', 150, 'mango'],
      ['바나나', 85, 'banana'],
      ['플레인 그릭요거트', 175, 'yogurt', 'protein'],
      ['오트밀(마른 귀리)', 45, 'oats', 'starch']
    ],
    reason: '망고와 바나나에 귀리를 넣어 식이섬유를 더하고, 그릭요거트로 단백질을 챙기는 아침이에요.',
    seasoningWeights: [],
    seasoning: '농도는 찬물로 조절해요.',
    steps: [
      '망고의 껍질과 씨를 제거하고 바나나와 함께 썰어요.',
      '과일, 요거트, 귀리를 넣고 덩어리가 없을 때까지 갈아요.',
      '되직하면 찬물을 한 숟가락씩 넣어 농도를 조절해요.'
    ]
  },
  {
    time: '점심', title: '레몬 병아리콩 샌드위치', minutes: 15, photo: 'club-sandwich.jpg',
    photographer: 'Pille R. Priske',
    source: 'https://unsplash.com/photos/clubhouse-sandwich-U0PiIS4Uvkc',
    allergens: '밀 · 병아리콩(콩류)',
    ingredients: [
      ['통밀빵', 105, 'wholeWheatBread', 'starch'],
      ['익힌 병아리콩', 145, 'chickpea', 'protein'],
      ['오이', 65, 'cucumber'],
      ['어린 시금치', 35, 'spinach']
    ],
    reason: '병아리콩과 통밀빵을 함께 써서 식물성 단백질과 식이섬유를 챙길 수 있어요. 차갑게 준비해도 맛이 잘 어울려요.',
    seasoningWeights: [
      ['올리브유', 4.5, 'oil'],
      ['레몬즙', 10, 'lemon'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 1작은술, 레몬즙 2작은술, 후추 약간',
    steps: [
      '익힌 병아리콩의 물기를 빼고 포크로 거칠게 으깨요.',
      '레몬즙과 올리브유, 후추를 섞고 오이는 얇게 썰어요.',
      '구운 통밀빵에 병아리콩을 펴고 오이와 시금치를 올려요.'
    ]
  },
  {
    time: '점심', title: '검은콩 치킨 현미 볼', minutes: 25, photo: 'bean-bowl.jpg',
    photographer: 'joe boshra',
    source: 'https://unsplash.com/photos/healthy-bowl-with-chicken-rice-beans-and-corn-6XDDOrCMs64',
    allergens: '대두 · 간장 제품에 따라 밀',
    ingredients: [
      ['지은 현미밥', 155, 'rice', 'starch'],
      ['닭가슴살(조리 전)', 125, 'chicken', 'protein'],
      ['익힌 검은콩', 75, 'blackBeans'],
      ['옥수수', 50, 'corn'],
      ['방울토마토', 75, 'tomato']
    ],
    reason: '닭가슴살과 검은콩을 함께 담아 단백질을 챙기고, 현미와 검은콩으로 식이섬유를 더해요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['레몬즙', 10, 'lemon'],
      ['간장', 5.3, 'soySauce']
    ],
    seasoning: '올리브유 2작은술, 레몬즙 2작은술, 간장 1작은술',
    steps: [
      '기름 절반을 두르고 닭가슴살을 구워요. 가장 두꺼운 곳이 74°C에 이르면 썰어 둬요.',
      '검은콩과 옥수수는 물기를 빼고 토마토는 반으로 자르세요.',
      '현미밥에 닭과 채소를 담고, 레몬즙과 간장, 남은 기름을 섞어 뿌려요.'
    ]
  },
  {
    time: '점심', title: '두부 퀴노아 채소 샐러드', minutes: 20, photo: 'quinoa-salad.jpg',
    photographer: 'Eduardo Cano Photo Co.',
    source: 'https://unsplash.com/photos/bowl-of-salad-SS-fmXU7UyM',
    allergens: '대두',
    ingredients: [
      ['익힌 퀴노아', 200, 'quinoa', 'starch'],
      ['단단한 두부', 135, 'tofu', 'protein'],
      ['오이', 80, 'cucumber'],
      ['방울토마토', 85, 'tomato'],
      ['어린 시금치', 40, 'spinach']
    ],
    reason: '퀴노아와 채소로 식이섬유를 더하고 두부로 식물성 단백질을 챙겨요. 차가운 채소와 따뜻한 두부가 잘 어울려요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['레몬즙', 15, 'lemon'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 레몬즙 1큰술, 후추 약간',
    steps: [
      '두부의 물기를 빼고 네모나게 썰어 기름 절반에 노릇하게 구워요.',
      '오이와 토마토, 시금치를 씻어 먹기 좋게 썰어요.',
      '퀴노아와 채소, 두부를 담고 레몬즙과 남은 기름, 후추를 뿌려요.'
    ]
  },
  {
    time: '점심', title: '망고 두부 채소 랩', minutes: 20, photo: 'mango-wrap.jpg',
    photographer: 'The Fry Family Food Co.',
    source: 'https://unsplash.com/photos/white-and-brown-bread-on-white-and-blue-floral-textile-bA4AIZwauxc',
    allergens: '밀 · 대두',
    ingredients: [
      ['밀 토르티야', 100, 'tortilla', 'starch'],
      ['단단한 두부', 150, 'tofu', 'protein'],
      ['망고', 80, 'mango'],
      ['양배추', 70, 'cabbage'],
      ['오이', 55, 'cucumber']
    ],
    reason: '두부의 단백질에 아삭한 채소와 망고를 곁들였어요. 말아서 먹을 수 있어 휴대하기도 편해요.',
    seasoningWeights: [
      ['올리브유', 4.5, 'oil'],
      ['레몬즙', 10, 'lemon'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 1작은술, 레몬즙 2작은술, 후추 약간',
    steps: [
      '두부를 길게 썰어 기름에 앞뒤로 굽고, 망고와 오이, 양배추는 가늘게 썰어요.',
      '토르티야를 팬에 잠깐 데워 부드럽게 만든 뒤 두부와 채소, 망고를 올려요.',
      '레몬즙과 후추를 뿌리고 양옆을 접어 단단히 말아요.'
    ]
  },
  {
    time: '점심', title: '토마토 렌틸 수프와 통밀빵', minutes: 25, photo: 'lentil-soup.jpg',
    photographer: 'Cemrecan Yurtman',
    source: 'https://unsplash.com/photos/person-eating-a-bowl-of-soup-with-bread-and-bread-XMviKryNAiA',
    allergens: '밀 · 렌틸콩(콩류)',
    ingredients: [
      ['익힌 렌틸콩', 165, 'lentil', 'protein'],
      ['통밀빵', 90, 'wholeWheatBread', 'starch'],
      ['토마토', 180, 'tomato'],
      ['당근', 80, 'carrot'],
      ['양파', 65, 'onion']
    ],
    reason: '렌틸콩의 식물성 단백질과 채소의 식이섬유를 함께 챙겨요. 따뜻한 수프에 통밀빵을 곁들인 한 끼예요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['마늘', 3, 'garlic'],
      ['소금', 0.5, 'salt'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 마늘 1쪽, 소금과 후추 약간',
    steps: [
      '기름을 두른 냄비에 다진 마늘, 양파, 당근을 볶아요.',
      '토마토, 익힌 렌틸콩, 물을 넣고 10분 정도 끓여요. 렌틸콩 일부를 으깨 농도를 내요.',
      '소금과 후추로 마무리하고 따뜻하게 구운 통밀빵을 곁들여요.'
    ]
  },
  {
    time: '저녁', title: '소고기 브로콜리 현미볶음', minutes: 25, photo: 'beef-broccoli.jpg',
    photographer: 'Davis Dai',
    source: 'https://unsplash.com/photos/beef-and-broccoli-stir-fry-with-vegetables-on-a-red-plate-qKPKDb4_W24',
    allergens: '대두 · 간장 제품에 따라 밀',
    ingredients: [
      ['지은 현미밥', 175, 'rice', 'starch'],
      ['소고기 등심(조리 전)', 140, 'beef', 'protein'],
      ['브로콜리', 150, 'broccoli'],
      ['당근', 65, 'carrot']
    ],
    reason: '소고기에서 단백질을 챙기고 현미와 브로콜리로 식이섬유를 더해요. 채소를 짧게 볶아 아삭한 식감을 살렸어요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['간장', 5.3, 'soySauce'],
      ['마늘', 6, 'garlic'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 간장 1작은술, 마늘 2쪽, 후추 약간',
    steps: [
      '브로콜리와 당근을 작게 썰고, 소고기는 결 반대 방향으로 썰어요.',
      '기름을 두른 팬에 마늘과 채소를 볶다가 소고기를 넣어 속까지 충분히 익혀요.',
      '간장과 후추로 간하고 따뜻한 현미밥에 곁들여요.'
    ]
  },
  {
    time: '저녁', title: '레몬 대구와 감자 오븐구이', minutes: 30, photo: 'fish-potatoes.jpg',
    photographer: 'Farhad Ibrahimzade',
    source: 'https://unsplash.com/photos/a-pink-plate-topped-with-fish-next-to-a-pile-of-potato-wedges-PfGqaz6G5_4',
    allergens: '생선',
    ingredients: [
      ['대구살(조리 전)', 165, 'cod', 'protein'],
      ['감자(조리 전)', 265, 'potato', 'starch'],
      ['파프리카', 95, 'bellPepper'],
      ['양파', 75, 'onion']
    ],
    reason: '대구와 감자로 단백질과 탄수화물을 챙기고, 파프리카와 양파로 채소를 더해요. 레몬즙이 담백한 흰살생선의 맛을 살려줘요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['레몬즙', 15, 'lemon'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 레몬즙 1큰술, 후추 약간',
    steps: [
      '오븐을 220°C로 예열해요. 얇게 썬 감자에 기름 절반을 묻혀 먼저 15분 정도 구워요.',
      '감자를 뒤집고 파프리카와 양파, 대구를 올려 남은 기름과 후추를 뿌려요.',
      '대구의 가장 두꺼운 곳이 63°C가 되면 꺼내 레몬즙을 뿌려요.'
    ]
  },
  {
    time: '저녁', title: '땅콩 두부 채소 볶음면', minutes: 20, photo: 'tofu-noodles.jpg',
    photographer: 'Zoshua Colah',
    source: 'https://unsplash.com/photos/tofu-stir-fry-noodles-in-bowl-3dGngNs0kpY',
    allergens: '대두 · 땅콩 · 밀',
    ingredients: [
      ['삶은 통밀 면', 200, 'pasta', 'starch'],
      ['단단한 두부', 140, 'tofu', 'protein'],
      ['양배추', 90, 'cabbage'],
      ['당근', 70, 'carrot'],
      ['무염 땅콩', 15, 'peanut']
    ],
    reason: '두부와 땅콩으로 식물성 단백질을, 통밀 면과 채소로 식이섬유를 챙길 수 있어요. 으깬 땅콩이 고소한 식감을 더해요.',
    seasoningWeights: [
      ['참기름', 9, 'sesameOil'],
      ['간장', 5.3, 'soySauce'],
      ['마늘', 3, 'garlic']
    ],
    seasoning: '참기름 2작은술, 간장 1작은술, 마늘 1쪽',
    steps: [
      '면을 삶아 물기를 빼고 두부와 채소를 얇게 썰어요.',
      '기름 절반에 두부를 구워 덜어 두고, 남은 기름에 마늘과 채소를 볶아요.',
      '면과 간장을 넣어 빠르게 볶은 뒤 두부와 잘게 으깬 땅콩을 올려요.'
    ]
  },
  {
    time: '저녁', title: '치킨 토마토 크림 통밀 파스타', minutes: 30, photo: 'chicken-pasta.jpg',
    photographer: 'Arne Buss',
    source: 'https://unsplash.com/photos/grilled-chicken-pasta-fresh-salad-bread-and-wine-on-table-r5L6WGbTwUs',
    allergens: '밀 · 우유',
    ingredients: [
      ['삶은 통밀 파스타', 205, 'pasta', 'starch'],
      ['닭가슴살(조리 전)', 140, 'chicken', 'protein'],
      ['토마토', 165, 'tomato'],
      ['양송이', 85, 'mushroom'],
      ['저지방 우유', 100, 'milk']
    ],
    reason: '닭가슴살과 통밀 면으로 단백질과 탄수화물을 챙기고, 토마토와 우유를 함께 끓여 부드러운 소스를 만들어요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['마늘', 6, 'garlic'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 마늘 2쪽, 후추 약간',
    steps: [
      '기름 절반을 두른 팬에 닭가슴살을 굽고, 가장 두꺼운 곳이 74°C에 이르면 따로 덜어요.',
      '남은 기름에 마늘과 버섯, 잘게 썬 토마토를 볶아요. 우유를 붓고 약불에서 저어요.',
      '삶은 면을 넣어 소스와 섞고, 썬 닭가슴살과 후추를 올려요.'
    ]
  },
  {
    time: '저녁', title: '토마토 강낭콩 카레 덮밥', minutes: 25, photo: 'bean-curry.jpg',
    photographer: 'Zoshua Colah',
    source: 'https://unsplash.com/photos/dal-makhani-with-rice-and-flatbread-YNMLJcE9sdk',
    allergens: '강낭콩(콩류) · 카레가루 제품의 알레르기 표시 확인',
    ingredients: [
      ['지은 현미밥', 175, 'rice', 'starch'],
      ['익힌 강낭콩', 175, 'beans', 'protein'],
      ['토마토', 170, 'tomato'],
      ['양파', 85, 'onion'],
      ['당근', 70, 'carrot']
    ],
    reason: '강낭콩과 현미를 함께 담아 식물성 단백질과 식이섬유를 챙겨요. 토마토를 졸여 묵직한 맛을 내요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['카레가루', 4, 'curry'],
      ['마늘', 6, 'garlic']
    ],
    seasoning: '올리브유 2작은술, 카레가루 약 2작은술, 마늘 2쪽',
    steps: [
      '기름에 다진 마늘과 양파, 당근을 볶고 카레가루를 넣어 향을 내요.',
      '잘게 썬 토마토와 익힌 강낭콩, 물을 조금 넣어 걸쭉해질 때까지 끓여요.',
      '콩이 뜨겁게 익고 소스가 걸쭉해지면 현미밥 위에 얹어요.'
    ]
  }
];
