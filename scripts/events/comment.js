hexo.extend.filter.register("before_generate",(()=>{const e=hexo.theme.config;let{use:t}=e.comments;if(!t)return;"string"==typeof t&&(t=t.split(","));const o=t.map((e=>e.toLowerCase().replace(/\b[a-z]/g,(e=>e.toUpperCase()))));e.comments.use=o}));