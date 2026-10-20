document.documentElement.classList.add('js');

function ready(run){
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
}

ready(function(){
  var header=document.querySelector('.masthead');
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

  var orbit=document.querySelector('.orbit');
  if(orbit){
    var reduced=matchMedia('(prefers-reduced-motion:reduce)');
    var scrolled=scrollY>0;
    function syncOrbit(){
      orbit.dataset.running=String(!scrolled&&!document.hidden&&!reduced.matches);
    }
    addEventListener('scroll',function(){scrolled=true;syncOrbit();},{passive:true});
    document.addEventListener('visibilitychange',syncOrbit);
    reduced.addEventListener('change',syncOrbit);
    addEventListener('pagehide',function(){orbit.dataset.running='false';});
    addEventListener('pageshow',syncOrbit);
    syncOrbit();
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
    var line=document.createElementNS('http://www.w3.org/2000/svg','path');
    line.setAttribute('d',path+' L592 106');
    line.setAttribute('class','pen');
    wire.appendChild(line);
    wire.hidden=false;
  }

  document.addEventListener('click',function(event){
    var link=event.target.closest('a[href^="#"]');
    if(!link) return;
    var target=document.getElementById(link.getAttribute('href').slice(1));
    if(target){target.setAttribute('tabindex','-1');setTimeout(function(){target.focus({preventScroll:true});},0);}
  });
});
