// 获取 canvas 元素
const canvas = document.getElementById('message');
const ctx = canvas.getContext('2d');
// 设置 canvas 尺寸
canvas.width = 200;
canvas.height = 100;
// 图片数组
const images = [
  'img/apologize/bubu.png',
  'img/apologize/cat.png',
  'img/apologize/yellowface.png',
  'img/apologize/tear.png',
  'img/apologize/cute.png',
]
// 消息数组
const messages = [
  '原谅我好不好嘛(≧﹏≦)',
  '在考虑一下下嘛＞﹏＜',
  '你确定吗？女人(¬_¬ )',
  '真的不原谅我吗？(╥﹏╥)',
  '求求你了(˃̣̣̥᷄ ᴖ ˂)你最好了！',
]
// 当前索引
let currentIndex = 0;

// 绘制消息框
function drawMessageBox(message) {
  // 清空 canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(75, 80);
  //两个关键点的坐标:   控制点(宽高)目标点(宽高)
  ctx.quadraticCurveTo(75, 100, 50, 100); // 弯弯右侧
  ctx.quadraticCurveTo(65, 100, 65, 80); // 弯弯左侧
  ctx.quadraticCurveTo(1, 80, 1, 40); // 左下角
  ctx.quadraticCurveTo(1, 1, 100, 1); // 左上角
  ctx.quadraticCurveTo(199, 1, 199, 40); // 右上角
  ctx.quadraticCurveTo(200, 80, 75, 80); // 右下角
  // 设置填充颜色
  ctx.fillStyle = '#ffffff'; // 白色背景
  ctx.fill();

  // 设置边框颜色并绘制边框
  ctx.strokeStyle = '#000000'; // 黑色边框
  ctx.lineWidth = 3;
  ctx.stroke();


  ctx.closePath();

  // 绘制文字
  ctx.fillStyle = '#000000'; // 黑色文字
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(message, canvas.width / 2, canvas.height / 2.5);


}

// 初始绘制消息框
drawMessageBox(messages[currentIndex]);

// 检查两个矩形是否重叠的函数
function isOverlapping(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

document.getElementById('btn-n').addEventListener('click', function () {
  const noButton = document.querySelector('#btn-n');
  const yesButton = document.querySelector('#btn-y');
  const box1 = document.querySelector('.box1');
  const box1Img = document.querySelector('.box1 img');
  const box2 = document.querySelector('.box2');

  //小雨动画
  document.querySelector('.container .rainy').style.display = 'flex';
  //关闭多云
  document.querySelector('.container .cloudy').style.display = 'none';

  // 更换图片
  currentIndex = (currentIndex + 1) % images.length;
  box1Img.src = images[currentIndex];

  drawMessageBox(messages[currentIndex]);

  // 获取页面元素的位置和尺寸
  const yesRect = yesButton.getBoundingClientRect();
  const box1Rect = box1.getBoundingClientRect();
  const box2Rect = box2.getBoundingClientRect();

  let newLeft, newTop;
  let noRect;

  do {
    // 随机生成新的位置
    newLeft = Math.random() * (window.innerWidth - noButton.offsetWidth);
    newTop = Math.random() * (window.innerHeight - noButton.offsetHeight);

    // 更新 "No" 按钮的位置
    noButton.style.left = `${newLeft}px`;
    noButton.style.top = `${newTop}px`;

    // 获取 "No" 按钮的新位置
    noRect = noButton.getBoundingClientRect();
  } while (
    isOverlapping(noRect, yesRect) || // 检查是否与 "Yes" 按钮重叠
    isOverlapping(noRect, box1Rect) || // 检查是否与 box1 重叠
    isOverlapping(noRect, box2Rect) // 检查是否与 box2 重叠
  );

  // 增大 "Yes" 按钮的尺寸
  const currentHeight = parseInt(window.getComputedStyle(yesButton).height);
  const currentWidth = parseInt(window.getComputedStyle(yesButton).width);
  yesButton.style.height = (currentHeight + 20) + 'px';
  yesButton.style.width = (currentWidth + 40) + 'px';
  //增大字体
  yesButton.style.fontSize = (parseInt(window.getComputedStyle(yesButton).fontSize) + 7) + 'px';

});

document.getElementById('btn-y').addEventListener('click', function () {
  const box1 = document.querySelector('.box1');
  box1.innerHTML = `
    <img src="img/apologize/enhence.png" alt="Heart" style="width: 110%; height: 100%;">
  `;
  //隐藏其他内容
  document.querySelector('.box2').style.display = 'none';
  document.querySelector('#btn-y').style.display = 'none';
  document.querySelector('#btn-n').style.display = 'none';
  document.querySelector('.container .rainy').style.display = 'none';
  document.querySelector('.container .cloudy').style.display = 'none';
  // 显示语句
  document.querySelector('.text').style.display = 'block';
  document.querySelector('.container .sunny').style.display = 'grid';
});