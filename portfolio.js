function ready(run){
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
}

ready(function(){
  var header=document.querySelector('.masthead');
  var root=document.documentElement;
  var themeColor=document.querySelector('meta[name="theme-color"]');
  var timeToggle=document.createElement('button');
  timeToggle.type='button';
  timeToggle.className='time-toggle';
  timeToggle.innerHTML='<svg class="to-day" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><svg class="to-night" viewBox="0 0 20 20" aria-hidden="true"><path d="M13.5 3.5a6.8 6.8 0 1 0 3 10.6A7.4 7.4 0 0 1 13.5 3.5z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  function syncTime(){
    var night=root.classList.contains('night');
    timeToggle.setAttribute('aria-pressed',String(night));
    timeToggle.setAttribute('aria-label',night?'Switch to day':'Switch to night');
    if(themeColor) themeColor.setAttribute('content',night?'#16131f':'#f6efe2');
  }
  timeToggle.addEventListener('click',function(){
    var night=!root.classList.contains('night');
    root.classList.toggle('night',night);
    try{localStorage.setItem('time',night?'night':'day');}catch(error){}
    syncTime();
  });
  header.querySelector('.shell').insertBefore(timeToggle,document.getElementById('menu-toggle'));
  syncTime();

  var toggle=document.getElementById('menu-toggle');
  var navigation=document.getElementById('site-nav');
  var mobile=matchMedia('(max-width:860px)');

  function closeMenu(returnFocus){
    toggle.setAttribute('aria-expanded','false');
    header.classList.remove('nav-open');
    if(returnFocus) toggle.focus();
  }

  toggle.addEventListener('click',function(){
    var open=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));
    header.classList.toggle('nav-open',open);
  });
  header.addEventListener('keydown',function(event){
    if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true') closeMenu(true);
  });
  navigation.addEventListener('click',function(event){
    if(event.target.closest('a')) closeMenu(false);
  });
  document.addEventListener('click',function(event){
    if(!header.contains(event.target)) closeMenu(false);
  });
  header.addEventListener('focusout',function(event){
    if(event.relatedTarget&&!header.contains(event.relatedTarget)) closeMenu(false);
  });
  mobile.addEventListener('change',function(){closeMenu(false);});
  addEventListener('pageshow',function(){closeMenu(false);});
  function measureHeader(){
    if(!header.classList.contains('nav-open')) document.documentElement.style.setProperty('--head',header.offsetHeight+'px');
  }
  new ResizeObserver(measureHeader).observe(header);
  measureHeader();

  var world=document.querySelector('.world');
  if(world){
    var reduced=matchMedia('(prefers-reduced-motion:reduce)');
    var fine=matchMedia('(hover:hover) and (pointer:fine)');
    var layers=Array.from(world.querySelectorAll('.layer[data-depth]')).map(function(layer){
      return {el:layer,depth:Number(layer.dataset.depth)};
    });
    var hour=document.getElementById('clock-h');
    var minute=document.getElementById('clock-m');
    function setClock(){
      if(!hour||!minute) return;
      var now=new Date();
      var m=now.getMinutes()+now.getSeconds()/60;
      var h=(now.getHours()%12)+m/60;
      var box=hour.getBBox();
      var cx=box.x+box.width/2;
      var cy=box.y+box.height;
      hour.setAttribute('transform','rotate('+(h*30)+' '+cx+' '+cy+')');
      minute.setAttribute('transform','rotate('+(m*6)+' '+cx+' '+cy+')');
    }
    setClock();
    setInterval(setClock,30000);

    var visible=true;
    function syncIdle(){
      var idle=!visible||document.hidden;
      if(idle) world.setAttribute('data-idle','');
      else world.removeAttribute('data-idle');
    }
    new IntersectionObserver(function(entries){
      visible=entries[0].isIntersecting;
      syncIdle();
    }).observe(world);
    document.addEventListener('visibilitychange',syncIdle);

    var pointer={x:0,y:0};
    var eased={x:0,y:0};
    var frame=0;
    function render(){
      frame=0;
      eased.x+=(pointer.x-eased.x)*.08;
      eased.y+=(pointer.y-eased.y)*.08;
      var rise=Math.min(scrollY,world.offsetHeight);
      layers.forEach(function(layer){
        var d=layer.depth;
        layer.el.style.transform='translate3d('+(eased.x*d*16).toFixed(2)+'px,'+(eased.y*d*9+(fine.matches?rise*d*.22:0)).toFixed(2)+'px,0)';
      });
      if(Math.abs(pointer.x-eased.x)>.002||Math.abs(pointer.y-eased.y)>.002) schedule();
    }
    function schedule(){
      if(!frame&&visible&&!reduced.matches) frame=requestAnimationFrame(render);
    }
    function enable(){
      var on=!reduced.matches;
      world.classList.toggle('parallax',on&&fine.matches);
      if(!on) layers.forEach(function(layer){layer.el.style.transform='';});
      else schedule();
    }
    world.parentNode.addEventListener('pointermove',function(event){
      if(!fine.matches) return;
      var rect=world.getBoundingClientRect();
      pointer.x=(event.clientX-rect.left)/rect.width*2-1;
      pointer.y=(event.clientY-rect.top)/rect.height*2-1;
      schedule();
    });
    world.parentNode.addEventListener('pointerleave',function(){pointer.x=0;pointer.y=0;schedule();});
    addEventListener('scroll',schedule,{passive:true});
    var blueprint=document.querySelector('.blueprint-toggle');
    if(blueprint){
      blueprint.addEventListener('click',function(){
        var on=blueprint.getAttribute('aria-pressed')!=='true';
        function apply(){
          world.classList.toggle('blueprint',on);
          world.parentNode.classList.toggle('is-blueprint',on);
          blueprint.setAttribute('aria-pressed',String(on));
          world.classList.remove('is-swapping');
        }
        if(reduced.matches){apply();return;}
        world.classList.add('is-swapping');
        setTimeout(apply,220);
      });
    }
    reduced.addEventListener('change',enable);
    fine.addEventListener('change',enable);
    enable();
  }

  var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.querySelectorAll('time[datetime]').forEach(function(time){
    var match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(time.textContent.trim());
    if(match) time.textContent=months[Number(match[2])-1]+' '+Number(match[3])+', '+match[1];
    var before=time.previousSibling;
    if(before&&before.nodeType===3&&/·\s*$/.test(before.nodeValue)&&time.closest('.picks .tag')){
      before.nodeValue=before.nodeValue.replace(/\s*·\s*$/,'');
      var sep=document.createElement('span');
      sep.className='sep';
      sep.textContent=' · ';
      time.before(sep);
    }
  });

  var meta=document.querySelector('.article > .meta');
  if(meta){
    var words=meta.parentNode.textContent.trim().split(/\s+/).length;
    var minutes=document.createElement('span');
    minutes.textContent=Math.max(1,Math.round(words/230))+' min read';
    meta.appendChild(minutes);
    var lead=meta.nextElementSibling;
    if(lead&&lead.tagName==='P'&&lead.textContent.trim().length>180&&!lead.querySelector('em:first-child,i:first-child')){
      var walker=document.createTreeWalker(lead,NodeFilter.SHOW_TEXT);
      var node=walker.nextNode();
      while(node&&!/\S/.test(node.nodeValue)) node=walker.nextNode();
      if(node){
        var at=node.nodeValue.search(/[A-Za-z0-9]/);
        if(at===0){
          node.splitText(1);
          var cap=document.createElement('span');
          cap.className='dropcap';
          cap.textContent=node.nodeValue;
          node.replaceWith(cap);
          lead.classList.add('has-dropcap');
        }
      }
    }
  }

  var article=document.querySelector('main:not([class]) .article');
  var here=location.pathname.match(/^\/writing\/([^/]+)\/$/);
  if(article&&here&&window.fetch&&window.DOMParser){
    fetch('/writing/').then(function(response){return response.ok?response.text():'';}).then(function(text){
      if(!text) return;
      var list=Array.from(new DOMParser().parseFromString(text,'text/html').querySelectorAll('li[data-slug]')).map(function(item){
        var link=item.querySelector('h3 a');
        return {slug:item.dataset.slug,order:Number(item.dataset.publicationOrder||0),title:link.textContent,href:link.getAttribute('href')};
      }).sort(function(a,b){return b.order-a.order;});
      var index=list.findIndex(function(item){return item.slug===here[1];});
      if(index<0) return;
      var nav=document.createElement('nav');
      nav.className='read-on';
      nav.setAttribute('aria-label','More writing');
      [[list[index+1],'Earlier','prev'],[list[index-1],'Newer','next']].forEach(function(pair){
        if(!pair[0]) return;
        var link=document.createElement('a');
        link.className=pair[2];
        link.href=pair[0].href;
        var label=document.createElement('small');
        label.textContent=pair[1];
        var title=document.createElement('b');
        title.textContent=pair[0].title;
        link.append(label,title);
        nav.appendChild(link);
      });
      if(nav.children.length) article.after(nav);
    }).catch(function(){});
  }

  var filter=document.getElementById('topic-filter');
  var config=document.getElementById('writing-topics');
  if(filter&&config){
    var settings=JSON.parse(config.textContent);
    var items=Array.from(document.querySelectorAll('li[data-slug]'));
    var original=items.slice();
    var pinned=items.find(function(item){return item.dataset.slug===settings.pinned;});
    var pin=document.createElement('span');
    pin.className='pin';
    pin.textContent='Pinned · ';
    var buttons=[];
    items.forEach(function(item){
      var primary=item.querySelector('.tag b').textContent.trim();
      var extra=((settings.also||{})[item.dataset.slug]||[]).filter(function(topic){return topic!==primary;});
      item.topics=[primary].concat(extra);
      if(extra.length){
        var secondary=document.createElement('span');
        secondary.className='also';
        secondary.textContent=' · also '+extra.join(', ');
        item.querySelector('.tag').appendChild(secondary);
      }
    });
    var topics=[null].concat(settings.topics.filter(function(topic){
      return items.some(function(item){return item.topics.includes(topic);});
    }));
    function show(topic){
      var order=topic===null&&pinned?[pinned].concat(original.filter(function(item){return item!==pinned;})):original;
      order.forEach(function(item){
        item.parentNode.appendChild(item);
        item.hidden=topic!==null&&!item.topics.includes(topic);
      });
      if(pinned&&topic===null) pinned.querySelector('.tag').prepend(pin);
      else pin.remove();
      buttons.forEach(function(button){button.setAttribute('aria-pressed',String(button.topic===topic));});
      var count=items.filter(function(item){return !item.hidden;}).length;
      document.getElementById('topic-status').textContent='Showing '+count+(count===1?' article':' articles')+(topic?' in '+topic:'')+'.';
    }
    topics.forEach(function(topic){
      var button=document.createElement('button');
      button.type='button';
      button.topic=topic;
      var label=document.createElement('span');
      label.textContent=topic||'All';
      var count=document.createElement('small');
      count.textContent=items.filter(function(item){return topic===null||item.topics.includes(topic);}).length;
      button.append(label,count);
      button.addEventListener('click',function(){show(topic);});
      filter.appendChild(button);
      buttons.push(button);
    });
    var heading=document.getElementById('h-articles').closest('.shelf-head');
    heading.after(filter);
    filter.after(document.getElementById('topic-status'));
    filter.hidden=false;
    show(null);
  }

  var wire=document.getElementById('wire-svg');
  if(wire){
    var rows=Array.from(document.querySelectorAll('#wire-rows tr'));
    var maximum=Math.max.apply(null,rows.map(function(row){return Number(row.cells[1].textContent);}));
    var times=rows.map(function(row){return Date.parse(row.cells[0].textContent.trim().replace(' ','T')+'Z');});
    var duration=Math.max(1,times[times.length-1]-times[0]);
    var path='M8 106';
    rows.forEach(function(row,index){
      var x=8+(times[index]-times[0])*584/duration;
      var y=106-Number(row.cells[1].textContent)/maximum*80;
      path+=' L'+(x-3)+' 106 L'+x+' '+y+' L'+(x+3)+' 106';
    });
    wire.setAttribute('viewBox','0 0 600 132');
    wire.setAttribute('preserveAspectRatio','none');
    var line=document.createElementNS('http://www.w3.org/2000/svg','path');
    line.setAttribute('d',path+' L592 106');
    line.setAttribute('class','pen');
    wire.appendChild(line);
    wire.removeAttribute('hidden');
  }

  document.addEventListener('click',function(event){
    var link=event.target.closest('a[href^="#"]');
    if(!link) return;
    var target=document.getElementById(link.getAttribute('href').slice(1));
    if(target){target.setAttribute('tabindex','-1');setTimeout(function(){target.focus({preventScroll:true});},0);}
  });
});
