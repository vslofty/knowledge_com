<template>
    <div class="mobile-feedback" :style="queryType==1000&&'margin-top: 0.88rem;border-top:2px solid #F5F6F7;'">
        <mobile-header :showwhitebg="true" v-if="queryType==1000"></mobile-header>
        <div class="module-box">
            <p class="title"><span>请选择反馈类型</span> <i>*</i></p>
            <a-radio-group v-model="params.type">
                <a-radio-button value="1">产品建议</a-radio-button>
                <a-radio-button value="2">BUG反馈</a-radio-button>
                <a-radio-button value="5">其他</a-radio-button>
            </a-radio-group>
        </div>
        <div class="module-box">
            <p class="title"><span>请详细描述您的问题、建议等</span> <i>*</i></p>
            <div class="desc-box">
                <a-textarea class="desc-content" v-model="params.content"
                placeholder="请详细描述您的问题、建议等等" placeholder-style="color:#aaa;" :maxLength="500"
                :auto-size="{ minRows: 4, maxRows: 4 }"/>
                <a-upload name="file" action="/api/universal/v1/feedback/uploadimage" list-type="picture-card"
                    :headers="token?{'Authorization': 'Bearer '+token}:{}" :file-list="fileList" :before-upload="beforeUpload" :showUploadList="{showPreviewIcon:false, showRemoveIcon:true}" @change="handleChange">
                    <div v-if="fileList.length < 3">
                        <a-icon type="plus" />
                        <div style="font-size: 0.2rem;">添加图片</div>
                    </div>
                </a-upload>
            </div>
        </div>
        <div class="module-box">
            <p class="title"><span>联系方式</span> <i>*</i></p>
            <a-input placeholder="请留下您的联系方式，我们将会尽快联系您！" v-model="params.contact" :maxLength="20" />
        </div>
        <a-button class="income-send" @click="addFeedBack">立即提交</a-button>
    </div>
</template>

<script>
import MobileHeader from '@/common/MobileHeader.vue';
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
        }
    },
    components: {
        MobileHeader
    },
    created(){
        console.log(this.$route)
        this.queryType = this.$route.query.type;
        this.updateToken(this.$route.query.token);
    },
    computed: {
        ...mapGetters(['token']),
    },
    methods: {
        ...mapMutations({
            updateToken: muTypes.token,
        }),
        beforeUpload(file) {
            return new Promise((resolve, reject) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('仅支持JPEG、JPG、PNG格式');
                    reject(false);
                }
                const isLt15M = file.size / 1024 / 1024 < 15;
                if (!isLt15M) {
                    this.$message.error('截图不能超过15M');
                    reject(false);
                }
                resolve(isJpgOrPng && isLt15M);
                // this.transformFile(file).then(res => {
                //     resolve(res);
                // }).catch(err=>{
                //     reject(false);
                // })
            })
        },
        transformFile(file){
            return new Promise(async (resolve, reject) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('仅支持JPEG、JPG、PNG格式');
                    reject(false);
                }else{
                    resolve(await CompressImg(file))
                }
            });
        },
        handleChange(info) {
            try{
                info.fileList.length&&info.fileList.forEach(item=>{
                    // var name=item.name.split('.')[0];
                    // item.uid=`vc-upload-${name!='image'?name:item.lastModified}`;
                    if(item.status=='done'){
                        if(item.response&&item.response.isok){
                            item.thumbUrl=item.response.dataObj;
                        }else{
                            let response = JSON.parse(item.xhr.response);
                            if(response.isok){
                                item.thumbUrl = response.dataObj;
                            }
                        }
                    }
                });
                this.fileList = info.fileList.slice(0,3);
            }catch(err){
                console.log(err)
            }
        },
        async addFeedBack(){
            for(var key in this.params){
                if(!this.params[key].trim().length){
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
    }
}
</script>

<style lang="less" scoped>
.mobile-feedback{
    width: 100%;
    padding: 0.2rem 0.4rem ;
    color: #353535;
    .module-box{
        margin-bottom: 0.2rem;
    }
    .title{
        padding: 0.3rem 0;
        display: flex;
        align-items: center;
        font-size: 0.36rem;
        font-weight: bold;
        i{
            color: #FF4A4A;
            margin-left: 0.1rem;
        }
    }
    /deep/ .ant-radio-group{
        display: flex;
        justify-content: space-between;
        .ant-radio-button-wrapper{
            width: 2.1rem;
            height: 0.9rem;
            color: #666;
            font-size: 0.3rem;
            border-radius: 0.04rem;
            border: none!important;
            outline: none;
            background: #F9F9F9;
            display: flex;
            justify-content: center;
            align-items: center;
            &:not(:first-child)::before{
                width: 0;
                background: none;
            }
        }
        .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
            color: #FFA800;
            background: #FFF7E8;
            box-shadow: none;
        }
    }
    /deep/ .ant-input{
        height: 1.1rem;
        padding: 0 0.28rem;
        font-size: 0.3rem;
        border: none;
        background: #F9F9F9;
        &:focus{
            box-shadow: none;
        }
    }
    .desc-box{
        width: 100%;
        padding: 0.32rem 0.32rem 0.1rem;
        background: #F9F9F9;
        border-radius: 0.2rem;
        .desc-content{
            font-size: 0.3rem;
            margin-bottom: 0.32rem;
            border: none;
            padding: 0;
            line-height: 1.5;
            resize: none;
        }
    }
    .income-send{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 1.1rem;
        color: #252525;
        font-size: 0.32rem;
        font-weight: bold;
        margin-top: 0.5rem;
        border: none;
        outline: none;
        background: linear-gradient(90deg, #FFE156, #FFA800);
        box-shadow: 0 0.1rem 0.4rem 0 rgba(255, 180, 0, 0.2);
        border-radius: 0.2rem;
    }
}
</style>