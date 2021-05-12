function regUse(){
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

function regPas(){
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