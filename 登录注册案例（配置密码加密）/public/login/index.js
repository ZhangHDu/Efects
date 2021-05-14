//获取元素
let username = document.querySelector('input[name=username]')
let password = document.querySelector('input[name=password]')
let useSpan = document.querySelector('#use')
let pasSpan = document.querySelector('#pas')
let oBtn = document.querySelector('input[type=submit]')

//正则判断输入框是否合法，并给样式
username.oninput = function(){
    let value = username.value.trim()
    if(!value) return useSpan.textContent = ''
    let reg = /^\w{8,16}$/
    if(reg.test(value)){
        useSpan.textContent = '✓'
        useSpan.style.color = 'springgreen'
    }else{
        useSpan.textContent = '✗'
        useSpan.style.color = 'red'
    }
}
username.onblur = function(){
    let value = username.value.trim()
    if(!value) useSpan.textContent = ''
}
password.oninput = function(){
    let value = password.value.trim()
    if(!value) return pasSpan.textContent = ''
    let reg = /^[A-z]+\w{7,15}$/
    if(reg.test(value)){
        pasSpan.textContent = '✓'
        pasSpan.style.color = 'springgreen'
    }else{
        pasSpan.textContent = '✗'
        pasSpan.style.color = 'red'
    }
}
password.onblur = function(){
    let value = password.value.trim()
    if(!value) pasSpan.textContent = ''
}
//点击登录时的判断
oBtn.onclick = function(e){
    //1.如果为空，则阻止提交
    if(!useSpan.style.color||!pasSpan.style.color) return e.preventDefault()
    //2.如果不为空，就判断颜色
    if(!(useSpan.style.color === 'springgreen' && pasSpan.style.color === 'springgreen')){
        e.preventDefault()
    }
}






