import {schedule, planFor} from './routine.mjs';

const byId = id => document.getElementById(id);
const storageKey = 'repday-v1';
const dateFormat = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul', month: 'long', day: 'numeric'
});
const state = {anchor: null, level: 'beginner', history: {}};

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

let current = schedule(Date.now(), state.anchor);
state.anchor = current.anchor;
let day = current.day;
let deadline = null;
const level = byId('level');
level.value = state.level;
save();

const dayButtons = Array.from({length: 3}, (_, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = (index + 1) + '일 차';
  button.addEventListener('click', () => {
    day = index;
    render();
  });
  byId('days').append(button);
  return button;
});

function render() {
  const {focus, exercises} = planFor(current.cycle, day, state.level);
  const key = [current.cycle, day, state.level].join('/');
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

  byId('exercises').replaceChildren(...exercises.map(({name, dose, rest, method}, index) => {
    const row = document.createElement('li');
    row.className = 'exercise';
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
      if (input.checked) checked.add(index);
      else checked.delete(index);
      if (checked.size) state.history[key] = {
        checked: [...checked], at: Date.now(), label: (day + 1) + '일 차 · ' + focus,
        level: level.selectedOptions[0].textContent
      };
      else delete state.history[key];
      save();
      updateProgress();
      renderHistory();
    });
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '휴식 ' + rest + '초';
    button.setAttribute('aria-label', name + ' 휴식 ' + rest + '초 시작');
    button.addEventListener('click', () => {
      deadline = Date.now() + rest * 1000;
      byId('timer-status').textContent = name + ' 후 휴식 중';
      byId('stop').disabled = false;
      updateTimer();
    });
    const description = document.createElement('p');
    description.textContent = method;
    row.append(label, button, description);
    return row;
  }));
  updateProgress();
  renderHistory();
}

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

if ('serviceWorker' in navigator && window.isSecureContext) {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('오프라인 준비 실패', error));
}
