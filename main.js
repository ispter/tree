// 汉堡菜单交互
const menuBtn = document.getElementById('menu-btn');
const menuMask = document.getElementById('menu-mask');
const dropdownMenu = document.getElementById('dropdown-menu');
const menuIcon = document.getElementById('menu-icon');
const bars = menuIcon.querySelectorAll('.bar');
let menuOpen = false;
function openMenu() {
  dropdownMenu.classList.add('active');
  menuMask.style.display = 'block';
  document.body.style.overflow = 'hidden';
  bars[0].style.transform = 'translateY(14px) rotate(45deg)';
  bars[0].style.setProperty('background-color', '#2BAE17', 'important');
  bars[0].style.height = '6px';
  bars[0].style.boxShadow = '0 2px 8px rgba(43,174,23,0.18)';
  bars[1].style.opacity = '0';
  bars[2].style.transform = 'translateY(-14px) rotate(-45deg)';
  bars[2].style.setProperty('background-color', '#2BAE17', 'important');
  bars[2].style.height = '6px';
  bars[2].style.boxShadow = '0 2px 8px rgba(43,174,23,0.18)';
  menuOpen = true;
}
function closeMenu() {
  dropdownMenu.classList.remove('active');
  menuMask.style.display = 'none';
  document.body.style.overflow = '';
  bars[0].style.transform = '';
  bars[0].style.setProperty('background-color', '#fff', 'important');
  bars[0].style.height = '4px';
  bars[0].style.boxShadow = '0 1px 4px rgba(0,0,0,0.12)';
  bars[1].style.opacity = '1';
  bars[2].style.transform = '';
  bars[2].style.setProperty('background-color', '#fff', 'important');
  bars[2].style.height = '4px';
  bars[2].style.boxShadow = '0 1px 4px rgba(0,0,0,0.12)';
  menuOpen = false;
}
menuBtn.onclick = function(e) {
  e.stopPropagation();
  if (!menuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
};
menuMask.onclick = function(e) { e.stopPropagation(); closeMenu(); };
dropdownMenu.onclick = function(e) { e.stopPropagation(); };
// 音乐控制
const bgm = document.getElementById('bgm');
const musicControl = document.getElementById('music-control');
const pauseIcon = document.getElementById('pause-icon');
const playIcon = document.getElementById('play-icon');
let isPlaying = true;
// 兼容自动播放策略
function tryPlay() {
  bgm.muted = false;
  bgm.play().catch(()=>{});
}
window.addEventListener('load', tryPlay);
document.addEventListener('DOMContentLoaded', tryPlay);
document.body.addEventListener('pointerdown', tryPlay, { once: true });
document.body.addEventListener('touchstart', tryPlay, { once: true });
document.body.addEventListener('click', tryPlay, { once: true });
musicControl.onclick = function(e) {
  e.stopPropagation();
  if (isPlaying) {
    bgm.pause();
    pauseIcon.style.display = 'none';
    playIcon.style.display = '';
    isPlaying = false;
  } else {
    bgm.play();
    pauseIcon.style.display = '';
    playIcon.style.display = 'none';
    isPlaying = true;
  }
};
// 若音乐被用户/系统暂停，自动切换图标
bgm.addEventListener('pause', ()=>{
  pauseIcon.style.display = 'none';
  playIcon.style.display = '';
  isPlaying = false;
});
bgm.addEventListener('play', ()=>{
  pauseIcon.style.display = '';
  playIcon.style.display = 'none';
  isPlaying = true;
});
// iframe导航切换
document.querySelectorAll('a[dropdown-link]').forEach(function(link){
  link.onclick = function(e){
    e.preventDefault();
    closeMenu();
    let page = this.getAttribute('href');
    // 如果 href 以 .html 结尾，直接用，否则加 .html
    if (!/\.html$/.test(page)) {
      if(page===''||page==='home') page='home.html';
      else page = page + '.html';
    }
    document.getElementById('main-frame').src = page;
  }
});
document.getElementById('main-zhuanti-link').onclick = function(e) {
  e.preventDefault();
  document.getElementById('main-frame').src = 'zhuanti.html';
}; 