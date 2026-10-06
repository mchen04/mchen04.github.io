/* site.js loads from <head>, before the body exists, so the js class and a saved theme are in place
   before first paint: the phone header renders collapsed and dark mode does not flash. Everything that
   touches the page waits for DOMContentLoaded. If this file never loads, there is no js class, so the
   navigation stays fully visible and the Menu button stays hidden. */
document.documentElement.classList.add('js');
(function(){
  var saved=null; try{saved=localStorage.getItem('mc-theme')}catch(e){}
  if(saved) document.documentElement.setAttribute('data-theme',saved);
})();

function onReady(fn){
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn);
  else fn();
}

onReady(function(){

/* ---- phone menu: a disclosure button over an ordinary list of links -----
   W3C APG disclosure navigation: a real button with aria-expanded and
   aria-controls, links stay links (no role=menu), Tab moves normally and
   nothing traps focus. Escape closes and returns focus to the button;
   following a link, clicking outside, tabbing out of the header or widening
   past the phone layout closes it too. Wider screens show the nav inline. */
(function(){
  var head=document.querySelector('.masthead'), btn=document.getElementById('menu-toggle'),
      nav=document.getElementById('site-nav');
  if(!head||!btn||!nav) return;
  var phone=matchMedia('(max-width:860px)');
  function isOpen(){ return btn.getAttribute('aria-expanded')==='true'; }
  function set(open,returnFocus){
    btn.setAttribute('aria-expanded',String(open));
    head.classList.toggle('nav-open',open);
    if(!open&&returnFocus) btn.focus();
  }
  btn.addEventListener('click',function(){ set(!isOpen()); });
  head.addEventListener('keydown',function(e){
    if((e.key==='Escape'||e.key==='Esc')&&isOpen()){ e.preventDefault(); set(false,true); }
  });
  nav.addEventListener('click',function(e){ if(e.target.closest('a')) set(false); });
  head.addEventListener('focusout',function(e){
    if(isOpen()&&e.relatedTarget&&!head.contains(e.relatedTarget)) set(false);
  });
  document.addEventListener('click',function(e){ if(isOpen()&&!head.contains(e.target)) set(false); });
  phone.addEventListener('change',function(){ set(false); });
  /* the back/forward cache can restore a page with the menu still open */
  addEventListener('pageshow',function(){ set(false); });
})();

/* The sticky masthead changes height with viewport and font load. Anchor
   offsets are derived from its measured height so a nav tap can never park a
   heading underneath it. */
(function(){
  var head=document.querySelector('.masthead');
  function sync(){ document.documentElement.style.setProperty('--head', head.offsetHeight+'px'); }
  sync();
  if(window.ResizeObserver) new ResizeObserver(sync).observe(head);
  else addEventListener('resize',sync,{passive:true});
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(sync);
})();

/* ---- theme: system by default, explicit choice remembered ------------- */
(function(){
  var root=document.documentElement, btn=document.getElementById('themer');
  function isDark(){
    var t=root.getAttribute('data-theme');
    if(t) return t==='scope';
    return matchMedia('(prefers-color-scheme:dark)').matches;
  }
  var lbl=document.getElementById('themer-label');
  function sync(){
    var d=isDark();
    btn.setAttribute('aria-pressed',String(d));
    lbl.textContent=d?'theme: dark':'theme: light';
    btn.setAttribute('aria-label',d?'theme: dark. Switch to light.':'theme: light. Switch to dark.');
  }
  sync();
  /* keep the label honest if the OS scheme changes while the page is open */
  matchMedia('(prefers-color-scheme:dark)').addEventListener('change',sync);
  btn.addEventListener('click',function(){
    var next=isDark()?'bench':'scope';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('mc-theme',next)}catch(e){}
    sync();
  });
})();

/* ---- activity wire on Projects & Fun: chart recorder over the events API */
/* The pen draws whatever the API returns right now. If the fetch fails or is
   rate-limited, it draws the cached reading below and says so on the label,
   because an instrument with no signal should still show its last plot. */
(function(){
  var svg=document.getElementById('wire-svg'), meta=document.getElementById('wire-meta');
  if(!svg) return;
  var rows=document.getElementById('wire-rows');
  var CACHED={pairs:Array.from(rows.rows,function(row){
    return [row.cells[0].textContent.replace(' ','T').slice(0,13),
      Number(row.cells[1].textContent),row.cells[2].textContent];
  })};
  var NS='http://www.w3.org/2000/svg';
  var state=null, calm=matchMedia('(prefers-reduced-motion:reduce)');

  function el(n,at){var e=document.createElementNS(NS,n);for(var k in at)e.setAttribute(k,at[k]);return e;}
  function hour(k){return Date.UTC(+k.slice(0,4),+k.slice(5,7)-1,+k.slice(8,10),+k.slice(11,13));}

  function showSample(next){
    state=next;
    rows.replaceChildren();
    state.pairs.forEach(function(pair){
      var row=document.createElement('tr');
      [pair[0].replace('T',' ')+':00',pair[1],pair[2]||'Not supplied'].forEach(function(value,i){
        var cell=document.createElement(i===0?'th':'td');
        if(i===0) cell.scope='row';
        cell.textContent=value;
        row.appendChild(cell);
      });
      rows.appendChild(row);
    });
    var pairs=state.pairs;
    var label=state.live?'Live API sample':'Cached sample from August 14, 2026';
    if(pairs.length){
      var total=pairs.reduce(function(sum,pair){return sum+pair[1];},0);
      meta.textContent=label+' · '+total+' events · '+pairs[0][0].replace('T',' ')+':00 to '
        +pairs[pairs.length-1][0].replace('T',' ')+':00 UTC';
    } else meta.textContent=label+' · No public events returned.';
    svg.toggleAttribute('hidden',!pairs.length);
    draw(true);
  }

  function draw(animate){
    if(!state||!state.pairs.length){svg.replaceChildren();return;}
    var W=svg.clientWidth||600, H=132, y0=H-26, top=16;
    svg.setAttribute('viewBox','0 0 '+W+' '+H);
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    var pairs=state.pairs, t0=hour(pairs[0][0]), t1=hour(pairs[pairs.length-1][0]);
    var HR=36e5, n=Math.round((t1-t0)/HR)+1, counts={}, max=1, i;
    for(i=0;i<pairs.length;i++){var bi=Math.round((hour(pairs[i][0])-t0)/HR);
      counts[bi]={c:pairs[i][1],repo:pairs[i][2]||''};
      if(pairs[i][1]>max)max=pairs[i][1];}
    var pad=8, x0=pad, x1=W-pad, step=(x1-x0)/Math.max(n-1,1);
    svg.appendChild(el('line',{'class':'base',x1:x0,y1:y0,x2:x1,y2:y0}));
    /* day boundaries */
    var d0=new Date(t0); d0=Date.UTC(d0.getUTCFullYear(),d0.getUTCMonth(),d0.getUTCDate())+864e5;
    var MO=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    var lastLabelX=-Infinity;
    for(var t=d0;t<=t1;t+=864e5){
      var x=x0+((t-t0)/HR)*step, d=new Date(t);
      svg.appendChild(el('line',{'class':'daytick',x1:x,y1:top,x2:x,y2:y0}));
      if(x-lastLabelX>=65&&x<W-45){
        var lb=el('text',{x:x+5,y:H-8}); lb.textContent=MO[d.getUTCMonth()]+' '+d.getUTCDate();
        svg.appendChild(lb);lastLabelX=x;
      }
    }
    /* the pen line: baseline with one sharp strike per active hour */
    var d='M'+x0+' '+y0, span=(y0-top);
    for(i=0;i<n;i++){var c=counts[i];if(!c)continue;
      var x=x0+i*step, h=Math.max(6,(c.c/max)*span), w=Math.min(step*.45,4);
      d+=' L'+(x-w).toFixed(1)+' '+y0+' L'+x.toFixed(1)+' '+(y0-h).toFixed(1)+' L'+(x+w).toFixed(1)+' '+y0;}
    d+=' L'+x1+' '+y0;
    var pen=el('path',{'class':'pen',d:d});
    svg.appendChild(pen);
    svg.appendChild(el('circle',{'class':'nib',cx:x1,cy:y0,r:2.5}));

    /* scrub: run a hairline over the strip and it reads out the hour under it */
    var scrub=el('g',{'class':'scrub',opacity:'0'});
    var needle=el('g',{'class':'needle'});
    var hairline=el('line',{'class':'scrubline',x1:0,y1:top-4,x2:0,y2:y0});
    var dot=el('circle',{'class':'scrubdot',r:2.5,cx:0,cy:y0});
    needle.appendChild(hairline);needle.appendChild(dot);
    var ro=el('text',{'class':'scrubtext',x:0,y:top-6});
    scrub.appendChild(needle);scrub.appendChild(ro);
    svg.appendChild(scrub);
    var MO2=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    /* the needle only rests on readings: it snaps to the nearest strike, and
       parks on the busiest hour when the pointer is elsewhere */
    var active=[], peak=-1;
    for(i=0;i<n;i++) if(counts[i]){active.push(i);
      if(peak<0||counts[i].c>counts[peak].c) peak=i;}
    function showScrub(i){
      var x=x0+i*step, c=counts[i], dt=new Date(t0+i*HR);
      needle.style.transform='translateX('+x.toFixed(1)+'px)';
      var h=c?Math.max(6,(c.c/max)*span):0;
      dot.setAttribute('cy',y0-h);
      var when=MO2[dt.getUTCMonth()]+' '+dt.getUTCDate()+' · '
        +('0'+dt.getUTCHours()).slice(-2)+':00 utc · ';
      var what=c?c.c+(c.c>1?' events':' event'):'quiet';
      ro.textContent=when+what+(c&&c.repo?' · '+c.repo:'');
      /* clamp the readout onto the paper: shed the repo name if the strip is
         too narrow for it, then pin the label inside the edges */
      if(ro.getComputedTextLength()>W-8) ro.textContent=when+what;
      var anchor=x>(x0+x1)/2?'end':'start';
      ro.setAttribute('text-anchor',anchor);
      ro.setAttribute('x',anchor==='end'?x-6:x+6);
      var tl=ro.getComputedTextLength();
      if(anchor==='start'&&x+6+tl>W-2){ro.setAttribute('x',Math.max(2,W-2-tl));}
      else if(anchor==='end'&&x-6-tl<2){ro.setAttribute('text-anchor','start');ro.setAttribute('x',2);}
      scrub.setAttribute('opacity','1');
    }
    function nearestStrike(cx){
      var want=(cx-x0)/step, best=active[0];
      for(var a=0;a<active.length;a++)
        if(Math.abs(active[a]-want)<Math.abs(best-want)) best=active[a];
      return best;
    }
    var park=null;
    function parkLater(){clearTimeout(park);park=setTimeout(function(){showScrub(peak);},4000);}
    svg.onpointermove=function(e){var r=svg.getBoundingClientRect();
      showScrub(nearestStrike(e.clientX-r.left));parkLater();};
    svg.onpointerleave=function(){clearTimeout(park);showScrub(peak);};
    svg.onpointercancel=parkLater;
    if(animate&&!calm.matches&&active.length>1){
      /* after the pen finishes, one pass of the needle across the strikes,
         then park on the peak: announces that the strip is scrubbable
         without a word of copy */
      setTimeout(function(){
        var ai=0, run=setInterval(function(){
          if(ai>=active.length){clearInterval(run);showScrub(peak);return;}
          showScrub(active[ai++]);
        },130);
      },1900);
    } else showScrub(peak);
    if(animate&&!calm.matches){
      var L=pen.getTotalLength();
      pen.style.strokeDasharray=L; pen.style.strokeDashoffset=L;
      pen.getBoundingClientRect();
      pen.style.transition='stroke-dashoffset 1.8s cubic-bezier(.22,.61,.36,1)';
      pen.style.strokeDashoffset='0';
    }
  }

  showSample({live:false,pairs:CACHED.pairs});
  if('fetch' in window){
    var controller=new AbortController();
    var timeout=setTimeout(function(){controller.abort();},8000);
    fetch('https://api.github.com/users/mchen04/events/public?per_page=100',{signal:controller.signal})
      .then(function(r){if(!r.ok)throw new Error('GitHub unavailable');return r.json();})
      .then(function(ev){
        if(!Array.isArray(ev)) throw new Error('Invalid event sample');
        var h={};
        ev.slice(0,100).forEach(function(e){
          if(!e||typeof e.created_at!=='string'||!Number.isFinite(Date.parse(e.created_at)))
            throw new Error('Invalid event time');
          var k=new Date(e.created_at).toISOString().slice(0,13);
          var b=h[k]||(h[k]={n:0,repos:Object.create(null)}); b.n++;
          var rn=(e.repo&&e.repo.name||'').split('/').pop();
          if(rn) b.repos[rn]=(b.repos[rn]||0)+1;
        });
        showSample({live:true,pairs:Object.keys(h).sort().map(function(k){
          var b=h[k],top='',tc=0;
          for(var r in b.repos) if(b.repos[r]>tc){tc=b.repos[r];top=r;}
          return[k,b.n,top];
        })});
      })
      .catch(function(){showSample({live:false,pairs:CACHED.pairs});})
      .finally(function(){clearTimeout(timeout);});
  }

  var rt=null;
  addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){draw(false);},120);},{passive:true});
  /* PlexMono swaps in late; re-measure the readout with the real metrics */
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){draw(false);});
})();

/* ---- writing topics: filter the archive by topic -------------------------
   The publishing helper writes the archive list; this only reads it. An
   entry's primary topic is its bold label, and the JSON map under the list
   adds secondary topics by slug. Only topics with at least one article get a
   button, so there are never empty views. Without JavaScript the whole list
   shows and no buttons appear. "pinned" in the same JSON names one slug that
   All shows first, labelled Pinned; topic views keep the helper's newest-first
   order. Without JavaScript the list stays newest first. */
(function(){
  var box=document.getElementById('topic-filter'), data=document.getElementById('writing-topics'),
      status=document.getElementById('topic-status');
  if(!box||!data) return;
  var conf; try{conf=JSON.parse(data.textContent);}catch(e){return;}
  var schema=conf.topics||[], also=conf.also||{};
  var items=Array.prototype.slice.call(document.querySelectorAll('li[data-slug]'));
  var pinned=items.filter(function(li){return li.getAttribute('data-slug')===conf.pinned;})[0],
      after=pinned&&pinned.nextSibling, pinTag=pinned&&pinned.querySelector('.tag b'), pin, pinSep;
  if(pinTag){
    pin=document.createElement('span'); pin.className='pin'; pin.textContent='Pinned';
    pinSep=document.createTextNode(' · ');
  }
  /* move the pinned entry first for All, and back to its dated place for a topic */
  function arrange(all){
    if(!pinned) return;
    var list=pinned.parentNode;
    if(all){
      list.insertBefore(pinned,list.firstElementChild);
      if(pin){ pinTag.parentNode.insertBefore(pin,pinTag); pinTag.parentNode.insertBefore(pinSep,pinTag); }
    }else{
      list.insertBefore(pinned,after);
      if(pin&&pin.parentNode){ pin.parentNode.removeChild(pin); pinSep.parentNode.removeChild(pinSep); }
    }
  }
  items.forEach(function(li){
    var b=li.querySelector('.tag b'), primary=b?b.textContent.trim():'';
    var extra=(also[li.getAttribute('data-slug')]||[]).filter(function(t){
      return schema.indexOf(t)>=0&&t!==primary;});
    li._topics=[primary].concat(extra);
    if(extra.length&&b){
      var tag=document.createElement('span'); tag.className='also';
      tag.textContent='also '+extra.join(', ');
      b.parentNode.appendChild(document.createTextNode(' · ')); b.parentNode.appendChild(tag);
    }
  });
  var used=schema.filter(function(t){
    return items.some(function(li){return li._topics.indexOf(t)>=0;});});
  if(!used.length) return;
  var buttons=[];
  function count(t){
    return t===null?items.length:items.filter(function(li){return li._topics.indexOf(t)>=0;}).length;}
  function show(t){
    var n=0;
    arrange(t===null);
    items.forEach(function(li){
      var on=t===null||li._topics.indexOf(t)>=0; li.hidden=!on; if(on) n++;});
    buttons.forEach(function(btn){btn.setAttribute('aria-pressed',String(btn._topic===t));});
    status.textContent='Showing '+n+(n===1?' article':' articles')+(t===null?'':' in '+t)+'.';
  }
  [null].concat(used).forEach(function(t){
    var btn=document.createElement('button'); btn.type='button'; btn._topic=t;
    btn.innerHTML='<span></span> <small></small>';
    btn.firstChild.textContent=t===null?'All':t; btn.lastChild.textContent=count(t);
    btn.addEventListener('click',function(){show(t);});
    box.appendChild(btn); buttons.push(btn);
  });
  /* sit under the archive heading the helper writes, so the order reads
     heading, filter, list */
  var head=document.getElementById('h-articles'), sh=head&&head.closest('.shelf-head');
  if(sh){ sh.parentNode.insertBefore(box,sh.nextSibling); sh.parentNode.insertBefore(status,box.nextSibling); }
  box.hidden=false;
  buttons[0].setAttribute('aria-pressed','true');
  arrange(true);
})();

/* ---- in-page links: move focus with the scroll ---------------------------
   Without this a keyboard user follows a fragment link, the page scrolls, and
   the next Tab returns them to the masthead.                               */
(function(){
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]'); if(!a||a.getAttribute('href').length<2) return;
    var el=document.getElementById(a.getAttribute('href').slice(1)); if(!el) return;
    el.setAttribute('tabindex','-1');
    setTimeout(function(){ el.focus({preventScroll:true}); },0);
  });
})();

});
