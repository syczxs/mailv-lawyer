import plupload from 'plupload'
import {submitSuccessFirst,submitSuccessSecond} from './api'

var accessid = ''
var accesskey = ''
var host = ''
var policyBase64 = ''
var signature = ''
var callbackbody = ''
var filename = ''
var key = ''
var expire = 0
var g_object_name = ''
var g_object_name_type = ''
var timestamp=''
var now = timestamp = Date.parse(new Date()) / 1000; 
//新增指定子文件夹
var g_dirname = ''
var originalName=''

//
var pos=''
var suffix =''
var tmp_name=''
var uploader={}


//1命名方式
function check_object_radio() {
    g_object_name_type = 'random_name';

}

//发送签名请求
function send_request()
{
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    if (xmlhttp!=null)
    {
        // serverUrl是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
        var serverUrl = 'https://www.mailvjt.com/oss'
		
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        return xmlhttp.responseText
    }
    else
    {
        alert("浏览器不支持.");
    }
};



//拼接签名
function get_signature()
{
    // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲。
    now = timestamp = Date.parse(new Date()) / 1000; 
    if (expire < now + 3)
    {
        var body = send_request()
        var obj = eval ("(" + body + ")");
        host = obj['host']
        policyBase64 = obj['policy']
        accessid = obj['accessid']
        signature = obj['signature']
        expire = parseInt(obj['expire'])
        callbackbody = obj['callback'] 
        key = obj['dir']+g_dirname
        return true;
       
    }
    return false;
};


//上传至oss
////key = obj['dir']
//是否获取两次后缀

function set_upload_param(up, filename, ret)
{
    if (ret == false)
    {
        ret = get_signature()
    }
    g_object_name = key;
    //key = obj['dir']
    if (filename != '') { suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    var new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : callbackbody,//服务端签名直传
        'signature': signature,
    };
    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });
    up.start();
}








//获取后缀
function get_suffix(filename) {
     pos = filename.lastIndexOf('.')
     suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
   
    return suffix;
}


function random_string(len) {
    　　len = len || 32;
    　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
    　　var maxPos = chars.length;
    　　var pwd = '';
    　　for (var i = 0; i < len; i++) {
        　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
    
function calculate_object_name(filename)
    {
        if (g_object_name_type == 'local_name')
        {
            g_object_name += "${filename}"
        }
        else if (g_object_name_type == 'random_name')
        
        {
            suffix = get_suffix(filename)
            g_object_name = key + random_string(10) + suffix
            originalName=filename
        }
        
        return ''
    }
 
//上传成功后的文件名
function get_uploaded_object_name(filename)
    {
        
        if (g_object_name_type == 'local_name')
        {
            tmp_name = g_object_name
            tmp_name = tmp_name.replace("${filename}", filename);
            return tmp_name
        }
        else if(g_object_name_type == 'random_name')
        {
            
            return g_object_name
        }
    }


function makeplo(dir,orderId,lawyerId,type){
    g_dirname=dir
    uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'selectfiles',//触发弹窗元素的id 
        //multi_selection: false,
        container: document.getElementById('container'),//用来指定Plupload所创建的html结构的父容器，默认为前面指定的browse_button的父元素。该参数的值可以是一个元素的id,也可以是DOM元素本身
        flash_swf_url : '/node_modules/plupload/js/Moxie.swf',//?
        silverlight_xap_url : '/node_modules/plupload/js/Moxie.xap',//?
        
        url : 'https://oss-cn-hangzhou.aliyuncs.com',
    
        filters: {
            mime_types : [ //只允许上传图片和zip文件
            // { title : "Image files", extensions : "jpg,gif,png,bmp" }, 
            // { title : "Zip files", extensions : "zip,rar" },
            { title : "Word files", extensions : "doc,text,docx" },
            ],
            max_file_size : '10mb', //最大只能上传10mb的文件
            prevent_duplicates : true //不允许选取重复文件
        },
        
    
        init:{
    
            //当Init事件发生后触发
        
            PostInit: function() {
               
                document.getElementById('ossfile').innerHTML = '';
                document.getElementById('postfiles').onclick = function() {
                set_upload_param(uploader, '', false);
                return false;
                };
            },



            //当队列中的某一个文件正要开始上传前触发，file为触发此事件的文件对象
            BeforeUpload: function(up, file) {
                check_object_radio();
                set_upload_param(up, file.name, true);
            },

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                    +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                    +'</div>';
                });
            },
            UploadProgress: function(up, file) {
                var d = document.getElementById(file.id);
                d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                var prog = d.getElementsByTagName('div')[0];
                var progBar = prog.getElementsByTagName('div')[0]
                progBar.style.width= 2*file.percent+'px';
                progBar.setAttribute('aria-valuenow', file.percent);
            },
            
    
    
    
            //如果要知道文件上传成功后的文件名，可以用Plupload调用FileUploaded事件获取，如下所示：
            FileUploaded: function(up, file, info) {
                if (info.status == 200)
                {
                    // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name) + ' 回调服务器返回的内容是:' + info.response;
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功'  ;
                    if(type==='forLawyer'){
                        uploader.destroy()
                        submitSuccessFirst({
                            orderId:orderId,
                            fileName:originalName,
                            fileUrl:'https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/'+g_object_name
    
                        }).then(res=>{
                            console.log(res)
                        }).catch(err=>{
                            console.log(err)
                        })
                    }if(type==='forUser'){
                        uploader.destroy()
                        
                        submitSuccessSecond({
                            lawyerId:lawyerId,
                            orderId:orderId,
                            fileName:originalName,
                            fileUrl:'https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/'+g_object_name
    
                        }).then(res=>{
                            console.log(res)
                        }).catch(err=>{
                            console.log(err)
                        })

                    }
                    
                }
                else if (info.status == 203)
                {
                    uploader.destroy()
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传到OSS成功，但是oss访问用户设置的上传回调服务器失败，失败原因是:' + info.response;
                }
                else
                {
                    uploader.destroy()
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                } 
            },

            Error: function(up, err) {
                if (err.code == -600) {
                    document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
                }
                else if (err.code == -601) {
                    document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
                }
                else if (err.code == -602) {
                    document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
                }
                else 
                {
                    document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                }
            }
    
    
        }
    
    
        });
    uploader.init();


}
//创建ulpload示例
export function upFile(dir,orderId,lawyerId,type){
    return new Promise((resolve, reject)=>{
        makeplo(dir,orderId,lawyerId,type)
        resolve(g_object_name,originalName)
    })
} 
export {g_object_name,originalName} 

export function delet(){
    uploader.destroy()
}




