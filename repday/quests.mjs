import {drills,readProgress,updateFootballProgress} from './football.mjs';
import {footballMeasurements} from './football-growth.mjs';

const counts = [1,2,3,5,8,10,15,20,30,40,50,75,100,150,200,300,400,500,750,1000];
const totals = [1,3,5,10,15,20,30,40,50,75,100,150,200,300,500,750,1000,1500,2000,3000];
const days = [1,2,3,4,5,7,10,14,21,30,45,60,90,120,150,180,240,300,365,500];
const successes = [1,3,5,10,20,30,50,75,100,150,200,300,500,750,1000,1500,2000,3000,4000,5000];
const ranks = ['첫발','새싹','도전자','연습생','기초 다지기','성장 중','꾸준한 발걸음','집중력','탄탄한 실력','한 단계 위로','돌파','눈부신 성장','능숙한 플레이','실력자','달인','마스터','베테랑','챔피언','전설의 시작','명예의 전당'];

export const questTracks = [
  {id:'total',name:'훈련의 발자국',metric:'total',unit:'개',thresholds:totals,color:'#aacb7d',symbol:'⚽',condition:'축구 훈련 누적 완료'},
  {id:'days',name:'꾸준함의 힘',metric:'days',unit:'일',thresholds:days,color:'#e1c57c',symbol:'☀',condition:'축구 훈련을 완료한 날짜'},
  {id:'control',name:'볼 터치 장인',metric:'control',unit:'개',thresholds:counts,color:'#a8d7aa',symbol:'◎',condition:'볼 컨트롤 훈련 누적 완료'},
  {id:'dribble',name:'드리블의 길',metric:'dribble',unit:'개',thresholds:counts,color:'#9fd6c6',symbol:'↝',condition:'드리블 훈련 누적 완료'},
  {id:'pass',name:'패스의 연결',metric:'pass',unit:'개',thresholds:counts,color:'#9dbfe2',symbol:'➜',condition:'패스·첫 터치 훈련 누적 완료'},
  {id:'finish',name:'마무리의 순간',metric:'finish',unit:'개',thresholds:counts,color:'#e7b49c',symbol:'✦',condition:'슈팅·마무리 훈련 누적 완료'},
  {id:'movement',name:'가벼운 발걸음',metric:'movement',unit:'개',thresholds:counts,color:'#c4b7e0',symbol:'ϟ',condition:'풋워크 훈련 누적 완료'},
  {id:'keeper',name:'골문 지킴이',metric:'keeper',unit:'개',thresholds:counts,color:'#9ecfd4',symbol:'◇',condition:'골키퍼 훈련 누적 완료'},
  {id:'sessions',name:'훈련 완주자',metric:'sessions',unit:'회',thresholds:counts,color:'#b2cd98',symbol:'⚑',condition:'진행 모드에서 계획한 모든 훈련 완료'},
  {id:'measurements',name:'성장의 기록',metric:'measurements',unit:'회',thresholds:counts,color:'#d3b7dc',symbol:'▥',condition:'성장 기록 측정 결과 저장'},
  {id:'juggling',name:'리프팅의 리듬',metric:'juggling',unit:'회',thresholds:counts,color:'#dfc48d',symbol:'◈',condition:'리프팅 개인 최고 연속 횟수'},
  {id:'passSuccess',name:'정확한 연결',metric:'passSuccess',unit:'회',thresholds:successes,color:'#a9c2e4',symbol:'↗',condition:'성장 기록에 입력한 패스 성공 누적'},
  {id:'shootSuccess',name:'골을 향한 도전',metric:'shootSuccess',unit:'회',thresholds:successes,color:'#e0acb7',symbol:'★',condition:'성장 기록에 입력한 목표 슈팅 성공 누적'},
  {id:'passAccuracy',name:'패스의 정밀함',metric:'passAccuracy',unit:'%',thresholds:Array.from({length:20},(_,index)=>(index+1)*5),color:'#a3cdb6',symbol:'⊕',condition:'한 번에 10회 이상 시도한 패스의 최고 성공률'},
  {id:'shootAccuracy',name:'슈팅의 정밀함',metric:'shootAccuracy',unit:'%',thresholds:Array.from({length:20},(_,index)=>(index+1)*5),color:'#dfba92',symbol:'◉',condition:'한 번에 10회 이상 시도한 목표 슈팅의 최고 성공률'}
];

export const questCatalog = ranks.flatMap((rank,index) => questTracks.map(track=>({
  id:track.id + '-' + (index+1), track:track.id, metric:track.metric, target:track.thresholds[index], unit:track.unit,
  title:track.name + ' · ' + rank, rank:index+1, color:track.color, symbol:track.symbol,
  condition:track.condition + ' ' + track.thresholds[index] + track.unit
})));

export function questMetrics(progress) {
  const result = Object.fromEntries(questTracks.map(track=>[track.metric,0]));
  const byId = new Map(drills.map(drill=>[drill.id,drill.category]));
  const today = new Date(Date.now()+9*60*60*1000).toISOString().slice(0,10);
  for (const [date,ids] of Object.entries(progress.completed || {})) {
    const timestamp = Date.parse(date+'T00:00:00Z');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0,10)!==date || date>today || !Array.isArray(ids)) continue;
    const valid = [...new Set(ids)].filter(id=>byId.has(id));
    if (valid.length) result.days++;
    result.total += valid.length;
    for (const id of valid) result[byId.get(id)]++;
  }
  const sessions = Array.isArray(progress.sessions) ? progress.sessions : [];
  const seenSessions = new Set();
  for (const session of sessions) {
    if (!session || typeof session.id!=='string' || seenSessions.has(session.id) || !Number.isInteger(session.planned) ||
      session.planned<1 || session.planned>drills.length || !Array.isArray(session.completed) ||
      !Number.isFinite(session.startedAt) || !Number.isFinite(session.endedAt) || session.endedAt<session.startedAt) continue;
    seenSessions.add(session.id);
    if (new Set(session.completed.filter(id=>byId.has(id))).size >= session.planned) result.sessions++;
  }
  const measurements = [...new Map(footballMeasurements(progress).map(record=>[record.id,record])).values()];
  result.measurements = measurements.length;
  for (const record of measurements) {
    if (record.metric==='juggling') {
      result.juggling=Math.max(result.juggling,record.success);
    } else {
      const prefix=record.metric==='pass'?'pass':'shoot';
      result[prefix+'Success'] += record.success;
      if(record.attempts>=10) result[prefix+'Accuracy']=Math.max(result[prefix+'Accuracy'],record.success/record.attempts*100);
    }
  }
  return result;
}

function savedAwards(progress) {
  const input=progress.questAwards;
  if(!input || typeof input!=='object' || Array.isArray(input)) return {};
  return Object.fromEntries(questCatalog.filter(quest=>Number.isFinite(input[quest.id]) && input[quest.id]>0).map(quest=>[quest.id,input[quest.id]]));
}

export function initQuests() {
  const list=document.getElementById('quest-list');
  const track=document.getElementById('quest-track');
  const filter=document.getElementById('quest-filter');
  const search=document.getElementById('quest-search');
  const status=document.getElementById('quest-status');
  const announcement=document.getElementById('quest-alert');
  const pageLabel=document.getElementById('quest-page');
  const previous=document.getElementById('quest-previous');
  const next=document.getElementById('quest-next');
  const pageSize=24;
  let page=0;
  let view='quests';
  let updating=false;

  for(const item of questTracks) {
    const option=document.createElement('option');
    option.value=item.id;
    option.textContent=item.name;
    track.append(option);
  }

  function render() {
    const progress=readProgress();
    const metrics=questMetrics(progress);
    const awards=savedAwards(progress);
    const count=Object.keys(awards).length;
    document.getElementById('quest-cleared').textContent=count;
    document.getElementById('quest-earned').textContent=count;
    document.getElementById('quest-meter').value=count;
    document.getElementById('quest-home-count').textContent=count+' / 300';
    const term=search.value.trim().toLocaleLowerCase('ko-KR');
    const visible=questCatalog.filter(quest=>
      (!track.value || quest.track===track.value) &&
      (filter.value==='all' || (filter.value==='cleared' ? Boolean(awards[quest.id]) : !awards[quest.id])) &&
      (!term || (quest.title+' '+quest.condition).toLocaleLowerCase('ko-KR').includes(term)));
    const pageCount=Math.max(1,Math.ceil(visible.length/pageSize));
    page=Math.min(page,pageCount-1);
    pageLabel.textContent=(page+1)+' / '+pageCount+' · '+visible.length+'개';
    previous.disabled=page===0;
    next.disabled=page>=pageCount-1;
    list.replaceChildren(...visible.slice(page*pageSize,(page+1)*pageSize).map(quest=>{
      const earned=Boolean(awards[quest.id]);
      const card=document.createElement('li');
      card.dataset.questId=quest.id;
      card.className='quest-card '+(earned?'cleared':'locked')+' quest-'+view;
      const badge=document.createElement('div');
      badge.className='quest-emblem shape-'+Math.floor((quest.rank-1)/5);
      badge.style.setProperty('--quest-color',quest.color);
      badge.setAttribute('aria-hidden','true');
      const icon=document.createElement('span');
      icon.textContent=quest.symbol;
      const rank=document.createElement('small');
      rank.textContent=String(quest.rank).padStart(2,'0');
      badge.append(icon,rank);
      const name=document.createElement('h3');
      name.textContent=quest.title;
      const condition=document.createElement('p');
      condition.className='quest-condition';
      condition.textContent=quest.condition;
      const current=earned?quest.target:Math.min(metrics[quest.metric],quest.target);
      const meter=document.createElement('progress');
      meter.max=quest.target;
      meter.value=current;
      meter.setAttribute('aria-label',quest.title+' 진행률');
      const label=document.createElement('p');
      label.className='quest-state';
      label.textContent=earned?'퀘스트 클리어 · 배지 획득':Math.floor(current*10)/10+' / '+quest.target+quest.unit;
      const reward=document.createElement('small');
      reward.textContent=earned?'획득일 '+new Date(awards[quest.id]).toLocaleDateString('ko-KR'):'보상 · '+quest.title+' 배지';
      card.append(badge,name,condition,meter,label,reward);
      return card;
    }));
    document.getElementById('quest-empty').hidden=visible.length>0;
  }

  function reconcile() {
    if(updating) return;
    updating=true;
    try {
      const progress=readProgress();
      const metrics=questMetrics(progress);
      const awards=savedAwards(progress);
      const newlyCleared=questCatalog.filter(quest=>!awards[quest.id] && metrics[quest.metric]>=quest.target);
      if(newlyCleared.length) {
        const at=Date.now();
        const ok=updateFootballProgress(latest=>{
          latest.questAwards={...savedAwards(latest),...Object.fromEntries(newlyCleared.map(quest=>[quest.id,at]))};
        },'quests');
        if(ok) {
          announcement.hidden=false;
          announcement.textContent='퀘스트 '+newlyCleared.length+'개 클리어! 보상 배지를 받았어요.';
          status.textContent='새로 획득한 배지는 보상 배지 모음에서 확인할 수 있어요.';
        } else {
          status.textContent='조건을 달성했지만 배지를 저장하지 못했어요. 브라우저 저장 공간을 확인해 주세요.';
        }
      }
      render();
    } finally {
      updating=false;
    }
  }

  for(const input of [track,filter,search]) input.addEventListener(input===search?'input':'change',()=>{page=0;render();});
  previous.addEventListener('click',()=>{page--;render();});
  next.addEventListener('click',()=>{page++;render();});
  document.querySelectorAll('[data-quest-view]').forEach(button=>button.addEventListener('click',()=>{
    view=button.dataset.questView;
    document.querySelectorAll('[data-quest-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    filter.value=view==='badges'?'cleared':'all';
    page=0;
    render();
  }));
  window.addEventListener('football-progress',reconcile);
  window.addEventListener('storage',event=>{if(event.key==='harudodum-football-v1' || event.key===null) reconcile();});
  reconcile();
}
