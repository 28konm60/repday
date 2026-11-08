import {extraFoodNutrients, extraMeals} from './meal-catalog.mjs';

// USDA SR28, per 100 g: kcal, carbohydrate g, protein g, fat g, fiber g, sodium mg.
const foodNutrients = {
  ...extraFoodNutrients,
  yogurt: [73, 3.94, 9.95, 1.92, 0, 34], // NDB 01287
  granola: [489, 53.88, 13.67, 24.31, 8.9, 26], // NDB 08037
  blackberries: [43, 9.61, 1.39, 0.49, 5.3, 1], // NDB 09042
  cinnamon: [247, 80.59, 3.99, 1.24, 53.1, 10], // NDB 02010
  rice: [123, 25.58, 2.74, 0.97, 1.6, 4], // NDB 20037
  chicken: [120, 0, 22.5, 2.62, 0, 45], // NDB 05062
  tomato: [18, 3.89, 0.88, 0.2, 1.2, 5], // NDB 11529
  beans: [127, 22.8, 8.67, 0.5, 7.4, 2], // NDB 16033
  corn: [96, 20.98, 3.41, 1.5, 2.4, 1], // NDB 11168
  oil: [884, 0, 0, 100, 0, 2], // NDB 04053
  lemon: [22, 6.9, 0.35, 0.24, 0.3, 1], // NDB 09152
  soySauce: [53, 4.93, 8.14, 0.57, 0.8, 5493], // NDB 16123
  blackPepper: [251, 63.95, 10.39, 3.26, 25.3, 20], // NDB 02030
  salmon: [208, 0, 20.42, 13.42, 0, 59], // NDB 15236
  potato: [77, 17.49, 2.05, 0.09, 2.1, 6], // NDB 11352
  bellPepper: [31, 6.03, 0.99, 0.3, 2.1, 4], // NDB 11821
  onion: [40, 9.34, 1.1, 0.1, 1.7, 4], // NDB 11282
  parsley: [36, 6.33, 2.97, 0.79, 3.3, 56], // NDB 11297
  egg: [143, 0.72, 12.56, 9.51, 0, 142], // NDB 01123
  avocado: [160, 8.53, 2, 14.66, 6.7, 7], // NDB 09037
  wholeWheatBread: [252, 42.71, 12.45, 3.5, 6, 455], // NDB 18075
  oats: [379, 67.7, 13.15, 6.52, 10.1, 6], // NDB 08120
  blueberries: [57, 14.49, 0.74, 0.33, 2.4, 1], // NDB 09050
  milk: [50, 4.8, 3.3, 1.98, 0, 47], // NDB 01079
  chickpea: [164, 27.42, 8.86, 2.59, 7.6, 7], // NDB 16057
  cucumber: [15, 3.63, 0.65, 0.11, 0.5, 2], // NDB 11205
  spinach: [23, 3.63, 2.86, 0.39, 2.2, 79], // NDB 11457
  tofu: [144, 2.78, 17.27, 8.72, 2.3, 14], // NDB 16426
  carrot: [41, 9.58, 0.93, 0.24, 2.8, 69], // NDB 11124
  broccoli: [34, 6.64, 2.82, 0.37, 2.6, 33], // NDB 11090
  garlic: [149, 33.06, 6.36, 0.5, 2.1, 17], // NDB 11215
  pasta: [149, 30.07, 5.99, 1.71, 3.9, 4], // NDB 20125
  shrimp: [71, 0.91, 13.61, 1.01, 0, 566], // NDB 15149
  basil: [23, 2.65, 3.15, 0.64, 1.6, 4], // NDB 02044
};

const nutrientLabels = [['열량', 'kcal'], ['탄수화물', 'g'], ['단백질', 'g'], ['지방', 'g'], ['식이섬유', 'g'], ['나트륨', 'mg']];
const nutrientAmount = new Intl.NumberFormat('ko-KR', {maximumFractionDigits: 1});

function mealNutrients(ingredients) {
  const totals = nutrientLabels.map(() => 0);
  for (const [, grams, food] of ingredients) {
    foodNutrients[food].forEach((amount, index) => { totals[index] += amount * grams / 100; });
  }
  return totals;
}

const meals = [
  {
    time: '아침', title: '베리 그릭요거트 볼', minutes: 5, photo: 'yogurt.jpg',
    photographer: 'Natalie Behn', source: 'https://unsplash.com/photos/qj_zfYm-sdI', allergens: '우유 · 그래놀라 제품에 따라 밀이나 견과류',
    ingredients: [['플레인 그릭요거트', 200, 'yogurt', 'protein'], ['그래놀라', 45, 'granola', 'starch'], ['블랙베리', 100, 'blackberries']],
    reason: '그릭요거트에서 단백질을, 그래놀라에서 탄수화물을, 블랙베리에서 식이섬유를 챙길 수 있어요. 5분이면 준비할 수 있는 아침이에요.',
    seasoningWeights: [['계피', 0.5, 'cinnamon']],
    seasoning: '계피가루 약간',
    steps: [
      '볼에 그릭요거트를 담아 숟가락으로 한 번 저어 부드럽게 풀어요.',
      '씻어서 물기를 뺀 블랙베리를 올리고, 절반은 가볍게 으깨 요거트에 섞어요.',
      '먹기 직전에 그래놀라와 계피를 뿌려 바삭한 식감을 살려요.'
    ]
  },
  {
    time: '점심', title: '레몬 치킨 현미 덮밥', minutes: 20, photo: 'chicken.jpg',
    photographer: 'joe boshra', source: 'https://unsplash.com/photos/tB2MPTiSrsg', allergens: '대두 · 간장 제품에 따라 밀',
    ingredients: [['지은 현미밥', 190, 'rice', 'starch'], ['닭가슴살(조리 전)', 140, 'chicken', 'protein'], ['방울토마토', 100, 'tomato'], ['익힌 강낭콩', 50, 'beans'], ['옥수수', 40, 'corn']],
    reason: '현미밥과 옥수수로 탄수화물을, 닭가슴살로 단백질을 챙겨요. 강낭콩과 방울토마토를 더해 한 그릇에 식이섬유도 담았어요.',
    seasoningWeights: [['올리브유', 9, 'oil'], ['레몬즙', 15, 'lemon'], ['간장', 5.3, 'soySauce'], ['후추', 0.3, 'blackPepper']],
    seasoning: '올리브유 2작은술, 레몬즙 1큰술, 간장 1작은술, 후추 약간',
    steps: [
      '닭가슴살의 물기를 닦고 두께를 고르게 한 뒤 후추를 뿌려요.',
      '달군 팬에 올리브유 1작은술을 두르고 닭을 구워요. 가장 두꺼운 부분이 74°C에 이르면 꺼내 잠깐 두었다가 썰어요.',
      '현미밥에 닭과 반으로 자른 토마토, 강낭콩, 옥수수를 담아요. 레몬즙과 간장, 남은 올리브유를 섞어 먹기 직전에 뿌려요.'
    ]
  },
  {
    time: '저녁', title: '레몬 연어와 구운 감자', minutes: 30, photo: 'salmon.jpg',
    photographer: 'Dean Zhang', source: 'https://unsplash.com/photos/8iDNy37sp8E', allergens: '생선',
    ingredients: [['연어(조리 전)', 140, 'salmon', 'protein'], ['감자(조리 전)', 230, 'potato', 'starch'], ['파프리카', 90, 'bellPepper'], ['양파', 90, 'onion']],
    reason: '연어로 단백질과 지방을, 감자로 탄수화물을 챙길 수 있어요. 파프리카와 양파를 함께 구우면 채소와 식이섬유도 더해져요.',
    seasoningWeights: [['올리브유', 9, 'oil'], ['레몬즙', 12, 'lemon'], ['후추', 0.3, 'blackPepper'], ['파슬리', 2, 'parsley']],
    seasoning: '올리브유 2작은술, 레몬 ¼개, 후추와 파슬리 약간',
    steps: [
      '오븐을 220°C로 예열해요. 감자를 얇은 웨지 모양으로 썰어 올리브유 1작은술을 묻힌 뒤 15분 먼저 구워요.',
      '감자를 뒤집고 파프리카와 양파, 연어를 옆에 놓아요. 남은 올리브유와 후추를 뿌려 연어의 가장 두꺼운 부분이 63°C에 이를 때까지 구워요.',
      '완성한 연어에 레몬즙을 짜고 파슬리를 뿌려요. 노릇하게 구운 감자와 채소를 곁들여요.'
    ]
  },
  {
    time: '아침',
    title: '아보카도 달걀 토스트',
    minutes: 15,
    photo: 'avocado-toast.jpg',
    photographer: 'Alexis Presa',
    source: 'https://unsplash.com/photos/HZgyUhnwzBo',
    allergens: '달걀 · 밀',
    ingredients: [
      ['통밀빵', 85, 'wholeWheatBread', 'starch'],
      ['달걀(껍데기 제외)', 100, 'egg', 'protein'],
      ['아보카도', 65, 'avocado'],
      ['토마토', 70, 'tomato']
    ],
    reason: '통밀빵과 아보카도에서 식이섬유를, 달걀에서 단백질을 챙길 수 있어요. 따뜻한 토스트에 부드러운 달걀과 산뜻한 토마토를 곁들인 아침이에요.',
    seasoningWeights: [
      ['올리브유', 4.5, 'oil'],
      ['레몬즙', 5, 'lemon'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유와 레몬즙 각 1작은술, 후추 약간',
    steps: [
      '통밀빵을 노릇하게 굽고 토마토를 잘게 썰어요. 아보카도를 으깨 레몬즙을 섞어요.',
      '팬에 올리브유를 두르고 푼 달걀을 넣어요. 부드럽게 저으면서 달걀이 흐르지 않을 때까지 익혀요.',
      '빵에 아보카도와 토마토를 올리고 스크램블 에그를 곁들여요. 후추를 가볍게 뿌려 마무리해요.'
    ]
  },
  {
    time: '아침',
    title: '블루베리 밀크 오트밀',
    minutes: 10,
    photo: 'oatmeal.jpg',
    photographer: 'Tyraan Lopes',
    source: 'https://unsplash.com/photos/-ub7a-DnerU',
    allergens: '우유 · 귀리 제품에 따라 밀 혼입 가능',
    ingredients: [
      ['오트밀(마른 귀리)', 60, 'oats', 'starch'],
      ['저지방 우유', 200, 'milk', 'protein'],
      ['블루베리', 100, 'blueberries']
    ],
    reason: '귀리와 블루베리로 식이섬유를, 우유로 단백질을 챙겨요. 따뜻하고 부드러운 아침 메뉴예요.',
    seasoningWeights: [
      ['계피', 0.5, 'cinnamon']
    ],
    seasoning: '계피가루 약간',
    steps: [
      '작은 냄비에 귀리와 우유를 넣고 약불에서 저어가며 끓여요. 너무 되직하면 물을 조금 넣어요.',
      '귀리가 부드러워지면 블루베리의 절반을 넣고 가볍게 으깨 색과 향을 내요.',
      '그릇에 담고 남은 블루베리와 계피를 올려요.'
    ]
  },
  {
    time: '점심',
    title: '레몬 병아리콩 현미 샐러드',
    minutes: 15,
    photo: 'chickpea.jpg',
    photographer: 'Sumit Bhatia',
    source: 'https://unsplash.com/photos/emy9Rhhn2PI',
    allergens: '병아리콩(콩류)',
    ingredients: [
      ['지은 현미밥', 155, 'rice', 'starch'],
      ['익힌 병아리콩', 145, 'chickpea', 'protein'],
      ['오이', 80, 'cucumber'],
      ['방울토마토', 75, 'tomato'],
      ['샐러드용 어린 시금치', 40, 'spinach']
    ],
    reason: '병아리콩으로 식물성 단백질과 식이섬유를 챙기고, 현미와 생채소를 곁들여 씹는 맛을 살렸어요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['레몬즙', 15, 'lemon'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 레몬즙 1큰술, 후추 약간',
    steps: [
      '익힌 병아리콩의 물기를 빼요. 오이와 방울토마토를 한입 크기로 썰고 시금치를 씻어요.',
      '올리브유와 레몬즙, 후추를 섞어 드레싱을 만들어요.',
      '현미밥 위에 병아리콩과 채소를 올린 뒤 먹기 직전에 드레싱을 뿌려요.'
    ]
  },
  {
    time: '점심',
    title: '노릇한 두부 채소 볶음밥',
    minutes: 20,
    photo: 'tofu.jpg',
    photographer: 'Pavan Reddy',
    source: 'https://unsplash.com/photos/-4V4SjHPPDk',
    allergens: '대두 · 간장 제품에 따라 밀',
    ingredients: [
      ['지은 현미밥', 175, 'rice', 'starch'],
      ['단단한 두부', 150, 'tofu', 'protein'],
      ['당근', 65, 'carrot'],
      ['파프리카', 65, 'bellPepper'],
      ['옥수수', 40, 'corn']
    ],
    reason: '두부의 식물성 단백질에 현미와 채소를 곁들였어요. 두부 겉면을 바삭하게 구워 한 그릇에 식감도 더했어요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['간장', 5.3, 'soySauce'],
      ['마늘', 3, 'garlic']
    ],
    seasoning: '올리브유 2작은술, 간장 1작은술, 마늘 1쪽',
    steps: [
      '두부의 물기를 눌러 빼고 네모나게 썰어요. 당근과 파프리카, 마늘은 잘게 썰어요.',
      '기름 절반을 두른 팬에 두부를 노릇하게 구워 덜어 두고, 남은 기름에 마늘과 채소를 볶아요.',
      '현미밥과 간장을 넣어 뜨겁게 볶은 뒤, 마지막에 두부를 섞어 모양을 살려요.'
    ]
  },
  {
    time: '저녁',
    title: '새우 토마토 통밀 파스타',
    minutes: 25,
    photo: 'shrimp-pasta.jpg',
    photographer: 'Benjamin Jauregui',
    source: 'https://unsplash.com/photos/OdAPjRo1K1E',
    allergens: '갑각류(새우) · 밀',
    ingredients: [
      ['삶은 통밀 파스타', 210, 'pasta', 'starch'],
      ['껍질 벗긴 새우(조리 전)', 150, 'shrimp', 'protein'],
      ['방울토마토', 150, 'tomato']
    ],
    reason: '통밀 면에서 탄수화물과 식이섬유를, 새우에서 단백질을 챙겨요. 마늘과 바질이 토마토의 풍미를 살려줘요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['마늘', 6, 'garlic'],
      ['바질', 5, 'basil'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 마늘 2쪽, 생바질 한 줌(약 5g), 후추 약간',
    steps: [
      '통밀 파스타를 포장 안내대로 삶고 면수를 조금 남겨요. 방울토마토는 반으로 잘라요.',
      '올리브유에 마늘을 볶다가 토마토를 넣어 부드럽게 익혀요. 새우를 넣고 속살이 불투명해질 때까지 충분히 익혀요.',
      '면과 면수를 조금 넣어 버무린 뒤 불을 끄고 바질과 후추를 더해요.'
    ]
  },
  {
    time: '저녁',
    title: '마늘 닭가슴살과 브로콜리 구이',
    minutes: 30,
    photo: 'chicken-broccoli.jpg',
    photographer: 'Tommaso Buzio',
    source: 'https://unsplash.com/photos/j2M7FShjOQw',
    allergens: '대두 · 간장 제품에 따라 밀',
    ingredients: [
      ['닭가슴살(조리 전)', 155, 'chicken', 'protein'],
      ['감자(조리 전)', 250, 'potato', 'starch'],
      ['브로콜리', 150, 'broccoli']
    ],
    reason: '닭가슴살로 단백질을, 감자로 탄수화물을 챙겨요. 브로콜리를 함께 구워 식이섬유를 더하고 가장자리의 고소한 맛도 살렸어요.',
    seasoningWeights: [
      ['올리브유', 9, 'oil'],
      ['간장', 5.3, 'soySauce'],
      ['마늘', 6, 'garlic'],
      ['후추', 0.3, 'blackPepper']
    ],
    seasoning: '올리브유 2작은술, 간장 1작은술, 마늘 2쪽, 후추 약간',
    steps: [
      '오븐을 210°C로 예열해요. 감자를 얇게 썰고 기름 절반에 버무려 12분 먼저 구워요.',
      '닭가슴살에 간장과 다진 마늘, 후추를 바르고 감자 옆에 놓아요. 남은 기름을 묻힌 브로콜리도 넣어요.',
      '닭의 가장 두꺼운 곳이 74°C에 이를 때까지 구워요. 브로콜리가 먼저 익으면 꺼내 두었다가 곁들여요.'
    ]
  },
  ...extraMeals
];

const mealSlots = ['아침', '점심', '저녁'].map(time => meals.filter(meal => meal.time === time));
const combinationCount = mealSlots.reduce((count, slot) => count * slot.length, 1);

function selectMenus(variation) {
  // Map a combination number to one menu from each meal slot.
  const breakfast = variation % mealSlots[0].length;
  return mealSlots.map((slot, index) => {
    const digit = variation % slot.length;
    variation = Math.floor(variation / slot.length);
    return slot[(digit + (index === 0 ? 0 : breakfast)) % slot.length];
  });
}

const activityFactors = {low: 1.2, moderate: 1.4, high: 1.6};

const mealStorageKey = 'repday-meal-plan-v1';
const catalogVersion = 2;
const mealGoals = ['balanced', 'training', 'hearty'];

function mealPreferences({age, sex, height, weight, activity, goal}) {
  const isYouth = age < 20;
  let size = 1;
  if (!isYouth) {
    // Use the Mifflin–St Jeor estimate to choose a broad example serving size.
    const resting = 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161);
    const estimated = resting * activityFactors[activity];
    size = estimated >= 2500 ? 1.25 : estimated >= 1900 ? 1.1 : 1;
  }
  return {isYouth, size, goal: isYouth ? 'balanced' : goal};
}

export function recommendMeals(profile, variation = 0) {
  return mealsFor({...mealPreferences(profile), variation});
}

function mealsFor({isYouth, size, goal, variation = 0}) {
  const proteinScale = !isYouth && goal === 'training' ? size * 1.15 : size;
  const starchScale = !isYouth && goal === 'hearty' ? size * 1.15 : size;

  return selectMenus(variation).map(meal => {
    const ingredients = meal.ingredients.map(([name, grams, food, group]) => {
      const scale = group === 'protein' ? proteinScale : group === 'starch' ? starchScale : 1;
      return [name, Math.round(grams * scale / 5) * 5, food];
    });
    return {
      ...meal,
      ingredients: ingredients.map(([name, grams]) => isYouth ? name : name + ' ' + grams + 'g'),
      nutritionBasis: isYouth ? '기본 레시피 전체의 추정치 · 개인 섭취량과 다를 수 있어요.' : '위 재료량 1인분의 추정치',
      nutrients: mealNutrients([...ingredients, ...meal.seasoningWeights])
    };
  });
}

function migrateMealVariation(saved) {
  const {variation} = saved;
  if (!Number.isInteger(variation) || variation < 0) return 0;
  if (saved.catalogVersion === catalogVersion) return variation < combinationCount ? variation : 0;
  if (saved.catalogVersion !== undefined || variation >= 27) return 0;

  // v16 used three choices per slot. Convert its three dish positions to the new catalog.
  const breakfast = variation % 3;
  const lunch = (Math.floor(variation / 3) + breakfast) % 3;
  const dinner = (Math.floor(variation / 9) + breakfast) % 3;
  const [breakfasts, lunches, dinners] = mealSlots.map(slot => slot.length);
  const lunchDigit = (lunch - breakfast + lunches) % lunches;
  const dinnerDigit = (dinner - breakfast + dinners) % dinners;
  return breakfast + breakfasts * (lunchDigit + lunches * dinnerDigit);
}

function shuffledVariations(previous) {
  const order = Array.from({length: combinationCount}, (_, index) => index);
  for (let index = order.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [order[index], order[other]] = [order[other], order[index]];
  }
  const last = order.length - 1;
  if (order[last] === previous && last > 0) {
    const other = Math.floor(Math.random() * last);
    [order[last], order[other]] = [order[other], order[last]];
  }
  return order;
}

function readSavedMeals() {
  try {
    const saved = JSON.parse(localStorage.getItem(mealStorageKey));
    if (saved && typeof saved.isYouth === 'boolean' &&
        [1, 1.1, 1.25].includes(saved.size) && mealGoals.includes(saved.goal)) {
      const variation = migrateMealVariation(saved);
      const remaining = saved.remainingVariations;
      const validOrder = saved.catalogVersion === catalogVersion && Array.isArray(remaining) &&
        remaining.length < combinationCount && new Set(remaining).size === remaining.length &&
        remaining.every(index => Number.isInteger(index) && index >= 0 && index < combinationCount && index !== variation);
      return {...saved, variation, remainingVariations: validOrder ? remaining : []};
    }
  } catch {
    // A blocked or unreadable store should not prevent recommendations.
  }
  return null;
}

export function initMeals() {
  const page = document.getElementById('meals');
  const home = document.getElementById('training');
  const form = document.getElementById('meal-form');
  const ageInput = form.elements.namedItem('age');
  const adultFields = document.getElementById('meal-adult-fields');
  const list = document.getElementById('meal-list');
  const status = document.getElementById('meal-status');
  const nextMenu = document.getElementById('meal-next');
  let currentPlan = readSavedMeals();
  const template = document.getElementById('meal-card-template');
  const links = document.querySelectorAll('a[href="#meals"]');

  function showPage() {
    const showMeals = window.location.hash === '#meals';
    const pageChanged = home.hidden !== showMeals;
    home.hidden = showMeals;
    page.hidden = !showMeals;
    for (const link of links) {
      if (showMeals) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    if (!pageChanged) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    if (showMeals) document.getElementById('meal-title').focus({preventScroll: true});
  }

  function renderMeal(meal, index) {
    const card = template.content.cloneNode(true);
    const photo = card.querySelector('img');
    photo.src = './meal-photos/' + meal.photo;
    photo.alt = meal.title + ' 완성 예시';
    const credit = card.querySelector('.meal-credit');
    credit.href = meal.source;
    credit.textContent = meal.photographer + ' · Unsplash';
    card.querySelector('.meal-meta').textContent = meal.time + ' · 약 ' + meal.minutes + '분';
    card.querySelector('h3').textContent = meal.title;
    card.querySelector('.meal-allergens').textContent = '알레르기 확인 · ' + meal.allergens;
    card.querySelector('.meal-ingredients').textContent = meal.ingredients.join(' · ');
    card.querySelector('.meal-reason').textContent = meal.reason;
    card.querySelector('.meal-nutrition-basis').textContent = meal.nutritionBasis;
    const nutrition = card.querySelector('.meal-nutrients');
    nutrientLabels.forEach(([label, unit], index) => {
      const row = document.createElement('div');
      const name = document.createElement('dt');
      name.textContent = label;
      const amount = document.createElement('dd');
      const value = unit === 'g' ? meal.nutrients[index] : Math.round(meal.nutrients[index]);
      amount.textContent = nutrientAmount.format(value) + ' ' + unit;
      row.append(name, amount);
      nutrition.append(row);
    });
    card.querySelector('.meal-seasoning').textContent = '양념 · ' + meal.seasoning;

    const recipe = card.querySelector('.meal-recipe');
    recipe.id = 'meal-recipe-' + index;
    const steps = recipe.querySelector('ol');
    for (const step of meal.steps) {
      const item = document.createElement('li');
      item.textContent = step;
      steps.append(item);
    }
    const toggle = card.querySelector('button');
    toggle.setAttribute('aria-controls', recipe.id);
    toggle.addEventListener('click', () => {
      recipe.hidden = !recipe.hidden;
      toggle.setAttribute('aria-expanded', String(!recipe.hidden));
    });
    return card;
  }

  function updateAgeMode() {
    const showAdultFields = ageInput.validity.valid && ageInput.valueAsNumber >= 20;
    if (adultFields.hidden === !showAdultFields) return;
    adultFields.hidden = !showAdultFields;
    adultFields.disabled = !showAdultFields;
    currentPlan = null;
    nextMenu.hidden = true;
    list.replaceChildren();
    status.textContent = '';
  }

  function showMeals(preferences, restored = false) {
    const {isYouth, goal} = preferences;
    currentPlan = preferences;
    list.replaceChildren(...mealsFor(preferences).map(renderMeal));
    nextMenu.hidden = false;
    status.textContent = isYouth
      ? '성장기에 참고할 아침 · 점심 · 저녁 메뉴예요. 칼이나 뜨거운 조리 도구는 어른과 함께 사용해요.'
      : '입력하신 조건을 반영한 아침 · 점심 · 저녁 1인분 예시예요.';
    if (!isYouth && goal === 'training') status.textContent += ' 운동 후 단백질을 챙길 수 있도록 단백질 재료의 양을 늘렸어요.';
    if (!isYouth && goal === 'hearty') status.textContent += ' 활동 많은 날에 든든하게 먹을 수 있도록 곡류나 감자의 양을 늘렸어요.';
    if (restored) status.textContent = '마지막으로 추천받은 식단이에요. ' + status.textContent;
  }

  function showAndSaveNext(preferences) {
    const remainingVariations = currentPlan?.remainingVariations.length
      ? currentPlan.remainingVariations
      : shuffledVariations(currentPlan?.variation);
    const variation = remainingVariations.pop();
    showMeals({...preferences, variation, catalogVersion, remainingVariations});
    try {
      localStorage.setItem(mealStorageKey, JSON.stringify(currentPlan));
    } catch {
      status.textContent += ' 이 브라우저에서는 식단을 저장할 수 없어요.';
    }
    status.focus();
  }

  nextMenu.addEventListener('click', () => showAndSaveNext(currentPlan));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const age = ageInput.valueAsNumber;
    const preferences = mealPreferences({
      age, height: Number(fields.get('height')),
      weight: Number(fields.get('weight')), sex: fields.get('sex'),
      activity: fields.get('activity'), goal: fields.get('goal')
    });
    showAndSaveNext(preferences);
  });

  ageInput.addEventListener('input', updateAgeMode);
  window.addEventListener('pageshow', updateAgeMode);
  updateAgeMode();
  if (currentPlan) showMeals(currentPlan, true);
  form.querySelector('button[type=submit]').disabled = false;
  window.addEventListener('hashchange', showPage);
  showPage();
}
