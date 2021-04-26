$(function () {
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview:'.img-preview'
    }
    $image.cropper(options)
//点击上传按钮触发文件选择
    $('#btnChooseImage').on('click', function () {
        $('#file').click()

    })
    $('#file').on('change', function (e) {
        var fileList = e.target.files
        if (fileList.length == 0) {
            return layui.layer.msg('请选择文件')
        }
        var imgUrl = URL.createObjectURL(fileList[0])
        $image
            .cropper('destroy')
            .attr('src', imgUrl)
            .cropper(options)

    })
    
    $('#btnUpload').on('click', function () {
        var fileList = $('#file')[0].files
        if (fileList.length === 0) {
            return layui.layer.msg('请选择头像')
        }

        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height:100
            })
            .toDataURL('image/png')
        
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon:5})
                }
                layui.layer.msg(res.message, { icon: 6 }, function () {
                    window.parent.getUser()
                })
            }
        })
    })
})