//获取元素
let username = document.querySelector('input[name=username]')
let password = document.querySelector('input[name=password]')
let repassword = document.querySelector('input[name=repassword]')
let reSpan = document.querySelector('#repas')
let useSpan = document.querySelector('#use')
let pasSpan = document.querySelector('#pas')
let oBtn = document.querySelector('input[type=submit]')

//正则判断输入框是否合法，并给样式
username.oninput = function(){
    regUse()
}
username.onblur = function(){
    let value = username.value.trim()
    if(!value) useSpan.textContent = ''
}
password.oninput = function(){
   regPas()
}
password.onblur = function(){
    let value = password.value.trim()
    if(!value) pasSpan.textContent = ''
}
repassword.oninput = function(){
     // 3. 在事件处理函数中,获取用户输入的内容,然后进行校验
  const value = this.value.trim()
  if (!value) return reSpan.textContent = ''
  if (value === password.value.trim()) {
    // 说明符合要求
    reSpan.textContent = '✓'
    reSpan.style.color = 'springgreen'
  } else {
    // 不符合要求
    // 说明符合要求
    reSpan.textContent = '✗'
    reSpan.style.color = 'red'
  }
}
repassword.onblur = function(){
    let value = this.value.trim()
    if(!value) reSpan.textContent = ''
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






