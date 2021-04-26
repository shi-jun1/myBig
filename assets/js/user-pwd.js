$(function () {
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须是6-12位非空'
        ],
        repwd: function (value, item) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        npwd: function (value, item) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码必须一致'
            }
        }

    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return  layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })
                $('.layui-form')[0].reset()
            }
        })
    })

})