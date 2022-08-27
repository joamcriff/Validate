
function Validator(option){
    function validate(ruleName, rule){
        var errorElement = ruleName.parentElement.querySelector(option.errorSelector);    
        var errorMessage;   
        var rule = ruleElement[rule.selector];
            for (var i = 0; i < rule.length; i++) {
                errorMessage = rule[i](ruleName.value);
                if (errorMessage) break;
            }
                if(errorMessage) {
                    errorElement.innerText = errorMessage;
                    ruleName.parentElement.classList.add('invalid');
                }
                else {
                    errorElement.innerText = '';
                    ruleName.parentElement.classList.remove('invalid');
                }
            return !!errorMessage;
    }

    var formElement = document.querySelector(option.form); 
    var ruleElement = {};

    if (formElement) {
        formElement.onsubmit = function(event){
            event.preventDefault();

            var iFormValid = true;

            option.rules.forEach(rule => {
                var ruleName = formElement.querySelector(rule.selector);
                var isValid = validate(ruleName, rule);
                if(isValid) {
                    iFormValid = false;
                }
            }) 
            if(iFormValid) {
                alert("Đăng Kí Thành Công")
            }
        }

        option.rules.forEach(rule => {
            var ruleName = formElement.querySelector(rule.selector);
            if (Array.isArray(ruleElement)) {
                ruleElement.push(rule.test);
            }
            else {
                ruleElement[rule.selector] = [rule.test];
            }
            if(ruleName){
            ruleName.onblur = () => {
                validate(ruleName, rule);
            };
            ruleName.oninput = () => {
                var errorElement = ruleName.parentElement.querySelector(option.errorSelector);
                errorElement.innerText = '';
                ruleName.parentElement.classList.remove('invalid');
            }    
        }
        });
    }
}

//Định nghĩa các rules
Validator.isRequired = function(selector){
return {
        selector,
        test(value)
        {
            return value.trim() ? undefined : "Vui lòng nhập lại tên!"
        }
    }
}

Validator.isEmail = function(selector){
    return {
        selector,
        test(value)
        {
            var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return mail.test(value) ? undefined : "Vui lòng nhập lại Email!";
        }
    }
}

Validator.isPassWord = function(selector){
    return {
        selector,
        test(value)
        {
            var pw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,32})$/;
            return pw.test(value) ? undefined : "Vui lòng nhập lại Password!";
        }
    }
}

Validator.isConfirmed = function(selector, getConfirmation){
    return {
        selector,
        test(value)
        {
            return value === getConfirmation() ? undefined : "Mật khẩu nhập lại chưa chính xác";
        }
    }
}


