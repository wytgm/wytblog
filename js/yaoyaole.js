const github = SakanaWidget.getCharacter('chisato');
github.image = `https://raw.githubusercontent.com/wytgm/BlogImg/master/%E5%9B%BE%E6%A0%87/xingeatgua.png`;
SakanaWidget.registerCharacter('github', github);
new SakanaWidget({ character: 'github' }).mount('#sakana-widget');