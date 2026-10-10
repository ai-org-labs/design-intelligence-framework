window.DIF = {
 el(tag, attrs={}, text) { const e=document.createElement(tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e; },
 dialog(id, title, paragraphs) {const d=document.getElementById(id);d.replaceChildren(this.el('h2',{},title));for(const p of paragraphs)d.append(this.el('p',{},p));const row=this.el('div',{class:'close-row'}),close=this.el('button',{type:'button'},'閉じる');close.onclick=()=>d.close();row.append(close);d.append(row);d.showModal();},
 money(value) {return new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY'}).format(value);}
};
