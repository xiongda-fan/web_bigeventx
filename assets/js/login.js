$(function() {
    //1. 显示登陆注册隐藏切换
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })



    //2. 自定义校验规则
    //从 Layui 中获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    //通过 form.verify() 函数自定义校验规则
    form.verify({
        //参数对象中的属性，未来将成为规则
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次判断
            //如果判断失败，就return一个提示信息
            var pwd = $('.reg-box input[name=password]').val();
            //判断两次密码是否一致
            if (pwd !== value) {
                return '两次密码输入不一致';
            }
        }
    });


    //3. 注册功能
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止表单默认提交
        e.preventDefault();
        //发送ajax的post请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            //data: $(this).serialize(),//username=zs&password=ls
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                //判断返回的状态
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg(res.message);
                //手动切换到登陆表单
                $('#link_login').click();
                //重置form表单
                $("#form_reg")[0].reset();
            }
        })
    })


    //4. 登录功能(给form标签绑定事件，button按钮出发提交 事件)
    $("#form_login").submit(function(e) {
        //阻止表单提交
        e.preventDefault();
        //发送ajaxPOST请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                //判断返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提示信息  保存 token  跳转页面
                layer.msg("恭喜您，登录成功!!");
                //保存 token 为来的接口要使用token
                localStorage.setItem('token', res.token);
                //跳转
                location.href = "/index.html";
            }
        })
    })
})