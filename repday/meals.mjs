const meals = [
  {
    time: '아침', title: '베리 그릭요거트 볼', minutes: 5, photo: 'yogurt.jpg',
    photographer: 'Natalie Behn', source: 'https://unsplash.com/photos/qj_zfYm-sdI', allergens: '우유 · 그래놀라 제품에 따라 밀이나 견과류',
    ingredients: [['플레인 그릭요거트', 200, 'protein'], ['그래놀라', 45, 'starch'], ['블랙베리', 100]],
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
    ingredients: [['지은 현미밥', 190, 'starch'], ['닭가슴살', 140, 'protein'], ['방울토마토', 100], ['익힌 강낭콩', 50], ['옥수수', 40]],
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
    ingredients: [['연어', 140, 'protein'], ['감자', 230, 'starch'], ['파프리카와 양파', 180]],
    seasoning: '올리브유 2작은술, 레몬 ¼개, 후추와 파슬리 약간',
    steps: [
      '오븐을 220°C로 예열해요. 감자를 얇은 웨지 모양으로 썰어 올리브유 1작은술을 묻힌 뒤 15분 먼저 구워요.',
      '감자를 뒤집고 파프리카와 양파, 연어를 옆에 놓아요. 남은 올리브유와 후추를 뿌려 연어의 가장 두꺼운 부분이 63°C에 이를 때까지 구워요.',
      '완성한 연어에 레몬즙을 짜고 파슬리를 뿌려요. 노릇하게 구운 감자와 채소를 곁들여요.'
    ]
  }
];

const activityFactors = {low: 1.2, moderate: 1.4, high: 1.6};

export function recommendMeals({age, sex, height, weight, activity, goal}) {
  // Use the Mifflin–St Jeor estimate to choose a broad example serving size.
  const resting = 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161);
  const estimated = resting * activityFactors[activity];
  const size = estimated >= 2500 ? 1.25 : estimated >= 1900 ? 1.1 : 1;
  const proteinScale = goal === 'training' ? size * 1.15 : size;
  const starchScale = goal === 'hearty' ? size * 1.15 : size;

  return meals.map(meal => ({
    ...meal,
    ingredients: meal.ingredients.map(([name, grams, group]) => {
      const scale = group === 'protein' ? proteinScale : group === 'starch' ? starchScale : 1;
      return name + ' ' + Math.round(grams * scale / 5) * 5 + 'g';
    })
  }));
}

export function initMeals() {
  const page = document.getElementById('meals');
  const home = document.getElementById('training');
  const form = document.getElementById('meal-form');
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

  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const plan = recommendMeals({
      age: Number(fields.get('age')), height: Number(fields.get('height')),
      weight: Number(fields.get('weight')), sex: fields.get('sex'),
      activity: fields.get('activity'), goal: fields.get('goal')
    });
    list.replaceChildren(...plan.map(renderMeal));
    status.textContent = '입력하신 조건을 반영한 아침 · 점심 · 저녁 1인분 예시예요.';
    status.focus();
  });

  form.querySelector('button[type=submit]').disabled = false;
  window.addEventListener('hashchange', showPage);
  showPage();
}
