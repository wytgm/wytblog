"use strict";hexo.extend.helper.register("aside_categories",(function(t,e){if(e||t&&Object.prototype.hasOwnProperty.call(t,"length")||(e=t,t=this.site.categories),!t||!t.length)return"";e=e||{};const{config:n}=this,a=!Object.prototype.hasOwnProperty.call(e,"show_count")||e.show_count,i=e.depth?parseInt(e.depth,10):0,s=e.orderby||"name",r=e.order||1,c=this.url_for(n.category_dir),l=0===e.limit?t.length:e.limit,o="none"!==e.expand,h=o&&!0===e.expand?"expand":"",d=this._p("aside.more_button"),p=(e,n,c,l=!0)=>{let d="";const u=l;return e>0&&(e=>{const n={};return n.parent=e||{$exists:!1},t.find(n).sort(s,r).filter((t=>t.length))})(c).forEach(((t,s)=>{if(e>0){let s;if(e-=1,!i||n+1<i){const a=p(e,n+1,t._id,!1);s=a[0],e=a[1]}d+=`<li class="card-category-list-item ${o&&u&&s?"parent":""}">`,d+=`<a class="card-category-list-link" href="${this.url_for(t.path)}">`,d+=`<span class="card-category-list-name">${t.name}</span>`,a&&(d+=`<span class="card-category-list-count">${t.length}</span>`),o&&u&&s&&(d+=`<i class="anzhiyufont anzhiyu-icon-caret-left ${h}"></i>`),d+="</a>",s&&(d+=`<ul class="card-category-list child">${s}</ul>`),d+="</li>"}})),[d,e]},u=p(l,0);return`<div class="item-headline">\n            <i class="anzhiyufont anzhiyu-icon-folder-open"></i>\n            <span>${this._p("aside.card_categories")}</span>\n            ${function(){if(t.length<=l)return"";return`<a class="card-more-btn" href="${c}/" title="${d}">\n    <i class="anzhiyufont anzhiyu-icon-angle-right"></i></a>`}()}\n            </div>\n            <ul class="card-category-list" id="aside-cat-list">\n            ${u[0]}\n            </ul>`}));