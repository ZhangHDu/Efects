//获取元素
let oMain = document.querySelector('.main')
let oPic = document.querySelectorAll('.main li')
let oSpit = document.querySelector('.spit')
let lis = document.querySelectorAll('.spit li')
let oLeft = document.querySelector('.left')
let oRight = document.querySelector('.right')
let index = 0
let timer = null
//获取图片的宽度
let picW = oMain.offsetWidth
//设置容器的位置
oMain.style.left = 0 + 'px'
//给第一个进度设置样式
lis[0].className = 'thisPic'
//轮播图切换逻辑
function picMove(){
    //根据下标切换图片
    oMain.style.left = -index*picW+'px'
    //排他算法
    for(let i = 0;i<lis.length;i++){
        lis[i].className = ''
    }
    //根据下标添加样式
    lis[index].className = 'thisPic'
}
//轮播图切换规律
function HTM(){
    index++//切换下一张图片
    if(index>=3){
        //防止多次点击导致index大于3
        index = 3
        oMain.style.transition = 'all,linear,1s'
        oMain.style.left = -index*picW+'px'
         //排他算法
    for(let i = 0;i<lis.length;i++){
        lis[i].className = ''
    }
    //根据下标添加样式
    lis[0].className = 'thisPic'
    //无缝轮播
    setTimeout(function(){
        index = 0 //直接显示第一张
        oMain.style.transition = '' // 无过渡，这样用户就看不出破绽了
        picMove()
    },1500)
    }else{
        oMain.style.transition = 'all,linear,1.5s'
        picMove()
    }
}
//添加定时器，让图片动起来
timer = setInterval(HTM,3000)
//右箭头
oRight.addEventListener('click',function(){
    clearInterval(timer)
    HTM()
    timer = setInterval(HTM,3000)
})
//左箭头 和右箭头相反
oLeft.addEventListener('click',function(){
    index--
    if(index<0){
        index = 2
        oMain.style.transition = 'all,linear,1s'
        oMain.style.left = -index*picW+'px'
        for(let i = 0;i<lis.length;i++){
            lis[i].className = ''
        }
        lis[2].className = 'thisPic'
        setTimeout(function(){
            index = 2
            oMain.style.transition = ''
            picMove()
        },1000)
    }else{
        oMain.style.transition = 'all,linear,1.5s'
        picMove()
    }
})

//清除和开启定时器
//鼠标移入清除
oMain.addEventListener('mouseover',function(){
    clearInterval(timer)
})
oRight.addEventListener('mouseover',function(){
    clearInterval(timer)
})
oLeft.addEventListener('mouseover',function(){
    clearInterval(timer)
})
//鼠标移入开启定时器
oMain.addEventListener('mouseout',function(){
    timer = setInterval(picMove(),3000)
})
oRight.addEventListener('mouseout',function(){
    timer = setInterval(picMove(),3000)
})
oLeft.addEventListener('mouseout',function(){
    timer = setInterval(picMove(),3000)
})

