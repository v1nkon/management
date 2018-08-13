export default {
    data(){
        return {
            phoneReg: /[1][3|4|5|8]\d{9}/,
            nameReg: /[0-9a-zA-Z]{3,10}/,
            eamilReg: /([0-9a-zA-Z])+[@][0-9a-zA-Z]+[\.](com)|(cn)|(com\.cn)&/
        }
    },
    methods: {
        checkPhone(rule, value = '', callback){
            value = value.trim()
            if(value == '') callback()
            if(!this.phoneReg.test(value)){
                callback("手机格式不正确")
            } else {
                callback()
            }
            callback()
        },
        checkName(rule, value = '', callback){
            value = value.trim()
            if(value == '') callback("请输入名称")
            if(!this.nameReg.test(value)){
                callback("名字由5-8位数字字母组合")
            } else {
                callback()
            }
            callback()
        },
        checkEmail(rule, value= '', callback){
            value = value.trim()
            if(value == '') callback()
            if(!this.eamilReg.test(value)){
                callback("邮箱格式不正确")
            } else {
                callback()
            }
            callback();
        },
        validatePass(rule, value='', callback){
            value = value.trim()
            if(value === ''){
                callback(new Error('请输入密码'))
            }else {
                if (this.passwordInfo.password2 !==''){
                    this.$refs.passwordForm.validateField('password2')
                }
                callback()
            }
        },
        validatePass2(rule, value= '', callback ){
            value = value.trim()
            if(value === ''){
                callback(new Error('请再次输入密码'))
            }else if (value !== this.passwordInfo.password){
                callback( new Error('两次输入密码不一致！'))
            }else{

                callback()
            }
        }
    }
}



