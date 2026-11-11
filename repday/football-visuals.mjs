import {drills} from './football.mjs';

const svgNS = 'http://www.w3.org/2000/svg';
const layouts = {
  'sole-taps': [[140,140],[150,140],[140,140]],
  'inside-touches': [[120,140],[170,140],[120,140]],
  'sole-roll': [[110,145],[155,145],[200,145]],
  slalom: [[95,185],[175,125],[100,60]],
  'inside-cut': [[145,190],[145,115],[225,115]],
  'pace-change': [[145,200],[145,140],[145,55]],
  'wall-pass': [[145,185],[145,55],[145,185]],
  'first-touch': [[145,55],[145,155],[220,155]],
  'gate-pass': [[145,200],[145,130],[145,55]],
  'placed-finish': [[145,180],[145,100],[105,30]],
  'touch-finish': [[110,180],[170,145],[205,30]],
  'receive-finish': [[55,150],[145,150],[190,30]],
  'side-step': [[85,150],[210,150],[85,150]],
  'scan-control': [[125,145],[145,145],[125,145]],
  'walk-dribble': [[90,190],[180,130],[110,60]],
  'keeper-set': [[145,155],[180,155],[145,155]],
  'keeper-catch': [[145,60],[145,115],[145,150]],
  'keeper-build': [[145,55],[195,155],[195,55]]
};
const errors = {
  control: '처음에는 공을 보며 천천히 해요. 익숙해지면 주변도 짧게 확인해요.',
  dribble: '공을 너무 멀리 밀면 제어하기 어려워요. 다음 발이 닿는 거리에 둬요.',
  pass: '몸이 뒤로 젖혀지면 방향이 흔들려요. 디딤발을 공 옆에 두세요.',
  finish: '힘을 내려고 급하게 차기보다 균형과 목표 방향을 먼저 맞춰요.',
  movement: '방향을 바꾸기 전에 속도를 줄이고 무릎을 편하게 유지해요.',
  keeper: '무릎을 잠그거나 손을 몸 뒤로 빼지 말고 공을 몸 앞에서 바라봐요.'
};

function svgElement(tag, attributes = {}) {
  const node = document.createElementNS(svgNS, tag);
  for (const [key,value] of Object.entries(attributes)) node.setAttribute(key, String(value));
  return node;
}

export function initFootballVisuals() {
  const dialog = document.getElementById('football-visual');
  const scene = document.getElementById('visual-scene');
  const caption = document.getElementById('visual-caption');
  const play = document.getElementById('visual-play');
  let drill = drills[0];
  let step = 0;
  let view = 'top';
  let playing = false;
  let interval;
  let movingBall;
  let stepMarkers = [];

  function draw() {
    scene.replaceChildren();
    const svg = svgElement('svg', {viewBox:'0 0 300 235', role:'img', 'aria-label':drill.name + ' ' + ({top:'위에서 본 이동 경로',front:'정면 자세 개념도',side:'측면 자세 개념도'})[view]});
    if (view === 'top') {
      svg.append(svgElement('rect', {x:12,y:12,width:276,height:211,rx:12,fill:'#294d39'}));
      const points = layouts[drill.id];
      svg.append(svgElement('polyline', {points:points.map(point=>point.join(',')).join(' '),fill:'none',stroke:'#d5ed8b','stroke-width':3,'stroke-dasharray':'5 5'}));
      if (['pass','finish','keeper'].includes(drill.category)) {
        svg.append(svgElement('path', {d:'M90 42V22H220V42',fill:'none',stroke:'#f4f6eb','stroke-width':4}));
      }
      if (['dribble','movement'].includes(drill.category)) {
        for (const [x,y] of [[125,165],[145,115],[125,65]]) svg.append(svgElement('path', {d:'M'+x+' '+y+'l-6 12h12z',fill:'#f0ae65'}));
      }
      stepMarkers = points.map(([x,y], index) => {
        const circle = svgElement('circle', {cx:x,cy:y,r:15,fill:'#d5ed8b',opacity:0.35});
        const label = svgElement('text', {x,y:y+4,'text-anchor':'middle',fill:'#203e30','font-size':12});
        label.textContent = index + 1;
        svg.append(circle,label);
        return circle;
      });
      movingBall = svgElement('circle', {cx:points[step][0],cy:points[step][1],r:7,fill:'#ffffff',stroke:'#203e30','stroke-width':2});
      movingBall.classList.add('visual-ball');
      svg.append(movingBall);
    } else {
      movingBall = null;
      stepMarkers = [];
      svg.append(svgElement('rect', {x:12,y:12,width:276,height:211,rx:12,fill:'#e6edd8'}));
      svg.append(svgElement('path', {d:'M35 199H265',stroke:'#9eaf89','stroke-width':2}));
      const front = view === 'front';
      svg.append(svgElement('circle', {cx:150,cy:55,r:17,fill:'#294d39'}));
      const body = front ? 'M150 75V128M150 88L112 118M150 88L188 118M150 128L125 162L110 192M150 128L175 162L190 192'
        : 'M150 75L164 126M155 88L196 108M155 88L180 124M164 126L186 160L168 192M164 126L132 160L122 192';
      svg.append(svgElement('path', {d:body,fill:'none',stroke:'#294d39','stroke-width':9,'stroke-linecap':'round','stroke-linejoin':'round'}));
      svg.append(svgElement('ellipse', {cx:drill.category==='keeper'?150:192,cy:drill.category==='keeper'?118:195,rx:12,ry:10,fill:'#fff',stroke:'#294d39','stroke-width':2}));
      const label = svgElement('text', {x:150,y:218,'text-anchor':'middle','font-size':11,fill:'#294d39'});
      label.textContent = front ? '양발에 균형 · 시선은 앞과 공을 번갈아' : '무릎을 편하게 · 상체는 안정적으로';
      svg.append(label);
    }
    scene.append(svg);
    updateStep();
  }

  function updateStep() {
    caption.textContent = (step + 1) + ' / 3 · ' + drill.steps[step];
    stepMarkers.forEach((marker,index) => marker.setAttribute('opacity', index === step ? '1' : '.35'));
    if (movingBall) {
      movingBall.setAttribute('cx', layouts[drill.id][step][0]);
      movingBall.setAttribute('cy', layouts[drill.id][step][1]);
    }
  }

  function stop() {
    clearInterval(interval);
    playing = false;
    play.textContent = '재생';
    play.setAttribute('aria-pressed','false');
  }

  function start() {
    stop();
    playing = true;
    play.textContent = '일시정지';
    play.setAttribute('aria-pressed','true');
    const slow = document.getElementById('visual-speed').value === 'slow';
    interval = setInterval(() => { step = (step + 1) % 3; updateStep(); }, slow ? 3600 : 1800);
  }

  window.addEventListener('football-visual', event => {
    const selected = drills.find(item => item.id === event.detail);
    if (!selected) return;
    stop();
    drill = selected;
    step = 0;
    view = 'top';
    document.getElementById('visual-view').value = view;
    document.getElementById('visual-title').textContent = drill.name;
    document.getElementById('visual-error').textContent = errors[drill.category];
    draw();
    if (!dialog.open) dialog.showModal();
  });
  dialog.addEventListener('close', stop);
  document.getElementById('visual-view').addEventListener('change', event => { view = event.target.value; draw(); });
  document.getElementById('visual-speed').addEventListener('change', () => { if (playing) start(); });
  play.addEventListener('click', () => { if (playing) stop(); else start(); });
  for (const [id, direction] of [['visual-prev',-1],['visual-next',1]]) {
    document.getElementById(id).addEventListener('click', () => {
      stop();
      step = (step + direction + 3) % 3;
      updateStep();
    });
  }
}
