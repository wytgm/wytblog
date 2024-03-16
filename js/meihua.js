// 更新版本需要每个用户都恢复一次默认设置
if (localStorage.getItem("reset_2") == undefined) {
  localStorage.setItem("reset_2", "1");
  localStorage.removeItem("reset_1");
  clearItem();
  setTimeout(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "Tips",
          message: " (｡･∀･)ﾉﾞ祝您浏览愉快！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 8000
        });
      }
    })
  }, 1500);
}

// 清除localStorage配置项
function clearItem() {
  localStorage.removeItem('blogbg');
  localStorage.removeItem('universe');
  localStorage.removeItem('blur');
  localStorage.removeItem('fpson');
  localStorage.removeItem('transNum');
  localStorage.removeItem('bing');
  localStorage.removeItem('blurRad');
  localStorage.removeItem('font');
  localStorage.removeItem('themeColor');
  localStorage.removeItem('rs');
  localStorage.removeItem('mouse');
}


// 设置字体
if (localStorage.getItem("font") == undefined) {
  localStorage.setItem("font", "漫画体");
}
setFont(localStorage.getItem("font"));
function setFont(n) {
  localStorage.setItem("font", n)
  if (n == "default") {
    document.documentElement.style.setProperty('--global-font', '-apple-system');
    document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
  }
  else {
    document.documentElement.style.setProperty('--global-font', n);
    document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
  }
  try { setFontBorder(); } catch (err) { };
}

// 设置字体选择框边界
function setFontBorder() {
  var curFont = localStorage.getItem("font");
  var swfId = "swf_" + curFont;
  document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
  Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
    if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
  });
}


// 刷新窗口
function reload() {
  window.location.reload();
}

// 切换自定义颜色
var defineColor = localStorage.getItem("blogbg") && localStorage.getItem("blogbg").charAt(0) == '#' ? localStorage.getItem("blogbg") : '#F4D88A';
function changeBgColor() {
  changeBg(document.querySelector("#colors").value);
}

// 更换背景(自己的代码)
if (localStorage.getItem("blogbg") != undefined) {
  let curBg = localStorage.getItem("blogbg");
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: ${curBg};
    --darkmode-bg: ${curBg};
    --mobileday-bg: ${curBg};
    --mobilenight-bg: ${curBg};
  }`;
  changeBg(curBg);
} else {
    // 替换你自己的默认背景
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: url();
    --darkmode-bg:url();
    --mobileday-bg: url();
    --mobilenight-bg: url();
  }`;
}
function changeBg(s) {
  let bg = document.getElementById("web_bg");
  if (s.charAt(0) == "#") {
    bg.style.backgroundColor = s;
    bg.style.backgroundImage = "none";
    defineColor = s;
  } else {
    bg.style.backgroundImage = s
    defineColor = '#F4D88A';
  };
  localStorage.setItem("blogbg", s);
  localStorage.setItem("bing", "false");
  if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
}


// 切换链接对应的背景(加入了链接检验与防抖)
function getPicture() {
  debounce(getPicture_, 300);
}

function getPicture_() {
  let bg = document.getElementById("web_bg");
  checkImgExists(document.getElementById("pic-link").value).then(() => {
    // 有效的图片链接
    var link = "url(" + document.getElementById("pic-link").value + ")";
    bg.style.backgroundImage = link;
    localStorage.setItem("blogbg", link);
    localStorage.setItem("bing", "false");
    if (document.getElementById("bingSet")) document.getElementById("bingSet").checked = false;
    // 提示切换成功
    new Vue({
      data: function () {
        this.$notify({
          title: "可以啦🍨",
          message: "切换自定义背景成功！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }).catch(() => {
    // 无效的图片链接，提示无效
    new Vue({
      data: function () {
        this.$notify({
          title: "链接不对🤣",
          message: "请输入有效的图片链接！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 5000
        });
      }
    })
  })
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    }
    ImgObj.onerror = function (err) {
      reject(err);
    }
  })
}

// 创建窗口
var winbox = "";

function createWinbox() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  winbox = WinBox({
    id: "meihuaBox",
    index: 99,
    title: "美化设置",
    x: "left",
    y: "center",
    minwidth: "300px",
    height: "60%",
    background: 'var(--theme-color)',
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = "";
    },
  });
  winResize();
  window.addEventListener("resize", winResize);

  // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
  winbox.body.innerHTML = `
<div class="settings" style="display: block;">
<div id="article-container" style="padding:12px;">
<br>
<p><center><button onclick="reset()" style="background: #619ac3;display:block;width:40%;padding:15px 0;border-radius:15px;color:white;font-size:1.1em;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>

<h2><center>字体设置</center></h2>
<p id="swfs">
<a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:black" onclick="setFont('ZhuZiAWan')">筑紫A丸标准体2.0</a>
<a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('default')">系统默认</a>
<a class="swf"  href="javascript:;" rel="noopener external nofollow" style="font-family:'漫画体'!important;color:black" onclick="setFont('漫画体')">漫画体</a>
<a class="swf"  href="javascript:;" rel="noopener external nofollow" style="font-family:'也字工厂弗吉亚体'!important;color:black" onclick="setFont('也字工厂弗吉亚体')">也字工厂弗吉亚体</a>


</p>

<hr>

<h2><center>背景设置</center></h2>
<center><button onclick="resetBg()" style="background: #619ac3;display:block;width:35%;padding:15px 0;border-radius:30px;color:white;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认背景</button></center>

<h3>二次元</h3>
<div class="bgbox">
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/ai)" class="imgbox" onclick="changeBg('url(https\://t.mwm.moe/ai)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/ys)" class="imgbox" onclick="changeBg('url(https\://t.mwm.moe/ys)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/ycy)" class="imgbox" onclick="changeBg('url(https\://t.mwm.moe/ycy)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/pc)" class="imgbox" onclick="changeBg('url(https\://t.mwm.moe/pc)')"></a>
</div>

<hr>

<h3>渐变色</h3>
<div class="bgbox">
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a>
</div>

<hr>

<h3>纯色</h3>
<div class="bgbox">
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>  
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9ccd3" onclick="changeBg('#e9ccd3')"></a>  
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" class="box" style="background: #619ac3" onclick="changeBg('#619ac3')"></a>  
<input type="color" id="colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input>
</div>

<hr>

<h3>适配手机</h3>

<div class="bgbox">
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/moemp)" class="pimgbox" onclick="changeBg('url(https\://t.mwm.moe/moemp)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/mp)" class="pimgbox" onclick="changeBg('url(https\://t.mwm.moe/mp)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/ysmp)" class="pimgbox" onclick="changeBg('url(https\://t.mwm.moe/ysmp)')"></a>
<a style="margin-right:3px" href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/aimp)" class="pimgbox" onclick="changeBg('url(https\://t.mwm.moe/aimp)')"></a>
</div>

<hr>

<h3> 自定义背景</h3>
<div class="bgbox">
<p><center>
<input type="text" id="pic-link" size="50%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://source.fomal.cc/img/home_bg.webp">
</center></p>

<p><center>
<button type="button" onclick="getPicture()" style="background:var(--theme-color);">🌈切换背景🌈</button>
</center></p>
<hr>
<br>
<center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>


</div>

</div>

`;

  // 打开小窗时候初始化
  $("#" + localStorage.getItem("themeColor")).attr("checked", true);
  if (localStorage.getItem("blur") == 1) {
    document.getElementById("blur").checked = true;
  } else {
    document.getElementById("blur").checked = false;
  }
  if (localStorage.getItem("universe") == "block") {
    document.getElementById("universeSet").checked = true;
  } else if (localStorage.getItem("universe") == "none") {
    document.getElementById("universeSet").checked = false;
  }
  if (localStorage.getItem("fpson") == "1") {
    document.getElementById("fpson").checked = true;
  } else {
    document.getElementById("fpson").checked = false;
  }
  if (localStorage.getItem("rs") == "block") {
    document.getElementById("rightSideSet").checked = true;
  } else if (localStorage.getItem("rs") == "none") {
    document.getElementById("rightSideSet").checked = false;
  }
  if (localStorage.getItem("bing") == "true") {
    document.getElementById("bingSet").checked = true;
  } else {
    document.getElementById("bingSet").checked = false;
  }
  if (localStorage.getItem("light") == "true") {
    document.getElementById("lightSet").checked = true;
  } else {
    document.getElementById("lightSet").checked = false;
  }
  setFontBorder();

}

// 恢复默认背景
function resetBg() {
  localStorage.removeItem('blogbg');
  reload();
}

// 恢复默认设置并刷新页面
function reset() {
  clearItem();
  reload();
}

// 适应窗口大小
function winResize() {
  try {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
  } catch (err) {
    // console.log("Pjax毒瘤抽风运行winResize方法🙄🙄🙄");
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  if (document.querySelector("#meihuaBox")) {
    winbox.toggleClass("hide");
  } else {
    createWinbox();
  };
}
