import $ from "jquery";
import COS from "COS";

/*
初始化话腾讯云 API
const myuploader = new VzanUpload(zbid);

绑定input事件
@change=uploadImage

原生事件对象 Event
async uploadImage (event) {
  try {
    const imageData = await myuploader.uploadImage(event, {
      fileTypes: ['jpeg', 'jpg', 'png', 'bmp'] (默认值，可选)
      maxSize: 30 (默认值，可选)
      onProgress: sizePro => console.log(sizePro + '%'), // 上传进度（可选）
    });
    // 上传成功的值
    imageData {
      src: "https://i2.vzan.cc/upload/image/jpeg/20200414/68589f4eda8e4d02a7d2614d5a93c5b5.jpeg",
      fileType: "image/jpeg",
      fileExe: "jpeg",
      fileSize: 24336,
      fileSizeFormat:"0.02Mb"
    }
  } catch (error) {
    // 上传失败错误提示
    error && this.$elementMessage.error(error);
  }
}
*/


export default class VzanUpload {
  constructor (zbid) {
    this.Region = "ap-guangzhou";
    // 其他存储桶
    this.Bucket = "i3-1251575313";
    this.Host = "https://i3.vzan.cc/";
    // 图片存储桶
    this.imageBucket = "i2-1251575313";
    this.imageHost = "https://i2.vzan.cc/";
  
    this.zbid = zbid;
    this.filename = '';
    this.cos = new COS();
  }

  // 获取上传文件签名
  getAuthorization () {
    var url = `/liveajax/Credential?zbid=${this.zbid}&prefix=${this.filename}`;
    return new Promise((rseolve, reject) => {
      $.ajax({ url, method: 'GET', dataType: 'JSON', success: rseolve, error: reject });
    })
  }

  // 验证上传文件
  valideFileConfig (fileType, fileExe, config) {
    let msg = '';
    let isImage = false;
    if (fileType.includes('image')) { // 图片
      isImage = true;
      const fileTypesArr = config.fileTypes || ['jpeg', 'jpg', 'png', 'bmp']
      if (!fileTypesArr.includes(fileExe)) {
        msg = `该文件类型不支持，请上传${fileTypesArr.join(',')}文件`;
      }
    } else if (config.fileTypes && config.fileTypes.includes('excel')) {
      if (!fileExe.includes('sheet') && !fileExe.includes('excel')) { // excel 表格
        msg = `该文件类型不支持，请上传 Excel xls 文件`;
      }
    } else { // 视频文件
      const fileTypesArr = config.fileTypes || ['mp4']
      if (!fileTypesArr.includes(fileExe)) {
        msg = `该文件类型不支持，请上传${fileTypesArr.join(',')}文件`;
      }
    }
    return { msg, isImage };
  }

  // 上传图片
  uploadImage (inputEvent, config = {}) {
    return this.uploadFile(inputEvent, config, 'image');
  }

  // 上传文件
  async uploadFile (inputEvent, config = {}) {
    const fileObject = inputEvent.target.files[0];
    if (!fileObject) {
      throw '找不到改文件';
    }
    const fileType = fileObject.type;
    let fileExe = fileType.split('/')[1];
    const { msg, isImage } = this.valideFileConfig(fileType, fileExe, config);
    if (msg) {
      throw msg;
    }
    var filesize = parseInt(fileObject.size / 1024 / 1024);
    const maxSize = config.maxSize || 100;
    if (filesize > maxSize) {
      throw `上传文件不能超过${maxSize}Mb`;
    }
    try {
      // excel 文件格式 扩展名转换
      if (fileExe.includes('excel') || fileExe.includes('sheet')) {
        fileExe = 'xls';
      }
      // 随机文件名
      this.filename =`${Math.random().toString(36).substr(2)}.${fileExe}`;
      // 获取签名
      const auth = await this.getAuthorization();
      this.cos.options.SecretId = auth.TmpSecretId;
      this.cos.options.SecretKey = auth.TmpSecretKey;
      this.cos.options.XCosSecurityToken = auth.Token;
      this.cos.options.ExpiredTime = auth.ExpiredTime;
      this.filename = auth.folder;
    } catch (error) {
      throw '上传路中出错了，请稍候再试试~';
    }
    return new Promise((rseolve, reject) => {
      inputEvent.target.value = null;
      $(event.target.id).val('');
      const fromType = inputEvent.target.dataset.type;
      // 本地调试会跟腾讯云跨域，所以本地则返回固定值
      if (location.host.includes('local') || location.host.includes('192.168.')) {
        let res = {
          src: "https://i2.vzan.cc/upload/image/jpeg/20200414/68589f4eda8e4d02a7d2614d5a93c5b5.jpeg",
          fileType: "image/jpeg",
          fileExe: "jpeg",
          fromType,
          fileSize: 24336,
          fileSizeFormat:"0.02Mb"
        }
        if(config.fileTypes == 'mp4'){
          res.src = 'https://j.weizan.cn/zhibo/userlivecontent/vzan/video/vzan.mp4';
        }
        else if(config.fileTypes == 'mp3'){
          res.src = 'http://i3.vzan.cc/mp3/20200831/3bbcbcd493d040c391a678b691613ff9/v.f1010.mp3';
        }
        rseolve(res);
      } else {
        // 切片上传
        this.cos.sliceUploadFile({
          Bucket: isImage ? this.imageBucket : this.Bucket,
          Region: this.Region,
          Key: this.filename,
          Body: fileObject, // 文件对象
          // onTaskReady return taskId
          onProgress: (progressData) => {// 进度
            var progress = parseInt(progressData.percent * 100);
            config.onProgress && config.onProgress(progress);
          }
        }, (err, data) => {
          if (err) {
            console.log(err)
            reject('上传失败请重试');
          } else {
            const imageUploadUrl = (isImage ? this.imageHost : this.Host) + data.Key;
            const imageInfo = {
              src: imageUploadUrl,
              fileType,
              fileExe,
              fromType,
              fileSize: fileObject.size,
              fileSizeFormat: `${(fileObject.size / 1024 / 1024).toFixed(2)}Mb`
            };
            rseolve(imageInfo);
          }
        });
      }
    });
  }
}
