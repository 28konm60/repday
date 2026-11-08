// USDA SR28, per 100 g: kcal, carbohydrate g, protein g, fat g, fiber g, sodium mg.
const foodNutrients = {
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
  }
];

const activityFactors = {low: 1.2, moderate: 1.4, high: 1.6};

const mealStorageKey = 'repday-meal-plan-v1';
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

export function recommendMeals(profile) {
  return mealsFor(mealPreferences(profile));
}

function mealsFor({isYouth, size, goal}) {
  const proteinScale = !isYouth && goal === 'training' ? size * 1.15 : size;
  const starchScale = !isYouth && goal === 'hearty' ? size * 1.15 : size;

  return meals.map(meal => {
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

function readSavedMeals() {
  try {
    const saved = JSON.parse(localStorage.getItem(mealStorageKey));
    if (saved && typeof saved.isYouth === 'boolean' &&
        [1, 1.1, 1.25].includes(saved.size) && mealGoals.includes(saved.goal)) return saved;
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
    list.replaceChildren();
    status.textContent = '';
  }

  function showMeals(preferences, restored = false) {
    const {isYouth, goal} = preferences;
    list.replaceChildren(...mealsFor(preferences).map(renderMeal));
    status.textContent = isYouth
      ? '성장기에 참고할 아침 · 점심 · 저녁 메뉴예요. 칼이나 뜨거운 조리 도구는 어른과 함께 사용해요.'
      : '입력하신 조건을 반영한 아침 · 점심 · 저녁 1인분 예시예요.';
    if (!isYouth && goal === 'training') status.textContent += ' 운동 후 단백질을 챙길 수 있도록 요거트·닭·연어의 양을 늘렸어요.';
    if (!isYouth && goal === 'hearty') status.textContent += ' 활동 많은 날에 든든하게 먹을 수 있도록 그래놀라·현미밥·감자의 양을 늘렸어요.';
    if (restored) status.textContent = '마지막으로 추천받은 식단이에요. ' + status.textContent;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const age = ageInput.valueAsNumber;
    const preferences = mealPreferences({
      age, height: Number(fields.get('height')),
      weight: Number(fields.get('weight')), sex: fields.get('sex'),
      activity: fields.get('activity'), goal: fields.get('goal')
    });
    showMeals(preferences);
    try {
      localStorage.setItem(mealStorageKey, JSON.stringify(preferences));
    } catch {
      status.textContent += ' 이 브라우저에서는 식단을 저장할 수 없어요.';
    }
    status.focus();
  });

  ageInput.addEventListener('input', updateAgeMode);
  window.addEventListener('pageshow', updateAgeMode);
  updateAgeMode();
  const saved = readSavedMeals();
  if (saved) showMeals(saved, true);
  form.querySelector('button[type=submit]').disabled = false;
  window.addEventListener('hashchange', showPage);
  showPage();
}
