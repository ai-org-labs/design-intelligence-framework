const dishes=[
 {id:'pasta',name:'太陽のトマトスパゲッティ',desc:'完熟トマトのやさしい甘み。迷った日は、このひと皿。',price:890,tag:'CASA CLASSIC',art:'pasta',allergy:'小麦・乳'},
 {id:'pasta',name:'きのこのクリームパスタ',desc:'きのこの香りを、なめらかなクリームにとじこめて。',price:1090,tag:'CREAMY & COMFORTING',art:'cream',allergy:'小麦・乳'},
 {id:'pizza',name:'マルゲリータ',desc:'トマト、モッツァレラ、バジル。家族で分けたい定番。',price:1190,tag:'SHARE A SLICE',art:'pizza',allergy:'小麦・乳'},
 {id:'kids',name:'キッズ・トマトパスタ',desc:'小さなパスタとジュース。お子さまの「ひとりで」に。',price:590,tag:'FOR LITTLE APPETITES',art:'pasta',allergy:'小麦・乳'},
 {id:'side',name:'彩りシェアサラダ',desc:'葉野菜とトマトをさっぱりと。テーブルの真ん中に。',price:690,tag:'FRESH ON THE TABLE',art:'salad',allergy:'乳'},
 {id:'side',name:'ミニグリーンサラダ',desc:'いつものひと皿に、ちょうどいい野菜を添えて。',price:290,tag:'A LITTLE EXTRA',art:'salad',allergy:'乳'}];
document.getElementById('hero-dish').innerHTML=Art.plate('pasta');
function renderMenu(filter){const root=document.getElementById('dishes');root.replaceChildren();for(const d of dishes.filter(x=>filter==='all'||x.id===filter)){const article=DIF.el('article',{class:'dish','data-category':d.id}),art=DIF.el('div',{class:'dish-art'});art.innerHTML=Art.plate(d.art);const content=DIF.el('div');content.append(DIF.el('span',{class:'tag'},d.tag),DIF.el('h3',{},d.name),DIF.el('p',{},d.desc),DIF.el('strong',{class:'price'},DIF.money(d.price)),DIF.el('small',{},'含む食材例：'+d.allergy));article.append(art,content);root.append(article);}}
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderMenu(b.dataset.filter);});
document.getElementById('allergy-open').onclick=()=>DIF.dialog('menu-dialog','アレルギーについて',['このページの料理・食材情報はデザイン検討用の架空データです。実際の食事判断には使用できません。','実店舗版では原材料と共通調理器具を確認した情報を掲載し、注文前にスタッフへ相談できる導線を用意します。']);
window.addEventListener('beforeprint',()=>renderMenu('all'));window.addEventListener('afterprint',()=>renderMenu(document.querySelector('[data-filter][aria-pressed=true]').dataset.filter));renderMenu('all');
