const muyu = document.getElementById('muyu');
const chuizi = document.getElementById('chuizi');
const countElement = document.getElementById('count');
let count = 0;

// 监听整个文档的点击事件
document.addEventListener('click', function () {
    // 锤子敲击动效
    chuizi.style.transform = 'rotate(-30deg)';
    setTimeout(() => {
        chuizi.style.transform = 'rotate(0deg)';
    }, 200);

    // 木鱼被敲击动效
    muyu.style.transform = 'scale(1.1)';
    setTimeout(() => {
        muyu.style.transform = 'scale(1)';
    }, 200);

    // 计数加 1
    count++;
    countElement.textContent = count;
});