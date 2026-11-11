import {readProgress, updateFootballProgress} from './football.mjs';

const metricNames = {juggling:'리프팅', pass:'패스', shoot:'목표 슈팅'};
const dateFormat = new Intl.DateTimeFormat('ko-KR', {month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
const valueOf = record => record.metric === 'juggling' ? record.success : record.success / record.attempts * 100;
const resultText = record => record.metric === 'juggling' ? record.success + '회' : record.success + ' / ' + record.attempts + '회 · ' + Math.round(valueOf(record)) + '%';

export function footballMeasurements(progress = readProgress()) {
  const saved = progress.measurements;
  if (!Array.isArray(saved)) return [];
  return saved.filter(record => record && typeof record.id === 'string' && Object.hasOwn(metricNames,record.metric) &&
    Number.isFinite(record.at) && Number.isInteger(record.success) && record.success >= 0 &&
    (record.metric === 'juggling' || (Number.isInteger(record.attempts) && record.attempts > 0 &&
      record.success <= record.attempts && Number.isFinite(record.distance) && record.distance > 0)));
}

function sameConditions(record, conditions) {
  return record.metric === conditions.metric && (record.metric === 'juggling' ||
    (record.distance === conditions.distance && record.attempts === conditions.attempts));
}

function svgElement(tag, attributes = {}) {
  const element = document.createElementNS('http://www.w3.org/2000/svg',tag);
  for (const [key,value] of Object.entries(attributes)) element.setAttribute(key,String(value));
  return element;
}

export function initFootballGrowth() {
  const form = document.getElementById('growth-form');
  const metric = form.elements.namedItem('metric');
  const success = form.elements.namedItem('success');
  const attempts = form.elements.namedItem('attempts');
  const distance = form.elements.namedItem('distance');
  const status = document.getElementById('growth-status');

  function conditions() {
    return {metric:metric.value, attempts:Number(attempts.value), distance:Number(distance.value)};
  }

  function updateMetric() {
    const juggling = metric.value === 'juggling';
    for (const input of [attempts,distance]) {
      input.disabled = juggling;
      input.required = !juggling;
      input.closest('label').hidden = juggling;
    }
    document.getElementById('growth-value-label').textContent = juggling ? '최대 연속 횟수' : '성공 횟수';
    success.max = juggling ? '100000' : attempts.value || '100000';
    success.setCustomValidity('');
  }

  function drawChart(selected) {
    const chart = document.getElementById('growth-chart');
    chart.replaceChildren();
    if (!selected.length) {
      chart.textContent = '이 조건의 첫 기록을 남겨 보세요.';
      return;
    }
    const recent = selected.slice(-10);
    const best = Math.max(...selected.map(valueOf));
    document.getElementById('growth-best').textContent = metric.value === 'juggling'
      ? '개인 최고 ' + best + '회' : '개인 최고 성공률 ' + Math.round(best) + '%';
    const svg = svgElement('svg', {viewBox:'0 0 480 190',role:'img','aria-label':'같은 조건에서 측정한 최근 ' + recent.length + '개 ' + metricNames[metric.value] + ' 기록'});
    const maximum = metric.value === 'juggling' ? Math.max(10,best) : 100;
    svg.append(svgElement('path',{d:'M42 18V150H458',fill:'none',stroke:'#8b9d79','stroke-width':1}));
    const upper = svgElement('text',{x:5,y:25,fill:'#4a6040','font-size':11});
    upper.textContent = Math.ceil(maximum) + (metric.value === 'juggling' ? '회' : '%');
    svg.append(upper);
    const points = recent.map((record,index) => [recent.length === 1 ? 250 : 52 + index * 390 / (recent.length - 1), 145 - valueOf(record) / maximum * 115]);
    svg.append(svgElement('polyline',{points:points.map(point=>point.join(',')).join(' '),fill:'none',stroke:'#527039','stroke-width':3}));
    recent.forEach((record,index) => {
      const [x,y] = points[index];
      const dot = svgElement('circle',{cx:x,cy:y,r:5,fill:'#527039'});
      const title = svgElement('title');
      title.textContent = dateFormat.format(record.at) + ' · ' + resultText(record);
      dot.append(title);
      const label = svgElement('text',{x,y:171,'text-anchor':'middle',fill:'#4a6040','font-size':10});
      label.textContent = new Date(record.at).toLocaleDateString('ko-KR',{month:'numeric',day:'numeric'});
      svg.append(dot,label);
    });
    chart.append(svg);
  }

  function render() {
    const all = footballMeasurements();
    const selected = all.filter(record => sameConditions(record,conditions())).sort((a,b)=>a.at-b.at);
    document.getElementById('growth-best').textContent = '아직 측정 기록이 없어요.';
    document.getElementById('growth-condition').textContent = metric.value === 'juggling' ? '리프팅 연속 횟수'
      : metricNames[metric.value] + ' · ' + distance.value + 'm · ' + attempts.value + '회 시도';
    drawChart(selected);
    const list = document.getElementById('growth-history');
    list.replaceChildren(...selected.slice(-10).reverse().map(record => {
      const item = document.createElement('li');
      const text = document.createElement('span');
      text.textContent = dateFormat.format(record.at) + ' · ' + resultText(record) + (record.note ? ' · ' + record.note : '');
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = '삭제';
      remove.setAttribute('aria-label',dateFormat.format(record.at) + ' ' + metricNames[record.metric] + ' 기록 삭제');
      remove.addEventListener('click',() => {
        const ok = updateFootballProgress(saved => {
          saved.measurements = (Array.isArray(saved.measurements) ? saved.measurements : []).filter(item=>item.id!==record.id);
        });
        status.textContent = ok ? '기록을 삭제했어요.' : '기록을 삭제하지 못했어요.';
      });
      item.append(text,remove);
      return item;
    }));
    const milestones = [
      ['첫 측정',all.length >= 1],
      ['관찰의 습관',all.length >= 5],
      ['리프팅 10회',all.some(record=>record.metric==='juggling' && record.success>=10)],
      ['정확한 패스',all.some(record=>record.metric==='pass' && record.attempts>=10 && valueOf(record)>=80)],
      ['마무리의 감각',all.some(record=>record.metric==='shoot' && record.attempts>=10 && valueOf(record)>=60)]
    ];
    const badges = document.getElementById('growth-badges');
    badges.replaceChildren(...milestones.map(([name,earned]) => {
      const item = document.createElement('li');
      item.className = 'growth-badge ' + (earned ? 'earned' : '');
      item.textContent = (earned ? '★ ' : '☆ ') + name;
      item.setAttribute('aria-label',name + (earned ? ' 획득' : ' 미획득'));
      return item;
    }));
  }

  form.addEventListener('change',()=>{updateMetric();render();});
  attempts.addEventListener('input',updateMetric);
  success.addEventListener('input',()=>success.setCustomValidity(''));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const input = new FormData(form);
    const record = {
      id:crypto.randomUUID(), at:Date.now(), metric:metric.value, success:Number(success.value),
      attempts:metric.value==='juggling' ? null : Number(attempts.value),
      distance:metric.value==='juggling' ? null : Number(distance.value),
      note:String(input.get('note') || '').trim()
    };
    if (record.metric !== 'juggling' && record.success > record.attempts) {
      success.setCustomValidity('성공 횟수는 시도 횟수보다 클 수 없어요.');
      success.reportValidity();
      return;
    }
    const comparable = footballMeasurements().filter(item=>sameConditions(item,record));
    const previousBest = comparable.length ? Math.max(...comparable.map(valueOf)) : null;
    const ok = updateFootballProgress(saved=>{
      saved.measurements = [...footballMeasurements(), record];
    });
    if (!ok) {status.textContent='이 브라우저에서는 측정 기록을 저장할 수 없어요.';return;}
    status.textContent = previousBest !== null && valueOf(record)>previousBest ? '개인 최고 기록을 새로 썼어요!' : '측정 기록을 저장했어요.';
    success.value = '';
    status.focus();
  });
  window.addEventListener('football-progress',render);
  window.addEventListener('storage',event=>{if(event.key==='harudodum-football-v1' || event.key===null) render();});
  updateMetric();
  render();
}
