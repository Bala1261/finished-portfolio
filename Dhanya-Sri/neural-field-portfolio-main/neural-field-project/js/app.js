(function(){
'use strict';
var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var GH='Priyadharshan-7', LC='Priyadharshan_7';
var LC_FALLBACK={total:180,easy:95,medium:71,hard:14,ranking:null};

/* ================= data fetch loader ================= */
fetch('portfolio-data.json').then(function(res){ return res.json(); }).then(function(data){
  // Optional runtime injections from JSON can go here if needed
}).catch(function(){ console.log('Using default inline configuration fallback.'); });

var PROJECTS=[
  {n:'Gym & Diet Tracker',c:0x35f0d0,d:'A complete fitness companion — calorie logging, workout plans, BMI and body-fat tracking, water reminders and progress charts, in an interface built to be opened daily.',t:['Flutter','Dart','Animated UI','Charts'],r:7.6,s:1.0,y:1.4},
  {n:'AI Malware Detection',c:0x6d5cff,d:'LLM and machine-learning techniques applied to malware classification, evaluated on precision and recall rather than one flattering accuracy number.',t:['Python','LLM','LoRA','Security'],r:9.2,s:0.78,y:-1.9},
  {n:'IPL Winner Prediction',c:0xffb86b,d:'Trained on historical IPL match data to call the winner before the toss settles, served through Streamlit so anyone can test a matchup.',t:['Python','scikit-learn','Streamlit','EDA'],r:6.4,s:1.25,y:-0.6},
  {n:'Study Material System',c:0xff6b9d,d:'MySQL system for students, faculty, subjects, marks and course material — built on joins, subqueries, views and triggers, with a Java Swing and JDBC front end.',t:['MySQL','Java Swing','JDBC','Triggers'],r:10.4,s:0.62,y:2.3},
  {n:'Water Billing System',c:0x5cc8ff,d:'Login, consumption records and billing in one Java application, packaged with Maven so it builds clean from any checkout.',t:['Java','Maven','OOP','Billing'],r:8.4,s:0.92,y:0.4},
  {n:'Certificate Verification',c:0xc9a7ff,d:'Certificates anchored on-chain, so a recruiter can confirm one in seconds and a forged copy has nowhere to hide.',t:['Blockchain','Hashing','Verification'],r:11.4,s:0.54,y:-2.6}
];
var STACKS=[
  {h:'Languages',c:'#35f0d0',i:[['Python','ML, data, scripting',92],['Java','OOP, Swing, JDBC',90],['SQL','MySQL, complex queries',88],['Dart','Flutter apps',85],['JavaScript','web front ends',75]]},
  {h:'AI & machine learning',c:'#6d5cff',i:[['Regression & classification','linear, logistic',90],['KNN · Naive Bayes · Random Forest','supervised',86],['DBSCAN & EDA','unsupervised, exploration',80],['Model evaluation','metrics, tuning',84],['LLMs & LoRA','fine-tuning',72]]},
  {h:'Building & shipping',c:'#ffb86b',i:[['Flutter','cross-platform apps',88],['Streamlit','ML front ends',84],['Git & GitHub','version control',86],['Linux','shell, tooling',78],['React','web front ends',72]]},
  {h:'Data & security',c:'#ff6b9d',i:[['MySQL & schema design','normalisation',90],['Joins, views, triggers','advanced SQL',87],['Cryptography','network security',74],['Computer networks','protocols',76],['Blockchain','verification systems',70]]}
];
var SUBJECTS=['Data mining','Machine learning','DBMS','Computer networks','Cryptography & network security',
  'Web development','Mobile application development','Object-oriented programming','Algorithms','Software engineering','Blockchain'];

/* ================= render DOM ================= */
var stacksEl=document.getElementById('stacks');
if(stacksEl){
  STACKS.forEach(function(s){
    var d=document.createElement('div'); d.className='pane stack rise';
    var h='<h3><i style="background:'+s.c+'"></i>'+s.h+'</h3>';
    s.i.forEach(function(k){
      h+='<div class="line"><div class="t"><span>'+k[0]+'</span><em>'+k[1]+'</em></div>'+
         '<div class="track"><i data-w="'+k[2]+'" style="background:linear-gradient(90deg,'+s.c+',rgba(236,234,245,.35))"></i></div></div>';
    });
    d.innerHTML=h; stacksEl.appendChild(d);
  });
}
var worksEl=document.getElementById('works');
if(worksEl){
  PROJECTS.forEach(function(p,i){
    var a=document.createElement('article'); a.className='work rise'; a.dataset.i=i;
    var hex='#'+p.c.toString(16).padStart(6,'0');
    a.innerHTML='<span class="orb" style="background:'+hex+';box-shadow:0 0 24px '+hex+'"></span>'+
      '<span class="no">0'+(i+1)+'</span><h3>'+p.n+'</h3><p>'+p.d+'</p><div class="chips">'+
      p.t.map(function(t){return '<span class="chip">'+t+'</span>'}).join('')+'</div>';
    worksEl.appendChild(a);
  });
}
var tagsEl=document.getElementById('tags');
if(tagsEl){
  SUBJECTS.forEach(function(s){ var e=document.createElement('span'); e.textContent=s; tagsEl.appendChild(e); });
}
var rail=document.getElementById('rail');
if(rail){
  ['home','portfolio','contact','hireme','resume'].forEach(function(id){
    var b=document.createElement('b'); b.dataset.id=id; b.title=id;
    b.addEventListener('click',function(){ document.getElementById(id).scrollIntoView(); });
    rail.appendChild(b);
  });
}

/* ================= boot ================= */
var pct=0, bootDone=false;
var numEl=document.getElementById('bootnum'), trkEl=document.getElementById('boottrack'), msgEl=document.getElementById('bootmsg');
var msgs=['Building the field','Placing the nodes','Lighting the core','Ready'];
var bootTimer=setInterval(function(){
  pct=Math.min(100, pct + (pct<70?6:3) + Math.random()*5);
  if(numEl) numEl.textContent=Math.round(pct); 
  if(trkEl) trkEl.style.width=pct+'%';
  if(msgEl) msgEl.textContent=msgs[Math.min(3,Math.floor(pct/26))];
  if(pct>=100){ clearInterval(bootTimer); finishBoot(); }
}, RM?20:70);
function finishBoot(){
  if(bootDone) return; bootDone=true;
  setTimeout(function(){
    var boot=document.getElementById('boot');
    if(boot) boot.classList.add('gone');
    document.body.classList.remove('hold');
    document.body.classList.add('live');
  }, 260);
}

/* ================= three.js field ================= */
var scene,cam,ren,core,coreWire,halo3,dust,nodes=[],baseGeo=null,clock=null,ok=true;
var mouse={x:0,y:0}, target={x:0,y:0}, scrollP=0, hovered=-1, cardHover=false;
var LOWSPEC=window.innerWidth<760 || (navigator.hardwareConcurrency||4)<=4;
var raycaster=null, ndc=null;

function labelTex(text,hex){
  var c=document.createElement('canvas'); c.width=512; c.height=96;
  var g=c.getContext('2d');
  g.clearRect(0,0,512,96);
  g.font='600 40px "Space Grotesk", sans-serif'; g.fillStyle=hex; g.textAlign='center'; g.textBaseline='middle';
  g.fillText(text,256,52);
  var t=new THREE.CanvasTexture(c); t.needsUpdate=true; return t;
}
function dotTex(){
  var c=document.createElement('canvas'); c.width=c.height=64; var g=c.getContext('2d');
  var gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(.35,'rgba(200,190,255,.6)'); gr.addColorStop(1,'rgba(255,255,255,0)');
  g.fillStyle=gr; g.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(c);
}

function initGL(){
  if(!window.THREE) throw new Error('three missing');
  var cv=document.getElementById('gl');
  if(!cv) return;
  ren=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:'high-performance'});
  ren.setPixelRatio(Math.min(window.devicePixelRatio, LOWSPEC?1.5:2));
  ren.setSize(window.innerWidth,window.innerHeight);
  scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x06060b,0.028);
  cam=new THREE.PerspectiveCamera(56,window.innerWidth/window.innerHeight,0.1,260);
  cam.position.set(0,0,20);
  clock=new THREE.Clock();
  raycaster=new THREE.Raycaster(); ndc=new THREE.Vector2(-5,-5);

  var g=new THREE.IcosahedronGeometry(4.2,4);
  baseGeo=g.attributes.position.array.slice(0);
  core=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:0x6d5cff,wireframe:true,transparent:true,opacity:.5}));
  scene.add(core);

  var g2=new THREE.IcosahedronGeometry(3.1,1);
  coreWire=new THREE.Mesh(g2,new THREE.MeshBasicMaterial({color:0x35f0d0,transparent:true,opacity:.09}));
  scene.add(coreWire);

  var spr=new THREE.Sprite(new THREE.SpriteMaterial({map:dotTex(),color:0x8a7bff,transparent:true,
    opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));
  spr.scale.set(17,17,1); halo3=spr; scene.add(spr);

  var N=RM?400:(LOWSPEC?1100:2200), pos=new Float32Array(N*3), col=new Float32Array(N*3);
  var pal=[new THREE.Color(0x6d5cff),new THREE.Color(0x35f0d0),new THREE.Color(0xffb86b),new THREE.Color(0xeceaf5)];
  for(var i=0;i<N;i++){
    var r=12+Math.pow(Math.random(),.6)*44, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1);
    pos[i*3]=r*Math.sin(ph)*Math.cos(th);
    pos[i*3+1]=r*Math.cos(ph)*.55;
    pos[i*3+2]=r*Math.sin(ph)*Math.sin(th);
    var c=pal[Math.random()<.6?3:(Math.random()*3|0)];
    col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
  }
  var dg=new THREE.BufferGeometry();
  dg.setAttribute('position',new THREE.BufferAttribute(pos,3));
  dg.setAttribute('color',new THREE.BufferAttribute(col,3));
  dust=new THREE.Points(dg,new THREE.PointsMaterial({size:.16,vertexColors:true,transparent:true,
    opacity:.85,sizeAttenuation:true,blending:THREE.AdditiveBlending,depthWrite:false}));
  scene.add(dust);

  PROJECTS.forEach(function(p,i){
    var grp=new THREE.Group();
    var hex='#'+p.c.toString(16).padStart(6,'0');
    var m=new THREE.Mesh(new THREE.OctahedronGeometry(.62,0),
      new THREE.MeshBasicMaterial({color:p.c,wireframe:false,transparent:true,opacity:.92}));
    var edge=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.OctahedronGeometry(.95,0)),
      new THREE.LineBasicMaterial({color:p.c,transparent:true,opacity:.5}));
    var glow=new THREE.Sprite(new THREE.SpriteMaterial({map:dotTex(),color:p.c,transparent:true,
      opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));
    glow.scale.set(4,4,1);
    var lab=new THREE.Sprite(new THREE.SpriteMaterial({map:labelTex(p.n,hex),transparent:true,opacity:0,depthWrite:false}));
    lab.scale.set(6.2,1.16,1); lab.position.y=1.5;
    grp.add(m); grp.add(edge); grp.add(glow); grp.add(lab);
    var ring=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(
      (function(){var pts=[];for(var a=0;a<=90;a++){var t=a/90*Math.PI*2;pts.push(new THREE.Vector3(Math.cos(t)*p.r,0,Math.sin(t)*p.r));}return pts;})()),
      new THREE.LineBasicMaterial({color:p.c,transparent:true,opacity:.09}));
    ring.position.y=p.y; ring.rotation.x=(i%2?1:-1)*0.18;
    scene.add(ring);
    scene.add(grp);
    nodes.push({grp:grp,mesh:m,glow:glow,lab:lab,ring:ring,p:p,a:i*1.05,base:1});
  });

  window.addEventListener('resize',onResize);
  animate();
}
function onResize(){
  if(!ren) return;
  cam.aspect=window.innerWidth/window.innerHeight; cam.updateProjectionMatrix();
  ren.setSize(window.innerWidth,window.innerHeight);
}
function animate(){
  requestAnimationFrame(animate);
  if(document.hidden) return;
  var t=clock.getElapsedTime();

  var arr=core.geometry.attributes.position.array;
  for(var i=0;i<arr.length;i+=3){
    var bx=baseGeo[i],by=baseGeo[i+1],bz=baseGeo[i+2];
    var d=1+0.085*Math.sin(t*1.25+bx*.85+by*.55)+0.055*Math.cos(t*.9+bz*1.1);
    arr[i]=bx*d; arr[i+1]=by*d; arr[i+2]=bz*d;
  }
  core.geometry.attributes.position.needsUpdate=true;
  core.rotation.y=t*.13+scrollP*2.2; core.rotation.x=Math.sin(t*.22)*.2;
  coreWire.rotation.y=-t*.2; coreWire.rotation.z=t*.1;
  var pulse=1+Math.sin(t*1.7)*.05;
  halo3.scale.set(17*pulse,17*pulse,1);
  dust.rotation.y=t*.018; dust.rotation.x=Math.sin(t*.06)*.05;

  nodes.forEach(function(n,i){
    var ang=n.a+t*(0.14+i*0.017);
    n.grp.position.set(Math.cos(ang)*n.p.r*n.p.s, n.p.y+Math.sin(t*.5+i)*.5, Math.sin(ang)*n.p.r*n.p.s);
    n.mesh.rotation.x+=0.008; n.mesh.rotation.y+=0.012;
    var want=(hovered===i)?2.05:1;
    n.grp.scale.x+=(want-n.grp.scale.x)*.12;
    n.grp.scale.y=n.grp.scale.z=n.grp.scale.x;
    n.lab.material.opacity+=(((hovered===i)?1:0)-n.lab.material.opacity)*.12;
    n.ring.material.opacity+=(((hovered===i)?.45:.09)-n.ring.material.opacity)*.1;
  });

  target.x+=(mouse.x-target.x)*.05; target.y+=(mouse.y-target.y)*.05;
  var camZ=20-scrollP*7, camY=scrollP*5.5;
  cam.position.x+=(target.x*4.5-cam.position.x)*.06;
  cam.position.y+=((camY+target.y*2.4)-cam.position.y)*.06;
  cam.position.z+=(camZ-cam.position.z)*.06;
  cam.lookAt(0,scrollP*2.4,0);

  if(!cardHover && ndc.x>-2){
    raycaster.setFromCamera(ndc,cam);
    var hits=raycaster.intersectObjects(nodes.map(function(n){return n.mesh}),false);
    var newHover=-1;
    if(hits.length){ for(var k=0;k<nodes.length;k++){ if(nodes[k].mesh===hits[0].object) newHover=k; } }
    if(newHover!==hovered){ hovered=newHover; syncCards(); }
  }
  ren.render(scene,cam);
}
function syncCards(){
  var cards=document.querySelectorAll('.work');
  cards.forEach(function(c,i){ c.style.borderColor = (i===hovered)?'rgba(53,240,208,.6)':''; });
  var tip=document.getElementById('tip');
  if(tip && hovered>=0){ tip.textContent=PROJECTS[hovered].n+' — click to read'; tip.classList.add('show'); }
  else if(tip) tip.classList.remove('show');
}
try{ initGL(); }catch(e){ ok=false; document.body.classList.add('nogl'); }

/* mobile nav */
var burger=document.getElementById('burger'), drawer=document.getElementById('drawer');
if(burger && drawer){
  burger.addEventListener('click',function(){
    var open=burger.classList.toggle('open');
    drawer.classList.toggle('open',open);
    drawer.setAttribute('aria-hidden', open?'false':'true');
    burger.setAttribute('aria-expanded', open?'true':'false');
    document.body.classList.toggle('hold', open);
  });
  drawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){ burger.classList.remove('open'); drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden','true'); document.body.classList.remove('hold'); });
  });
}

/* pointer */
var halo=document.getElementById('halo'), tipEl=document.getElementById('tip');
var hx=0,hy=0,tx2=0,ty2=0;
window.addEventListener('pointermove',function(e){
  tx2=e.clientX; ty2=e.clientY;
  if(halo) halo.style.opacity=1;
  mouse.x=(e.clientX/window.innerWidth)*2-1;
  mouse.y=-((e.clientY/window.innerHeight)*2-1);
  if(ndc){ ndc.x=mouse.x; ndc.y=mouse.y; }
  if(tipEl){ tipEl.style.left=e.clientX+'px'; tipEl.style.top=e.clientY+'px'; }
});
(function ease(){ hx+=(tx2-hx)*.18; hy+=(ty2-hy)*.18;
  if(halo){ halo.style.left=hx+'px'; halo.style.top=hy+'px'; } requestAnimationFrame(ease); })();
document.querySelectorAll('a,button,.work,.tags span').forEach(function(el){
  el.addEventListener('mouseenter',function(){if(halo)halo.classList.add('grow')});
  el.addEventListener('mouseleave',function(){if(halo)halo.classList.remove('grow')});
});

/* scroll */
var maxS=1;
function onScroll(){
  maxS=document.documentElement.scrollHeight-window.innerHeight;
  scrollP=Math.max(0,Math.min(1,window.scrollY/(maxS||1)));
}
window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

/* reveals + bars + counters */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting) return;
    e.target.classList.add('on');
    var bars=e.target.querySelectorAll('.track i');
    for(var i=0;i<bars.length;i++)(function(b,k){
      setTimeout(function(){ b.style.width=b.getAttribute('data-w')+'%'; },80*k);
    })(bars[i],i);
    io.unobserve(e.target);
  });
},{threshold:.15});
document.querySelectorAll('.rise').forEach(function(el){io.observe(el)});

function animNum(el,to){
  var t0=null; requestAnimationFrame(function s(t){ if(!t0)t0=t;
    var p=Math.min((t-t0)/1200,1); el.textContent=Math.round(to*(1-Math.pow(1-p,3)));
    if(p<1)requestAnimationFrame(s); });
}
var cio=new IntersectionObserver(function(es){
  es.forEach(function(e){ if(!e.isIntersecting)return; animNum(e.target,+e.target.getAttribute('data-n')); cio.unobserve(e.target); });
},{threshold:.5});
document.querySelectorAll('.tick').forEach(function(el){cio.observe(el)});

/* nav highlight */
var dots=[].slice.call(document.querySelectorAll('.rail b'));
var links=[].slice.call(document.querySelectorAll('.menu a'));
var sio=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting) return;
    dots.forEach(function(d){ d.classList.toggle('live', d.dataset.id===e.target.id); });
    links.forEach(function(a){ a.classList.toggle('live', a.getAttribute('href')==='#'+e.target.id); });
  });
},{threshold:.35});
document.querySelectorAll('section[id]').forEach(function(s){sio.observe(s)});

/* ================= GitHub ================= */
var LANGC={Java:'#ff6b9d',Python:'#35f0d0',Dart:'#6d5cff',JavaScript:'#ffb86b',HTML:'#ff9060',CSS:'#5cc8ff',
  'Jupyter Notebook':'#ffd27a',C:'#8b87a8','C++':'#c9a7ff',TypeScript:'#5cc8ff',Kotlin:'#b48bff',Other:'#4a4660'};
fetch('https://api.github.com/users/'+GH).then(function(r){ if(!r.ok)throw 0; return r.json(); })
.then(function(u){
  var reposEl = document.getElementById('gh-repos'); if(reposEl) animNum(reposEl,u.public_repos||0);
  var follEl = document.getElementById('gh-foll'); if(follEl) animNum(follEl,u.followers||0);
  var noteEl = document.getElementById('gh-note'); if(noteEl) noteEl.textContent='Live from the GitHub API — member since '+new Date(u.created_at).getFullYear()+'.';
}).catch(function(){
  var n=document.getElementById('gh-note'); if(n){ n.textContent='GitHub is rate-limiting this connection. Refresh in a minute.'; n.classList.add('bad'); }
});

fetch('https://api.github.com/users/'+GH+'/repos?per_page=100&sort=updated').then(function(r){ if(!r.ok)throw 0; return r.json(); })
.then(function(rs){
  if(!Array.isArray(rs)) throw 0;
  var starsEl = document.getElementById('gh-stars');
  if(starsEl) animNum(starsEl, rs.reduce(function(a,b){return a+(b.stargazers_count||0)},0));
  var box=document.getElementById('repos'); 
  if(box){
    box.innerHTML='';
    rs.slice(0,7).forEach(function(rp){
      var a=document.createElement('a'); a.className='repo'; a.href=rp.html_url; a.target='_blank'; a.rel='noopener';
      a.innerHTML='<span>'+rp.name+'</span><small>'+(rp.language||'Mixed')+' · '+
        new Date(rp.updated_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short'})+'</small>';
      box.appendChild(a);
    });
    if(!rs.length) box.innerHTML='<p class="note">No public repositories yet.</p>';
  }
  var cnt={}; rs.forEach(function(rp){ var l=rp.language||'Other'; cnt[l]=(cnt[l]||0)+1; });
  var tot=Object.keys(cnt).reduce(function(a,k){return a+cnt[k]},0)||1;
  var bar=document.getElementById('lbar'), key=document.getElementById('lkey'); 
  if(bar && key){
    bar.innerHTML=''; key.innerHTML='';
    Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]}).slice(0,6).forEach(function(l,i){
      var col=LANGC[l]||'#4a4660';
      var seg=document.createElement('i'); seg.style.background=col; bar.appendChild(seg);
      setTimeout(function(){seg.style.width=(cnt[l]/tot*100)+'%'},140*i+260);
      var k=document.createElement('span'); k.innerHTML='<b style="background:'+col+'"></b>'+l+' ('+cnt[l]+')'; key.appendChild(k);
    });
  }
}).catch(function(){
  var reposBox = document.getElementById('repos');
  if(reposBox) reposBox.innerHTML='<p class="note bad">Could not reach GitHub — try a refresh.</p>';
});

function heat(map){
  var wrap=document.getElementById('heat'); if(!wrap) return; wrap.innerHTML='';
  var today=new Date();
  var shades=['rgba(236,234,245,.07)','rgba(109,92,255,.35)','rgba(109,92,255,.65)','rgba(53,240,208,.7)','#35f0d0'];
  for(var i=90;i>=0;i--){
    var d=new Date(today); d.setDate(d.getDate()-i);
    var k=d.toISOString().slice(0,10), v=map[k]||0;
    var lv=v===0?0:v<2?1:v<4?2:v<7?3:4;
    var c=document.createElement('div'); c.className='px'; c.title=k+' — '+v+' event'+(v===1?'':'s');
    wrap.appendChild(c);
    (function(el,l){ setTimeout(function(){ el.style.background=shades[l]; }, Math.random()*800); })(c,lv);
  }
}
fetch('https://api.github.com/users/'+GH+'/events/public?per_page=100').then(function(r){ if(!r.ok)throw 0; return r.json(); })
.then(function(ev){ var m={}; (ev||[]).forEach(function(e){ var k=(e.created_at||'').slice(0,10); if(k)m[k]=(m[k]||0)+1; }); heat(m); })
.catch(function(){ heat({}); });

/* ================= LeetCode ================= */
function arc(id,v,max){ var el=document.getElementById(id);
  if(el) setTimeout(function(){ el.style.strokeDashoffset=289-289*Math.max(0,Math.min(1,max?v/max:0)); },300); }
function paintLC(d,note,bad){
  var totEl = document.getElementById('lc-total'); if(totEl) animNum(totEl,d.total||0);
  var rk=document.getElementById('lc-rank');
  if(rk){
    if(d.ranking){ animNum(rk,d.ranking); rk.classList.toggle('long', String(d.ranking).length>=6); }
    else rk.textContent='—';
  }
  var eEl = document.getElementById('lc-e'); if(eEl) animNum(eEl,d.easy||0);
  var mEl = document.getElementById('lc-m'); if(mEl) animNum(mEl,d.medium||0);
  var hEl = document.getElementById('lc-h'); if(hEl) animNum(hEl,d.hard||0);
  arc('a-e',d.easy,d.totalEasy||900); arc('a-m',d.medium,d.totalMedium||1900); arc('a-h',d.hard,d.totalHard||850);
  var n=document.getElementById('lc-note'); if(n){ n.textContent=note; if(bad)n.classList.add('bad'); }
}
var lcDone=false;
function shape(j){ return {total:j.totalSolved,easy:j.easySolved,medium:j.mediumSolved,hard:j.hardSolved,
  ranking:j.ranking,totalEasy:j.totalEasy,totalMedium:j.totalMedium,totalHard:j.totalHard}; }
function tryLC(url){
  return fetch(url).then(function(r){ if(!r.ok)throw 0; return r.json(); })
    .then(function(j){ var d=shape(j); if(!d.total)throw 0; if(!lcDone){lcDone=true;paintLC(d,'Live from LeetCode.',false);} });
}
tryLC('https://alfa-leetcode-api.onrender.com/userProfile/'+LC)
.catch(function(){ return tryLC('https://leetcode-stats-api.herokuapp.com/'+LC); })
.catch(function(){ if(!lcDone) paintLC(LC_FALLBACK,'LeetCode API unreachable — showing last recorded totals.',true); });

/* copy email */
var toast=document.getElementById('toast');
var copyBtn=document.getElementById('copy');
if(copyBtn){
  copyBtn.addEventListener('click',function(){
    var mail='priyadharshanravichandran2@gmail.com';
    function done(){ if(toast) toast.classList.add('up'); setTimeout(function(){if(toast)toast.classList.remove('up')},2000); }
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(mail).then(done).catch(fb);
    } else fb();
    function fb(){ var t=document.createElement('textarea'); t.value=mail; document.body.appendChild(t); t.select();
      try{document.execCommand('copy');done();}catch(e){if(toast)toast.textContent=mail;done();} document.body.removeChild(t); }
  });
}
})();