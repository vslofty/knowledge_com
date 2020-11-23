<template>
    <div class="feedback">
        <h3>您的参与将帮助我们改进产品与服务</h3>
        <div class="module-box">
            <p class="title">
                <span>请选择反馈类型 <i>*</i></span>
            </p>
            <a-radio-group v-model="params.type">
                <a-radio-button value="1">产品建议</a-radio-button>
                <a-radio-button value="2">BUG反馈</a-radio-button>
                <a-radio-button value="5">其他</a-radio-button>
            </a-radio-group>
        </div>
        <div class="module-box">
            <p class="title">
                <span>请详细描述您的问题、建议等 <i>*</i></span>
            </p>
            <a-textarea class="desc-content" v-model="params.content"
                placeholder="请详细描述您的问题、建议等等" :maxLength="500"
                :auto-size="{ minRows: 3, maxRows: 3 }"/>
        </div>
        <div class="module-box">
            <p class="title">
                <span>联系方式 <i>*</i></span>
            </p>
            <a-input placeholder="请输入您的联系方式（手机号码/微信号/QQ）" v-model="params.contact" :maxLength="20" />
        </div>
        <div class="module-box">
            <p class="title">
                <span>上传相关页面截图（选填）</span>
                <span>{{fileList.length}}/3</span>
            </p>
            <a-upload name="file" action="/api/universal/v1/feedback/uploadimage" list-type="picture-card"
                :file-list="fileList" :before-upload="beforeUpload" :headers="token?{'Authorization': 'Bearer '+token}:{}"
                @preview="handlePreview" @change="handleChange">
                <div v-if="fileList.length < 3">
                    <a-icon type="plus" />
                </div>
            </a-upload>
        </div>
        <a-button class="income-send freeuse" @click="addFeedBack" v-html="sendtext"></a-button>

        <a-modal title="图片预览" :visible="previewVisible" :footer="null" @cancel="previewVisible=false">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script>
import CommonAjax from "@/utils/http/modules/common.request.js";
import muTypes from "@/store/mutation-types.js";
import { mapGetters,mapMutations } from 'vuex';
import CompressImg from "@/utils/compressImg.js";
var ErrorTip={
    type: "请选择反馈类型",
    content: "请填写反馈内容",
    contact: "请填写联系方式",
}
export default {
    data(){
        return{
            queryType: 0,
            params: {
                type: "",
                content: "",
                contact: "",
            },
            fileList: [],
            previewVisible: false,
            previewImage: "",
            sendtext: "立即提交"
        }
    },
    computed: {
        ...mapGetters(['token']),
    },
    created(){
        this.sendtext = '<div><span>' + this.sendtext.split('').join('</span><span>') + '</span></div>';
        this.queryType = this.$route.query.type;
        this.updateToken(this.$route.query.token);
    },
    methods: {
        ...mapMutations({
            updateToken: muTypes.token,
        }),
        beforeUpload(file,fileList) {
            console.log(file,fileList)
            return new Promise((resolve, reject) => {
                this.transformFile(file).then(res => {
                    resolve(res);
                }).catch(err=>{
                    reject(false);
                })
            })
        },
        transformFile(file){
            return new Promise(async (resolve, reject) => {
                if(this.fileList.some(item=>item.name==file.name)){
                    this.$message.warning('已经上传过相同截图');
                    reject(false);
                }
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('仅支持JPEG、JPG、PNG格式');
                    reject(false);
                }else{
                    resolve(await CompressImg(file))
                }
            });
        },
        handlePreview(url) {
            this.previewImage = url;
            this.previewVisible = true;
        },
        handleChange(info) {
            try{
                info.fileList.length&&info.fileList.forEach(item=>{
                    item.uid=`vc-upload-${item.name.split('.')[0]}`;
                    if(item.status=='done'){
                        if(item.response&&item.response.isok){
                            item.thumbUrl=item.response.dataObj;
                        }else{
                            let response = JSON.parse(item.xhr.response);
                            if(response.isok){
                                item.thumbUrl=response.dataObj;
                            }
                        }
                    }
                });
                console.log(info.fileList)
                this.fileList = info.fileList.slice(0,3);
            }catch(err){
                console.log(err)
            }
        },
        async addFeedBack(){
            for(var key in this.params){
                if(key!='tail'&&!this.params[key].trim().length){
                    this.$antdMessage.warning(ErrorTip[key])
                    return;
                }
            }
            var result=[];
            this.fileList.forEach(item=>{
                result.push(item.thumbUrl||item.url);
            });
            this.params.imgurls = result.join(',');
            this.params.tail = this.queryType;
            try{
                await CommonAjax.addFeedback(this.params);
                this.$antdMessage.success("提交成功");
                this.params = {
                    type: "",
                    content: "",
                    contact: "",
                };
                this.fileList = [];
            } catch(error){
                error && this.$antdMessage.error(error);
            }
        }
    },
}
</script>

<style lang="less" scoped>
.feedback{
    min-width: 400px;
    max-width: 1080px;
    width: 100%;
    color: #202124;
    border: 1px solid #EFEFEF;
    border-radius: 4px;
    background: #fff;
    margin: 40px auto;
    padding: 50px 100px;
    h3{
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }
    .module-box{
        margin-bottom: 20px;
    }
    .title{
        padding: 18px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        i{
            color: #FF4A4A;
        }
    }
    /deep/ .ant-radio-group{
        display: flex;
        align-items: center;
        .ant-radio-button-wrapper{
            width: 140px;
            height: 44px;
            color: #202124;
            font-size: 14px;
            border-radius: 4px;
            margin-right: 20px;
            border: 1px solid #202124;
            display: flex;
            justify-content: center;
            align-items: center;
            &:not(:first-child)::before{
                background: none;
            }
        }
        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
            color: #FFA800;
            border: 1px solid #FFA800;
            background: #FFF5E3;
            box-shadow: none;
        }
    }
    /deep/ .ant-input{
        height: 38px;
        padding: 0;
        border: none;
        border-bottom: 1px solid #EFEFEF;
    }
    .desc-content{
        border: 1px solid #EFEFEF;
        padding: 10px;
        line-height: 1.5;
        border-radius: 4px;
        resize: none;
    }
    /deep/ .ant-input:focus{
        box-shadow: none;
    }
    .income-send{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 400px;
        height: 50px;
        color: #252525;
        font-size: 15px;
        font-weight: bold;
        border: none;
        outline: none;
        margin: 0 auto;
        background: linear-gradient(90deg, #FFE156 0%, #FFA800 100%);
        border-radius: 40px;
    }
}
</style>