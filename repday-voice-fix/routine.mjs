const days = [
  ['하체와 엉덩이', [
    [['스쿼트', '의자에 앉듯 엉덩이를 뒤로 보내고 일어나세요.', '회'],
     ['뒤로 런지', '한 발씩 뒤로 디뎠다가 앞발로 바닥을 밀어 일어나세요.', '회씩']],
    [['글루트 브리지', '누워 무릎을 세우고 엉덩이를 들어 올리세요.', '회'],
     ['브리지 홀드', '누워 무릎을 세우고 엉덩이를 들어 자세를 유지하세요.', '초']],
    [['카프 레이즈', '발뒤꿈치를 들어 올렸다가 천천히 내리세요.', '회'],
     ['스쿼트 홀드', '얕게 앉아 무릎이 발끝 방향을 향하게 유지하세요.', '초']]
  ]],
  ['가슴·어깨·팔과 등', [
    [['푸쉬업', '몸을 곧게 유지하며 팔을 굽혔다 펴세요. 필요하면 무릎을 대세요.', '회'],
     ['느린 푸쉬업', '무릎을 대고 3초에 걸쳐 내려갔다가 올라오세요.', '회']],
    [['엎드려 W 올리기', '팔로 W 모양을 만들고 어깨를 으쓱하지 않으며 팔을 살짝 드세요.', '회'],
     ['리버스 스노 앤젤', '엎드려 가슴을 바닥 가까이 둔 채 팔을 옆에서 위로 움직이세요.', '회']],
    [['네발 어깨 터치', '네발 자세에서 몸통을 고정하고 반대쪽 어깨를 번갈아 터치하세요.', '회씩'],
     ['버드독', '네발 자세에서 반대쪽 팔과 다리를 뻗고 천천히 돌아오세요.', '회씩']]
  ]],
  ['코어와 가벼운 전신 운동', [
    [['플랭크', '팔꿈치를 어깨 아래에 두고 몸을 길게 유지하세요.', '초'],
     ['사이드 플랭크', '옆으로 누워 무릎을 굽히고 팔꿈치로 바닥을 밀어 골반을 들어요.', '초씩']],
    [['데드버그', '누워서 반대쪽 팔과 다리를 번갈아 천천히 내리세요.', '회씩'],
     ['크런치', '누워 무릎을 세우고 목을 당기지 않으며 어깨를 살짝 들어 올리세요.', '회']],
    [['제자리 빠른 걷기', '팔을 흔들며 편한 속도에서 조금씩 속도를 올리세요.', '초'],
     ['스텝 잭', '한쪽 발을 옆으로 디디며 양팔을 편한 높이까지 올리세요.', '초']]
  ]]
];

const levels = {
  beginner: {sets: 2, reps: 8, seconds: 20, rest: 60},
  standard: {sets: 3, reps: 10, seconds: 30, rest: 45},
  advanced: {sets: 3, reps: 15, seconds: 40, rest: 40}
};

const dayMs = 86400000;
const seoulMorningOffset = 3600000;

export function schedule(now, anchor) {
  // UTC 23:00부터 한국 시간 오전 8시의 새 운동일로 계산합니다.
  const workoutDay = Math.floor((now + seoulMorningOffset) / dayMs);
  const start = Number.isInteger(anchor) ? anchor : workoutDay;
  const elapsed = Math.max(0, workoutDay - start);
  const cycle = Math.floor(elapsed / 3);
  return {
    anchor: start, cycle, day: elapsed % 3,
    next: (start + (cycle + 1) * 3) * dayMs - seoulMorningOffset
  };
}

export function planFor(cycle, day, level) {
  const [focus, slots] = days[day];
  const {sets, reps, seconds, rest} = levels[level] ?? levels.beginner;
  return {
    focus,
    exercises: slots.map((options, index) => {
      const variant = (cycle + Math.floor(cycle / 2) * index) % options.length;
      const [name, method, unit] = options[variant];
      const amount = unit.startsWith('초') ? seconds : reps;
      return {
        name, method, dose: sets + '세트 × ' + amount + unit, rest,
        audioId: [day, index, variant, level].join('-')
      };
    })
  };
}

export function workoutProgress(history) {
  const completedDays = new Map();
  let exercises = 0;
  for (const [key, entry] of Object.entries(history)) {
    const [cycle, day, level] = key.split('/');
    const plan = planFor(Number(cycle), Number(day), level);
    const checked = new Set(entry.checked);
    exercises += checked.size;
    if (!plan.exercises.every((_, index) => checked.has(index))) continue;
    if (!completedDays.has(cycle)) completedDays.set(cycle, new Set());
    completedDays.get(cycle).add(day);
  }
  const routines = [...completedDays.values()].filter(days => days.size === 3).length;
  return {exercises, routines};
}

export function pendingCheckIn(routines, records) {
  const answered = new Set(records.map(record => record.milestone));
  for (let milestone = 4; milestone <= routines; milestone += 4) {
    if (!answered.has(milestone)) return milestone;
  }
  return null;
}
