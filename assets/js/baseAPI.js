//1. 开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net";
//1. 测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";
//1. 生产环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";


//每次调用get post ajax 的时候
//都会先调用 ajaxPrefilter 这个函数
//在这个函数中   可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //再发送真正的ajax请求之前  统一拼接请求的根路径
    alert(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    alert(options.url);
})