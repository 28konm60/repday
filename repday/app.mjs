import {schedule, planFor, workoutProgress, pendingCheckIn, badges} from './routine.mjs';
import {initMeals} from './meals.mjs';
import {initAccount} from './account.mjs';
import {initFootball} from './football.mjs';

const byId = id => document.getElementById(id);
const storageKey = 'repday-v1';
const dateFormat = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul', month: 'long', day: 'numeric'
});
const state = {anchor: null, level: 'beginner', history: {}, bodyRecords: [], advancedSets: 6, deviceSessionId: null};

try {
  Object.assign(state, JSON.parse(localStorage.getItem(storageKey) || '{}'));
} catch {
  byId('history-note').textContent = '저장된 기록을 읽을 수 없습니다.';
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    byId('history-note').textContent = '이 브라우저에서는 기록을 저장할 수 없습니다.';
  }
}

if (!/^[A-F0-9]{10}$/.test(state.deviceSessionId)) {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  state.deviceSessionId = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
}
byId('badge-session').textContent = '이 브라우저의 세션 · ' + state.deviceSessionId;

let current = schedule(Date.now(), state.anchor);
state.anchor = current.anchor;
let day = current.day;
let deadline = null;
const checkIn = byId('check-in');
const checkInOpen = byId('check-in-open');
let formMilestone = null;
let narration = null;
const level = byId('level');
level.value = state.level;
save();

const dayButtons = Array.from({length: 3}, (_, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  const number = document.createElement('span');
  number.textContent = 'DAY 0' + (index + 1);
  const target = document.createElement('small');
  target.textContent = ['하체 · 엉덩이', '상체 · 등', '코어 · 전신'][index];
  button.append(number, target);
  button.addEventListener('click', () => {
    day = index;
    render();
  });
  byId('days').append(button);
  return button;
});

function render() {
  const {focus, exercises} = planFor(current.cycle, day, state.level, state.advancedSets);
  byId('advanced-controls').hidden = state.level !== 'advanced';
  byId('level-summary').textContent = exercises.length + '종목 · 종목당 ' + exercises[0].sets + '세트';
  stopVoice();
  const key = [current.cycle, day, state.level, 'v5', exercises[0].sets].join('/');
  const checked = new Set(state.history[key]?.checked);
  byId('day-label').textContent = 'DAY 0' + (day + 1);
  byId('focus').textContent = focus;
  byId('renewal').textContent = '다음 루틴 ' + dateFormat.format(current.next) + ' 오전 8시 (한국 시간)';
  dayButtons.forEach((button, index) => button.setAttribute('aria-pressed', index === day));

  function updateProgress() {
    byId('progress').textContent = checked.size + ' / ' + exercises.length + ' 완료';
    byId('meter').max = exercises.length;
    byId('meter').value = checked.size;
  }

  byId('exercises').replaceChildren(...exercises.map(({name, dose, rest, method, audioId}, index) => {
    const row = document.createElement('li');
    row.className = 'exercise';
    row.dataset.number = String(index + 1).padStart(2, '0');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = checked.has(index);
    const title = document.createElement('span');
    title.textContent = name;
    const details = document.createElement('small');
    details.textContent = dose;
    title.append(details);
    label.append(input, title);
    input.addEventListener('change', () => {
      const previousMilestone = pendingCheckIn(workoutProgress(state.history).routines, state.bodyRecords);
      if (input.checked) checked.add(index);
      else checked.delete(index);
      if (checked.size) state.history[key] = {
        checked: [...checked], at: Date.now(), label: (day + 1) + '일 차 · ' + focus,
        level: level.selectedOptions[0].textContent, total: exercises.length, sets: exercises[0].sets, version: 5
      };
      else delete state.history[key];
      save();
      updateProgress();
      renderHistory();
      renderBadges();
      const milestone = renderBody();
      if (milestone !== null && milestone !== previousMilestone && input.checked && checkIn.hidden) {
        openCheckIn(milestone, true);
      }
    });
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '휴식 ' + rest + '초';
    button.setAttribute('aria-label', name + ' 휴식 ' + rest + '초 시작');
    button.addEventListener('click', () => {
      stopVoice();
      deadline = Date.now() + rest * 1000;
      byId('timer-status').textContent = name + ' 후 휴식 중';
      byId('stop').disabled = false;
      updateTimer();
    });
    const description = document.createElement('p');
    description.textContent = method;
    const actions = document.createElement('div');
    actions.className = 'exercise-actions';
    const voice = document.createElement('button');
    voice.type = 'button';
    voice.textContent = '🔊 듣기';
    voice.setAttribute('aria-label', name + ' 운동 안내 듣기');
    voice.addEventListener('click', () => playVoice(audioId));
    actions.append(voice, button);
    row.append(label, actions, description);
    return row;
  }));
  updateProgress();
  renderHistory();
}

function stopVoice() {
  const audio = narration;
  narration = null;
  if (audio) audio.pause();
  byId('voice-stop').hidden = true;
  byId('voice-status').textContent = '';
}

function playVoice(audioId) {
  stopVoice();
  const audio = new Audio('./voice-v5/' + audioId + '.mp3');
  narration = audio;
  byId('voice-stop').hidden = false;
  byId('voice-status').textContent = '음성 안내를 불러오는 중';
  const failed = () => {
    if (narration !== audio) return;
    stopVoice();
    byId('voice-status').textContent = '음성을 재생하지 못했어요. 인터넷 연결을 확인하고 다시 눌러 주세요.';
  };
  audio.addEventListener('ended', () => {
    if (narration === audio) stopVoice();
  });
  audio.addEventListener('playing', () => {
    if (narration === audio) byId('voice-status').textContent = '한국어 음성 안내 재생 중';
  });
  audio.addEventListener('error', failed);
  audio.play().catch(failed);
}

function openCheckIn(milestone, focus) {
  formMilestone = milestone;
  checkIn.hidden = false;
  checkInOpen.hidden = true;
  if (focus) checkIn.elements.energy.focus();
}

function closeCheckIn() {
  checkIn.reset();
  checkIn.hidden = true;
  checkInOpen.hidden = false;
  formMilestone = null;
}

function renderBody() {
  const {routines, exercises} = workoutProgress(state.history);
  const milestone = pendingCheckIn(routines, state.bodyRecords);
  const meter = byId('routine-meter');
  meter.value = milestone === null ? routines % 4 : 4;
  byId('routine-count').textContent = '3일 루틴 ' + routines + '회 완료 · 운동 체크 ' + exercises + '개';
  byId('check-in-prompt').textContent = milestone === null
    ? '다음 몸 상태 질문까지 루틴 ' + (4 - meter.value) + '회 남았어요.'
    : '3일 루틴을 ' + milestone + '회 완료했어요! 지금 몸 상태는 어때요?';
  checkInOpen.textContent = milestone === null ? '오늘 몸 상태 기록' : '몸 상태 질문에 답하기';

  const records = state.bodyRecords;
  const weights = records.filter(record => record.weight !== null);
  const latest = records.at(-1);
  const previous = records.at(-2);
  const trend = field => previous && previous[field] !== latest[field]
    ? previous[field] + ' → ' + latest[field] : latest[field];
  let summary = latest ? '컨디션 ' + trend('energy') + ' · 뻐근함 ' + trend('soreness')
    : '첫 몸 상태를 남기면 이후 기록과 비교할 수 있어요.';
  if (weights.length >= 2) {
    const first = weights[0].weight;
    const last = weights.at(-1).weight;
    summary += ' · 체중 ' + first + ' → ' + last + ' kg';
  }
  byId('body-summary').textContent = summary;
  byId('body-history').replaceChildren(...records.slice(-12).reverse().map(record => {
    const row = document.createElement('li');
    const title = document.createElement('strong');
    title.textContent = dateFormat.format(record.at) +
      (record.milestone ? ' · 루틴 ' + record.milestone + '회 완료' : '');
    const details = document.createElement('p');
    details.textContent = '컨디션 ' + record.energy + ' · 뻐근함 ' + record.soreness +
      (record.weight === null ? '' : ' · ' + record.weight + ' kg');
    row.append(title, details);
    if (record.note) {
      const note = document.createElement('p');
      note.textContent = record.note;
      row.append(note);
    }
    return row;
  }));
  return milestone;
}

checkInOpen.addEventListener('click', () => openCheckIn(renderBody(), true));
byId('check-in-later').addEventListener('click', () => {
  closeCheckIn();
  checkInOpen.focus();
});
checkIn.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(checkIn);
  const milestone = pendingCheckIn(workoutProgress(state.history).routines, state.bodyRecords);
  state.bodyRecords.push({
    milestone: formMilestone === milestone ? milestone : null,
    at: Date.now(), energy: data.get('energy'), soreness: data.get('soreness'),
    weight: data.get('weight') ? Number(data.get('weight')) : null,
    note: data.get('note').trim()
  });
  save();
  closeCheckIn();
  renderBody();
  renderBadges();
  checkInOpen.focus();
});
byId('voice-stop').addEventListener('click', stopVoice);

function renderHistory() {
  const recent = Object.values(state.history).sort((a, b) => b.at - a.at).slice(0, 12);
  byId('history').replaceChildren(...recent.map(entry => {
    const row = document.createElement('li');
    row.textContent = [dateFormat.format(entry.at), entry.label, entry.level, entry.checked.length + '개 완료'].join(' · ');
    return row;
  }));
}

function updateTimer() {
  if (deadline === null) return;
  const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  byId('remaining').textContent = [Math.floor(seconds / 60), seconds % 60]
    .map(value => String(value).padStart(2, '0')).join(':');
  if (seconds === 0) endTimer('휴식이 끝났어요.');
}

function endTimer(message) {
  deadline = null;
  byId('remaining').textContent = '00:00';
  byId('timer-status').textContent = message;
  byId('stop').disabled = true;
}

function refreshSchedule() {
  const next = schedule(Date.now(), state.anchor);
  if (next.cycle === current.cycle && next.day === current.day) return;
  current = next;
  day = next.day;
  render();
}

byId('advanced-sets').value = state.advancedSets;
byId('advanced-sets').addEventListener('change', event => {
  state.advancedSets = Number(event.target.value);
  save();
  render();
});
level.addEventListener('change', () => {
  state.level = level.value;
  save();
  render();
});
byId('stop').addEventListener('click', () => endTimer('휴식을 종료했어요.'));
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  updateTimer();
  refreshSchedule();
});
setInterval(updateTimer, 250);
setInterval(refreshSchedule, 15000);
render();
renderBadges();
const pending = renderBody();
if (pending !== null && ['#workout', '#records', '#body-progress', '#awards'].includes(location.hash)) openCheckIn(pending, false);
initMeals();
initFootball();
renderPage();
window.addEventListener('hashchange', renderPage);
initAccount();

function renderPage() {
  const hash = window.location.hash;
  const selected = hash === '#meals' ? 'meals' : ['#workout', '#records', '#body-progress', '#awards'].includes(hash) ? 'training' : 'football';
  for (const page of ['football', 'training', 'meals']) byId(page).hidden = page !== selected;
  document.querySelectorAll('.bottom-nav a, .header-actions a').forEach(link => {
    if (link.hash === hash || (!hash && link.hash === '#football')) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  const target = byId(hash.slice(1));
  if (target && !target.closest('[hidden]')) target.scrollIntoView();
  else window.scrollTo(0, 0);
}

if ('serviceWorker' in navigator && window.isSecureContext) {
  const workers = navigator.serviceWorker;
  let controller = workers.controller;
  let updatePending = false;

  function applyUpdate() {
    if (!updatePending || document.hidden || deadline !== null || narration || !checkIn.hidden || document.activeElement?.closest('#meals') || byId('account-dialog').open) return;
    window.location.reload();
  }

  workers.addEventListener('controllerchange', () => {
    if (controller && workers.controller !== controller) updatePending = true;
    controller = workers.controller;
    applyUpdate();
  });
  document.addEventListener('visibilitychange', applyUpdate);
  setInterval(applyUpdate, 15000);

  workers.register('./sw.js', {updateViaCache: 'none'}).then(registration => {
    function checkForUpdate() {
      if (document.hidden || !navigator.onLine) return;
      registration.update().catch(error => console.warn('업데이트 확인 실패', error));
    }

    document.addEventListener('visibilitychange', checkForUpdate);
    window.addEventListener('online', checkForUpdate);
    setInterval(checkForUpdate, 5 * 60 * 1000);
    checkForUpdate();
  }).catch(error => console.warn('오프라인 준비 실패', error));
}

function renderBadges() {
  const progress = {...workoutProgress(state.history), bodyCheckIns: state.bodyRecords.length};
  byId('badge-count').textContent = badges.filter(badge => progress[badge.metric] >= badge.target).length + ' / ' + badges.length + ' 획득';
  byId('badges').replaceChildren(...badges.map(badge => {
    const earned = progress[badge.metric] >= badge.target;
    const card = document.createElement('li');
    card.className = 'badge ' + (earned ? 'earned' : 'locked');
    card.style.setProperty('--badge', badge.color);
    const icon = document.createElement('div');
    icon.className = 'badge-emblem';
    icon.textContent = badge.symbol;
    icon.setAttribute('aria-hidden', 'true');
    const title = document.createElement('strong');
    title.textContent = badge.name;
    const status = document.createElement('p');
    status.textContent = earned ? '획득 완료' : Math.min(progress[badge.metric], badge.target) + ' / ' + badge.target;
    const goal = document.createElement('small');
    goal.textContent = badge.goal;
    card.append(icon, title, status, goal);
    return card;
  }));
}

document.querySelector('a[href="#records"]').addEventListener('click', () => {
  byId('records').open = true;
});
