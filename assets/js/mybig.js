//入口函数
$(function(){
    //点击'去注册'切换表单
    // $('#link_reg').on('click', function () {
    //     $('.reg-box').show()
    //     $('.login-box').hide()
    // })

    
    //点击'去登录'切换表单
    // $('#link_login').on('click', function () {
    //     $('.reg-box').hide()
    //     $('.login-box').show()
    // })

    $('#link_reg,#link_login').on('click', function () {
        $('.reg-box,.login-box').toggle()
    })

    /*  自定义表单校验 */
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须是6-12位的非空字符'
        ],
        repwd: function(value, item) {
            var val = $('#form_reg [name=password]').val()
            if (val !== value) {
                return'两次密码必须一致'
            }
        }
    })
//注册功能
    $('#form_reg').on('submit', function (e) {
    
        //阻止表单默认提交事件
        e.preventDefault()
       
        //
        var data = {
            username: $('#form_reg [name=username]').val().trim(),
            password:$('#form_reg [name=password]').val().trim()
        }
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg('注册用户成功', { icon: 6 }, function () {
                    $('#link_login').click()
                })

                
            }
        })

    })


   //登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        //获取表单值
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                    
                }
                layui.layer.msg(res.message, { icon: 6 }, function () {
                  
                    //把token保存到本地,调用其他接口
                    localStorage.setItem('token', res.token)
                      //跳转后台首页
                    location.href = '/index.html'
                })
            }
        })
    })






})
