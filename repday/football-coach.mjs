import {drills, readProgress, updateFootballProgress} from './football.mjs';

export const positions = {
  forward: {name:'공격수', categories:['finish','dribble','control']},
  midfielder: {name:'미드필더', categories:['pass','control','movement']},
  defender: {name:'수비수', categories:['movement','pass','dribble']},
  goalkeeper: {name:'골키퍼', categories:['keeper','pass','movement']}
};
const requirements = {
  slalom:['cones','field'], 'inside-cut':['cones'], 'pace-change':['field'],
  'wall-pass':['receiver'], 'first-touch':['receiver'], 'gate-pass':['cones'],
  'placed-finish':['goal','field'], 'touch-finish':['goal','field'], 'receive-finish':['goal','partner','field'],
  'side-step':['cones'], 'walk-dribble':['field'],
  'keeper-catch':['partner'], 'keeper-build':['receiver']
};
const levelNames = {beginner:'기초', standard:'중급', advanced:'숙련'};
const focusNames = {all:'전체 기본기', control:'볼 컨트롤', dribble:'드리블', pass:'패스', finish:'마무리', movement:'풋워크', keeper:'골키퍼 기본기'};

export function buildFootballPlan(profile) {
  const tools = new Set(profile.equipment);
  if (profile.partner) tools.add('partner');
  if (profile.partner || tools.has('wall')) tools.add('receiver');
  if (profile.space === 'field') tools.add('field');
  const available = drills.filter(drill => (requirements[drill.id] || []).every(tool => tools.has(tool)));
  const ranked = available.map(drill => ({
    drill, score: (drill.category === profile.focus ? 8 : 0) + profile.positions.reduce((score,id) => {
      const priority = positions[id].categories.indexOf(drill.category);
      return score + (priority < 0 ? 0 : 6 - priority * 2);
    },0)
  })).sort((a,b) => b.score - a.score);
  const desired = {beginner:3,standard:4,advanced:5}[profile.level] + Math.floor((profile.minutes - 10) / 5);
  const selected = ranked.slice(0, Math.min(desired, ranked.length)).map(item => item.drill);
  const rest = 30;
  const practiceBudget = profile.minutes * 60 - 180 - (selected.length - 1) * rest;
  const perDrill = Math.floor(practiceBudget / selected.length);
  const stages = [{kind:'warmup', name:'준비운동', seconds:120, description:'가볍게 걸으며 발목과 무릎을 편하게 움직여요. 주변 공간을 확인해요.'}];
  selected.forEach((drill,index) => {
    stages.push({kind:'drill', drillId:drill.id, name:drill.name, seconds:perDrill + (index === 0 ? practiceBudget % selected.length : 0), description:drill.point + ' ' + ({beginner:'천천히 익히고 중간에 편하게 쉬어요.',standard:'양발을 번갈아 사용하며 정확도를 살려요.',advanced:'정확도를 유지하는 범위에서 리듬을 바꿔 보세요.'})[profile.level]});
    if (index < selected.length - 1) stages.push({kind:'rest', name:'휴식', seconds:rest, description:'공을 멈추고 편하게 쉬어요. 다음 동작에 필요한 준비물을 확인해요.'});
  });
  stages.push({kind:'cooldown',name:'마무리',seconds:60,description:'천천히 걸으며 호흡을 정리하고 사용한 부위를 편하게 풀어 주세요.'});
  const selectedPositions = profile.positions.map(id => positions[id].name).join('·') || '공통 기본기';
  const reason = selectedPositions + ' · ' + levelNames[profile.level] + ' · ' + profile.minutes + '분. 사용 가능한 공간과 준비물에 맞는 ' +
    selected.length + '개 훈련을 골랐어요. ' + (profile.focus === 'all' || selected.some(drill => drill.category === profile.focus)
      ? focusNames[profile.focus] + '를 중심으로 연습해요.'
      : '선택한 기술에 필요한 준비물이나 공간이 부족해 가능한 기본기를 골랐어요.');
  return {profile, stages, drillIds:selected.map(drill => drill.id), reason};
}

const clock = seconds => Math.floor(Math.max(0,seconds) / 60).toString().padStart(2,'0') + ':' + (Math.max(0,seconds) % 60).toString().padStart(2,'0');

function validSession(saved) {
  return saved && typeof saved.id === 'string' && Number.isFinite(saved.startedAt) &&
    Array.isArray(saved.stages) && saved.stages.length > 0 && saved.stages.length < 40 &&
    saved.stages.every(stage => ['warmup','drill','rest','cooldown'].includes(stage.kind) && Number.isFinite(stage.seconds) && stage.seconds > 0 && stage.seconds <= 1800 &&
      (stage.kind !== 'drill' || drills.some(drill => drill.id === stage.drillId))) &&
    Number.isInteger(saved.index) && saved.index >= 0 && saved.index < saved.stages.length &&
    ['ready','running','paused','finished'].includes(saved.status) && Number.isFinite(saved.remaining) && saved.remaining >= 0 &&
    (saved.status !== 'running' || Number.isFinite(saved.deadline));
}

export function initFootballCoach() {
  const form = document.getElementById('football-settings');
  const preview = document.getElementById('football-plan');
  const notice = document.getElementById('coach-status');
  const dialog = document.getElementById('football-session');
  const toggle = document.getElementById('session-toggle');
  const next = document.getElementById('session-next');
  const previous = document.getElementById('session-previous');
  const resume = document.getElementById('football-resume');
  const start = document.getElementById('football-plan-start');
  const saved = readProgress();
  let plan;
  let session = validSession(saved.activeSession) ? saved.activeSession : null;
  let audio;

  function persist(markId) {
    const ok = updateFootballProgress(state => {
      state.activeSession = session;
      if (markId) {
        const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0,10);
        const completed = new Set(Array.isArray(state.completed[today]) ? state.completed[today] : []);
        completed.add(markId);
        state.completed[today] = [...completed];
      }
    });
    if (!ok) notice.textContent = '이 브라우저에서는 훈련 진행을 저장할 수 없어요.';
  }

  function beep() {
    if (!document.getElementById('session-sound').checked) return;
    try {
      audio ||= new (window.AudioContext || window.webkitAudioContext)();
      audio.resume();
      const tone = audio.createOscillator();
      const volume = audio.createGain();
      volume.gain.value = 0.08;
      tone.frequency.value = 660;
      tone.connect(volume);
      volume.connect(audio.destination);
      tone.start();
      tone.stop(audio.currentTime + 0.2);
    } catch {
      // The visible status still announces the end if audio is unavailable.
    }
  }

  function updateButtons() {
    resume.hidden = !session;
    start.disabled = Boolean(session);
    document.body.dataset.footballRunning = String(session?.status === 'running');
  }

  function renderStage() {
    if (!session) return;
    const stage = session.stages[session.index];
    document.getElementById('session-title').textContent = stage.name;
    document.getElementById('session-counter').textContent = (session.index + 1) + ' / ' + session.stages.length + ' 단계';
    document.getElementById('session-instruction').textContent = stage.description;
    document.getElementById('session-time').textContent = clock(Math.ceil(session.remaining));
    document.getElementById('session-phase').textContent = {ready:'준비되면 시작해요.',running:'연습 중간에도 편하게 쉬어 주세요.',paused:'일시정지했어요.',finished:'시간이 끝났어요. 완료하거나 다음으로 넘어가세요.'}[session.status];
    const steps = document.getElementById('session-steps');
    steps.replaceChildren();
    const drill = drills.find(item => item.id === stage.drillId);
    if (drill) {
      for (const step of drill.steps) {
        const item = document.createElement('li');
        item.textContent = step;
        steps.append(item);
      }
    }
    const visual = document.getElementById('session-visual');
    visual.hidden = !drill;
    visual.onclick = () => {
      pause();
      window.dispatchEvent(new CustomEvent('football-visual', {detail:stage.drillId}));
    };
    toggle.textContent = session.status === 'running' ? '일시정지' : session.status === 'paused' ? '이어서 시작' : '시작';
    toggle.disabled = session.status === 'finished';
    next.textContent = stage.kind === 'drill' ? '훈련 완료 후 다음' : session.index === session.stages.length - 1 ? '마무리 완료' : '다음 단계';
    previous.disabled = session.index === 0;
    updateButtons();
  }

  function pause() {
    if (!session || session.status !== 'running') return;
    session.remaining = Math.max(0, (session.deadline - Date.now()) / 1000);
    session.status = session.remaining > 0 ? 'paused' : 'finished';
    persist();
    renderStage();
  }

  function finish() {
    const finished = session;
    session = null;
    updateFootballProgress(state => {
      const sessions = Array.isArray(state.sessions) ? state.sessions : [];
      if (!sessions.some(item => item.id === finished.id)) {
        sessions.push({id:finished.id, startedAt:finished.startedAt, endedAt:Date.now(), completed:finished.completed, planned:finished.stages.filter(stage => stage.kind === 'drill').length});
      }
      state.sessions = sessions;
      state.activeSession = null;
    });
    dialog.close();
    document.getElementById('session-summary').hidden = false;
    document.getElementById('session-summary-text').textContent = '훈련 ' + finished.completed.length + '개 완료 · 시작부터 ' +
      Math.max(1, Math.round((Date.now() - finished.startedAt) / 60000)) + '분 경과(휴식 포함). 결과를 성장 기록에 남겨 보세요.';
    notice.textContent = '훈련을 마쳤어요.';
    updateButtons();
  }

  function advance(completed) {
    if (!session) return;
    const stage = session.stages[session.index];
    const mark = completed && stage.kind === 'drill' ? stage.drillId : null;
    if (mark && !session.completed.includes(mark)) session.completed.push(mark);
    if (session.index === session.stages.length - 1) {
      if (mark) persist(mark);
      finish();
      return;
    }
    session.index++;
    session.remaining = session.stages[session.index].seconds;
    session.status = 'ready';
    persist(mark);
    renderStage();
  }

  if (session) {
    session.completed = Array.isArray(session.completed) ? session.completed.filter(id => drills.some(drill => drill.id === id)) : [];
    if (session.status === 'running') {
      session.remaining = Math.max(0,(session.deadline - Date.now()) / 1000);
      session.status = session.remaining > 0 ? 'paused' : 'finished';
    }
  }
  updateButtons();

  document.querySelectorAll('[data-position]').forEach(button => {
    const id = button.dataset.position;
    button.addEventListener('click', () => {
      const input = form.querySelector('input[value="' + id + '"]');
      input.checked = !input.checked;
      button.setAttribute('aria-pressed', String(input.checked));
    });
  });
  form.addEventListener('change', () => {
    document.querySelectorAll('[data-position]').forEach(button => {
      button.setAttribute('aria-pressed', String(form.querySelector('input[value="' + button.dataset.position + '"]').checked));
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const profile = {
      level:fields.get('skill'), minutes:Number(fields.get('minutes')),
      partner:fields.get('partner') === 'yes', space:fields.get('space'),
      equipment:fields.getAll('equipment'), positions:fields.getAll('positions'), focus:fields.get('focus')
    };
    plan = buildFootballPlan(profile);
    preview.hidden = false;
    document.getElementById('football-plan-reason').textContent = plan.reason;
    const sequence = document.getElementById('football-plan-list');
    sequence.replaceChildren(...plan.stages.map(stage => {
      const item = document.createElement('li');
      item.textContent = stage.name + ' · ' + clock(stage.seconds);
      return item;
    }));
    notice.textContent = session ? '진행 중인 훈련을 마치거나 종료한 뒤 새 훈련을 시작할 수 있어요.' : '훈련 순서를 확인하고 시작해 보세요.';
    updateButtons();
    preview.scrollIntoView({block:'start'});
  });

  start.addEventListener('click', () => {
    if (!plan || session) return;
    session = {id:crypto.randomUUID(), stages:plan.stages, index:0, status:'ready', remaining:plan.stages[0].seconds, startedAt:Date.now(), completed:[]};
    document.getElementById('session-summary').hidden = true;
    persist();
    renderStage();
    dialog.showModal();
  });
  resume.addEventListener('click', () => {
    if (!session) return;
    renderStage();
    dialog.showModal();
  });
  dialog.addEventListener('close', pause);
  toggle.addEventListener('click', () => {
    if (!session) return;
    if (session.status === 'running') { pause(); return; }
    beep();
    session.deadline = Date.now() + session.remaining * 1000;
    session.status = 'running';
    persist();
    renderStage();
  });
  next.addEventListener('click', () => advance(true));
  document.getElementById('session-skip').addEventListener('click', () => advance(false));
  previous.addEventListener('click', () => {
    if (!session || session.index === 0) return;
    session.index--;
    session.status = 'ready';
    session.remaining = session.stages[session.index].seconds;
    persist();
    renderStage();
  });
  document.getElementById('session-end').addEventListener('click', finish);

  setInterval(() => {
    if (!session || session.status !== 'running') return;
    session.remaining = Math.max(0,(session.deadline - Date.now()) / 1000);
    document.getElementById('session-time').textContent = clock(Math.ceil(session.remaining));
    if (session.remaining === 0) {
      session.status = 'finished';
      beep();
      persist();
      renderStage();
    }
  }, 250);
}
