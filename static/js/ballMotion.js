const TIME = 15;
let countdown = TIME;
let intervalId = null;
// 初始化倒计时，开启监听
function initCountdown() {
  resetCountdown();
  intervalId = setInterval(this.handleCountdown, 1000);

  const body = document.querySelector("html");
  body.addEventListener("click", this.resetCountdown);
  body.addEventListener("keydown", this.resetCountdown);
  body.addEventListener("mousemove", this.resetCountdown);
  body.addEventListener("mousewheel", this.resetCountdown);
}
// 执行倒计时，执行指定任务
function handleCountdown() {

  // 倒计时结束
  if (countdown <= 0) {
    this.doInspection();

    if (intervalId) {
      clearInterval(intervalId);
    }
  }else{
    countdown--;
  }
}

// 重置倒计时
function resetCountdown() {
  // TODO 重置倒计时之前先把之前的状态关闭
  // exp: 比如关闭动画等

  countdown = TIME;

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(this.handleCountdown, 1000);
}
// 计时结束后的操作
function doInspection() {
  // TODO 计时结束后的操作
  // exp: 比如执行动画等
  countdown = TIME;
  $(".popup-7").fadeIn();
}

initCountdown();

var oB = new CollBox("balls");
const clickData = {
  clickTotal: 0,
};
const proxy = new Proxy(clickData, {
  set(target, key, value) {
    target[key] = value; // 更新原始对象的属性值
    console.log(`${key}属性的值被设置为：${value}`);
    if (value === 7) {
      setTimeout(() => {
        $(".popup-8").fadeIn();
      }, 1000);
    }
    return true;
  },
});
ballsArr.forEach((item) => {
  let imgsHtml = "";
  item.imgs &&
    item.imgs.forEach((item, index) => {
      imgsHtml += `<img src="${item}" class="img${index + 1}">`;
    });
  var ball = new Ball({
    e: document.querySelector("." + item.domClass),
    b: item.size / 2,
    x: item.x + item.size / 2,
    y: item.y + item.size / 2,
    c: item.color,
    html: imgsHtml,
  });
  oB.addBall(ball);
  oB.ballRun();
});

$(".ball").on("click", function () {
  const id = $(this).data("id");

  $(".popup").hide();
  const showDom = $(`.popup-${id}`);
  if (showDom[0]) {
    $(this).addClass("scale");
    showDom.fadeIn();
    showDom.css({
      display: "flex",
    });
  }
  if (+$(this).data("click")) {
    return;
  }
  $(this).data("click", 1);
  proxy.clickTotal++;
  $(this).addClass("lightBg");
});

$(".close").on("click", function () {
  const index = $(this).parents(".popup").data("ball");
  $(this).parents(".popup").hide();
  $(".ball-" + index).removeClass("scale");
  if (index === 7) {
    location.reload()
  }
});

$(".query").on("click", function () {
  $(".popup-7").fadeIn();
  if ($(this).data("click")) {
    return;
  }
  $(this).data("click", 1);
  proxy.clickTotal++;
});

$(".popup-8 .close").on("click", function () {
  $(".lightBg").removeClass("lightBg");
  $(".popup").hide();
});
