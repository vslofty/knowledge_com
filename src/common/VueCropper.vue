<template>
  <div>
    <el-button
      size="small"
      type="success"
      class="ml10"
      @click="clickUploadFunc(uploadsInfo.type)"
      >{{ uploadsInfo.btnText }}</el-button
    >
    <input
      type="file"
      ref="uploadsFile"
      id="uploads"
      accept="image/png, image/jpeg, image/gif, image/jpg"
      @change="uploadImg($event, 1)"
      v-show="false"
      class="el-button"
    />
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog
      title="图片裁剪"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <span>
        <el-row> </el-row>
        <el-row>
          <el-col :span="15">
            <!-- 裁剪 -->
            <vueCropper
              style="width:100%;height:300px"
              ref="cropper"
              :img="options.imgUrl"
              :autoCrop="options.autoCrop"
              :fixedBox="options.fixedBox"
              :canMoveBox="options.canMoveBox"
              :autoCropWidth="uploadsInfo.cutWidth"
              :autoCropHeight="uploadsInfo.cutHeight"
              :centerBox="options.centerBox"
              @realTime="realTime"
            >
            </vueCropper>
          </el-col>
          <el-col :span="9">
            <h2 align="center">{{ uploadsInfo.btnText }}预览</h2>
            <div class="show-preview">
              <div :style="previews.div" class="preview">
                <img :src="previews.url" :style="previews.img" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="footerBtn" align="center">
          <el-button
            type="primary"
            size="small"
            class="f14"
            @click="cut('blob')"
            >确认</el-button
          >
          <el-button
            type="primary"
            size="small"
            class="f14"
            @click="handleClose"
            >取消</el-button
          >
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
  uploadsInfo: {
    'cutWidth': 200,//截图框宽度
    'cutHeight': 200,//截图框高度
    'imgIsRound': true,
    'btnText': '上传直播间图标'
  }
  **/
import tools from "@/lib/tools";
export default {
  props: {
    uploadsInfo: Object
  },
  data() {
    return {
      dialogVisible: false,
      options: {
        imgUrl: "",
        autoCrop: true, //默认生成截图框
        fixedBox: true, //固定截图框大小
        canMoveBox: false, //截图框不能拖动
        centerBox: false //截图框被限制在图片里面
      },
      previews: {}, //实时预览图数据
      fileName: "", //本机文件地址
      uploadType: ""
    };
  },
  methods: {
    clickUploadFunc(type) {
      console.log(type);
      this.uploadType = type;
      this.$refs.uploadsFile.click();
      this.$bus.$emit("closeFullScreen",false);
    },
    //控制弹出层关闭
    handleClose() {
      this.uploadType = "";
      this.dialogVisible = false;
      this.$refs.uploadsFile.value = "";
    },
    //实时预览
    realTime(data) {
      this.uploadsInfo.imgIsRound ? (data.div["border-radius"] = "50%") : "";
      this.previews = data;
    },
    //选择本地图片
    uploadImg(e, num) {
      console.log(e, num);
      var file = e.target.files[0];
      this.fileName = file.name;
      if (!e.target.value.trim()) {
        return false;
      } else if (
        !/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)
      ) {
        tools.toast(
          this,
          "图片类型必须是.gif,jpeg,jpg,png,bmp中的一种",
          "warning"
        );
        return false;
      }
      if (!this.beforeUploadFunc(file)) return;
      this.dialogVisible = true;
      console.log(e.target.result);
      //fileReader 接口，用于异步读取文件数据
      var reader = new FileReader();
      reader.readAsDataURL(file); //重要 以dataURL形式读取文件
      reader.onload = e => {
        let data = e.target.result;
        this.options.imgUrl = data;
      };
    },
    beforeUploadFunc(file) {
      console.log(file, file.size);
      var size = Number(Math.floor(file.size / 1024 / 1024).toFixed(2));

      if (this.uploadType == "LogoImg" && size > 2) {
        tools.toast(this, "图片不可大于2M", "warning");
        return false;
      }
      if (this.uploadType == "CoverImg" && size > 5) {
        tools.toast(this, "图片不可大于5M", "warning");
        return false;
      }
      return true;
    },
    //确认截图,上传
    cut(type) {
      console.log(type);
      var _this = this;
      var formData = new FormData();
      this.$refs.cropper.getCropBlob(res => {
        console.log(res);
        var img = window.URL.createObjectURL(res);
        console.log(img);
        //res是裁剪后图片的bolb对象
        formData.append("file", res, this.fileName);

        this.$api.live
          .uploadImgByType(formData, {
            contentType: false,
            processData: false,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
            console.log(res);
            _this.$emit("change", this.uploadType, res);
            _this.dialogVisible = false;
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
/* 弹性布局 水平居中 */
.show-preview {
  display: flex;
  justify-content: center;
}

.preview {
  overflow: hidden;
  border: 1px solid #ccc;
  background: #ccc;
}
.footerBtn {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>