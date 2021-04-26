$(function () {
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon:5})
                }
                // $('[name=id]').val(res.data.id)
                // $('[name=username]').val(res.data.username)
                // $('[name=nickname]').val(res.data.nickname)
                // $('[name=email]').val(res.data.email)
                layui.form.val('formUserInfo',res.data)

            }
        })
//         var data = {
//             username = $('.layui-form [name=username]').val().trim(),
//             nickname = $('.layui-form [name=nickname]').val().trim(),
// }
//         $.ajax({
//             method: 'post',
//             url: '/my/userinfo',
//             data:
//         })
    }


    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    //用户资料表单项校验
    layui.form.verify({
        nickname: function (value,item) {
            if (value.length > 6) {
                return '昵称不能超过6个字符'
            }
        }
    })

//用户

})