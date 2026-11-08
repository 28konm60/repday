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

const extras = [
  [
    ['사이드 런지','한 발을 옆으로 넓게 디디며 엉덩이를 뒤로 보내세요.','회씩'],
    ['스플릿 스쿼트','두 발을 앞뒤로 두고 몸을 수직으로 내렸다 올리세요.','회씩'],
    ['와이드 스쿼트','두 발을 넓게 벌리고 무릎과 발끝 방향을 맞추며 앉으세요.','회'],
    ['싱글 레그 브리지','누워 한 발을 들고 반대쪽 발로 바닥을 밀어 엉덩이를 드세요.','회씩'],
    ['옆으로 누워 다리 들기','옆으로 누워 골반을 고정하고 위쪽 다리를 천천히 드세요.','회씩'],
    ['동키 킥','네발 자세에서 무릎을 굽힌 채 한쪽 발바닥을 위로 밀어 주세요.','회씩'],
    ['파이어 하이드런트','네발 자세에서 골반을 고정하고 무릎을 옆으로 벌리세요.','회씩']
  ],
  [
    ['파이크 푸쉬업','엉덩이를 높인 자세에서 팔꿈치를 굽혀 머리를 바닥 쪽으로 내리세요.','회'],
    ['엎드려 Y 올리기','엎드려 팔을 Y자로 뻗고 어깨를 낮춘 채 팔을 조금 드세요.','회'],
    ['엎드려 T 올리기','엎드려 팔을 옆으로 벌리고 날개뼈를 모으며 팔을 조금 드세요.','회'],
    ['스캐풀라 푸쉬업','플랭크 자세에서 팔을 편 채 날개뼈를 모았다가 바닥을 밀어내세요.','회'],
    ['좁은 푸쉬업','손을 어깨보다 조금 좁게 두고 팔꿈치를 몸 가까이 굽혔다 펴세요.','회'],
    ['리버스 플랭크','앉아서 손을 몸 뒤에 두고 가슴을 펴며 엉덩이를 들어 주세요.','초'],
    ['베어 홀드','네발 자세에서 무릎을 바닥에서 조금 띄우고 등을 평평하게 유지하세요.','초']
  ],
  [
    ['마운틴 클라이머','플랭크 자세에서 무릎을 번갈아 가슴 쪽으로 당기세요.','회씩'],
    ['바이시클 크런치','누워 반대쪽 어깨와 무릎을 가까이하며 천천히 교차하세요.','회씩'],
    ['리버스 크런치','누워 무릎을 굽히고 배에 힘을 주며 골반을 살짝 말아 올리세요.','회'],
    ['할로우 홀드','누워 허리를 바닥에 붙이고 팔과 다리를 편한 높이로 들어 유지하세요.','초'],
    ['플랭크 힙 터치','팔꿈치 플랭크에서 골반을 좌우로 천천히 회전하세요.','회씩'],
    ['점핑 잭','발을 벌리며 팔을 올렸다가 가볍게 착지하며 돌아오세요.','초'],
    ['버피','손을 바닥에 짚고 두 발을 뒤로 보냈다가 돌아와 일어나세요.','회']
  ]
];
const levels = {
  beginner: {sets: 2, reps: 8, seconds: 20, rest: 60, count: 3},
  standard: {sets: 4, reps: 12, seconds: 30, rest: 60, count: 6},
  advanced: {sets: 6, reps: 16, seconds: 40, rest: 90, count: 10}
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

export function planFor(cycle, day, level, advancedSets = 6) {
  const [focus, slots] = days[day];
  const config = levels[level] ?? levels.beginner;
  const {reps, seconds, rest, count} = config;
  const sets = level === 'advanced' ? Math.max(6, Math.min(10, Number(advancedSets) || 6)) : config.sets;
  const selectedSlots = [...slots, ...extras[day].map(exercise => [exercise])].slice(0, count);
  return {
    focus,
    exercises: selectedSlots.map((options, index) => {
      const variant = (cycle + Math.floor(cycle / 2) * index) % options.length;
      const [name, method, unit] = options[variant];
      const amount = unit.startsWith('초') ? seconds : reps;
      return {
        name, method, dose: sets + '세트 × ' + amount + unit, rest,
        sets, audioId: [day, index, variant].join('-')
      };
    })
  };
}

export function workoutProgress(history) {
  const completedDays = new Map();
  let exercises = 0;
  let sets = 0;
  let standardDays = 0;
  let advancedDays = 0;
  for (const [key, entry] of Object.entries(history)) {
    const [cycle, day, level] = key.split('/');

    const checked = new Set(entry.checked);
    const total = entry.total ?? 3;
    const valid = [...checked].filter(index => Number.isInteger(index) && index >= 0 && index < total);
    exercises += valid.length;
    sets += valid.length * (entry.sets ?? (level === 'beginner' ? 2 : 3));
    if (valid.length !== total) continue;
    if (entry.version === 5 && level === 'standard') standardDays++;
    if (entry.version === 5 && level === 'advanced') advancedDays++;
    if (!completedDays.has(cycle)) completedDays.set(cycle, new Set());
    completedDays.get(cycle).add(day);
  }
  const routines = [...completedDays.values()].filter(days => days.size === 3).length;
  return {exercises, routines, sets, standardDays, advancedDays};
}

export function pendingCheckIn(routines, records) {
  const answered = new Set(records.map(record => record.milestone));
  for (let milestone = 4; milestone <= routines; milestone += 4) {
    if (!answered.has(milestone)) return milestone;
  }
  return null;
}

export const trophies = [
  {id:'first', name:'첫 덤벨', goal:'운동 1개 완료', metric:'exercises', target:1, color:'#c79266', shape:'round'},
  {id:'bronze', name:'브론즈 덤벨', goal:'누적 30세트', metric:'sets', target:30, color:'#cd8754', shape:'square'},
  {id:'silver', name:'실버 덤벨', goal:'누적 100세트', metric:'sets', target:100, color:'#cedce5', shape:'round'},
  {id:'gold', name:'골드 덤벨', goal:'누적 300세트', metric:'sets', target:300, color:'#ffd05d', shape:'square'},
  {id:'routine', name:'에메랄드 덤벨', goal:'3일 루틴 4회', metric:'routines', target:4, color:'#70e0a1', shape:'round'},
  {id:'standard', name:'사파이어 덤벨', goal:'중수 하루치 3회', metric:'standardDays', target:3, color:'#6aaeff', shape:'square'},
  {id:'advanced', name:'루비 덤벨', goal:'고수 하루치 3회', metric:'advancedDays', target:3, color:'#ff7994', shape:'round'},
  {id:'legend', name:'왕관 덤벨', goal:'누적 1000세트', metric:'sets', target:1000, color:'#c8a5ff', shape:'crown'}
];
