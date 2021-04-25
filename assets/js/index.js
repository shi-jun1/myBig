$(function () {
    

    getUser()
    function getUser() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            //请求头
          
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败',{icon:5})
                }
              render(res.data)
            }
            // complete: function (res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = './login.html'
            //     }
            // }
        })
    }


    function render(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎' + name)
        if (user.user_pic !== null) {
            //渲染图片头像,隐藏文字头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            var first = name[0].toUpperCase()
            $('.layui-nav-img').hide()
            $('.text-avatar').html(first).show()
        }
        
}

    // 退出登录功能
    $('#logout').on('click', function () {
        layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            
              location.href='/login.html'
            
            layer.close(index);
          });
    })
})