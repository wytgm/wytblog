"use strict";hexo.extend.tag.register("image",(function(t){let e=(t=t.join(" ").split(", "))[0].trim(),i="",n="",l="";if(t.length>1)for(let e=1;e<t.length;e++){let g=t[e].trim();g.includes("alt=")?i=g.substring(4,g.length):g.includes("width=")?l+="width:"+g.substring(6,g.length)+";":g.includes("height=")?l+="height:"+g.substring(7,g.length)+";":g.includes("bg=")&&(n=g.substring(3,g.length))}let g="";return g+='<div class="img-wrap">',g+='<div class="img-bg"',n.length>0&&(g+=' style="background:'+n+'"'),g+=">",g+=function(t,e,i){let n="";return n+='<img class="img" src="'+t+'"',e.length>0&&(n+=' alt="'+e+'"'),i.length>0&&(n+=' style="'+i+'"'),n+="/>",n}(e,i,l),g+="</div>",i.length>0&&(g+='<span class="image-caption">'+i+"</span>"),g+="</div>",g})),hexo.extend.tag.register("inlineimage",(function(t){let e="";e+='<img no-lazy class="inline" src="'+(t=t.join(" ").split(", "))[0].trim()+'"';let i="";if(t.length>1)for(let e=1;e<t.length;e++){let n=t[e].trim();n.includes("height=")&&(i+="height:"+n.substring(7,n.length)+";")}return i.length>0?e+=' style="'+i+'"':e+=' style="height:1.5em"',e+="/>",e}));