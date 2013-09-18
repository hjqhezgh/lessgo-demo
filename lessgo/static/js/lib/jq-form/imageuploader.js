/*****
 * 图片上传预览控件、
 */
var ImageUploader = function(dom){

    this.container = $(dom);

    this.init();
}



ImageUploader.prototype = {

    fileInput : '${fieldDesc}：<input id="fileToUpload" name="${fieldName}" type="file" data-desc="${fieldDesc}" /><input type="hidden" data-field name="${fieldName}" /><span class="img-pre"><img src="/img/default_image.gif" width="100" height="100" /></span>',

    init : function(){

        this.render();

        this.bind();
    },

    render : function(){

        var mythis = this;

        mythis.container.append(juicer(mythis.fileInput,{
            fieldName:mythis.container.attr('field-name'),
            fieldDesc:mythis.container.attr('field-desc')
        }));
    },

    bind : function(){
        var mythis = this;

        mythis.container.on('change','input[type=file]',function(){
            var thisInput = $(this);

            if ($(this).val()){
                $.ajaxFileUpload({
                    url:"/imgageuplaod",
                    secureuri:false,
                    fileElementId:'fileToUpload',//文件上传的id属性
                    dataType: 'json',//返回值类型为json
                    success: function (data, status){//服务器成功响应处理函数
                        if(data.success){
                            mythis.container.find(":hidden").val(data.tmpfile);
                            mythis.container.find("img").attr("src",data.tmpfile);
                        }else{
                            alert('图片上传视频，请重新上传');
                        }
                    },
                    error: function (data, status, e) {//服务器响应失败处理函数
                        alert('图片上传视频，请重新上传');
                    }
                });
            }

            thisInput.val("");
        });
    }

}