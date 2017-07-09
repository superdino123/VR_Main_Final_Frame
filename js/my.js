/**
 * Created by lds15 on 2016/8/1.
 */

function login(){
    var name=document.getElementById("username").value;

    var password=document.getElementById("password").value;
    if(name && password){
        if(name=="lds"&&password=="123" ){
            alert("登录成功");
            window.location.href="http://www.baidu.com";
        }
        else{
            alert("用户不存在或密码错误！请确认后再登陆");
            return;
        }
    }


}