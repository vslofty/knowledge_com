<template>
    <div class="mobile-help-detail">
        <mobile-header :showwhitebg="true"></mobile-header>
        <div class="detail">
            <h2 class="title">{{info.title}}</h2>
            <p class="time">更新时间：{{info.lastEditTime}}</p>
            <div class="article-content" v-html="info.context"></div>
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/common/MobileHeader.vue';
import CommonAjax from "@/utils/http/modules/common.request.js";
export default {
    data(){
        return {
            info: {}
        }
    },
    components: {
        MobileHeader
    },
    mounted(){
        console.log(this.$route)
        this.getArticleDetails(this.$route.query.id)
    },
    methods: {
        async getArticleDetails(id){
            try{
                let res = await CommonAjax.getArticleDetail({
                    articleid: id
                });
                console.log(res)
                this.info = res.dataObj;
            }catch(error){
                error&&this.$antdMessage.error(error)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.mobile-help-detail{
    min-height: 100vh;
    padding-top: 0.88rem;
    .detail{
        padding: 0.2rem 0.4rem;
        .title{
            color: #202124;
            font-size: 0.48rem;
            font-weight: bold;
            line-height: 1.6;
            margin: 0.2rem 0 0.1rem;
        }
        .time{
            color: #B8BABF;
            font-size: 0.24rem;
            padding-bottom: 0.4rem;
            border-bottom: 1px solid #F5F6F7;
        }
        /deep/ .article-content{
            padding: 0.32rem 0;
            font-size: 0.3rem;
            p{
                color: #60646B;
                margin-bottom: 0.24rem;
                line-height: 1.8;
            }
            img{
                max-width: 100%;
                margin-bottom: 0.24rem;
                border-radius: 0.12rem;
            }
            h3{
                font-size: 0.38rem;
                font-weight: bold;
            }
            td{
                padding: 0.1rem;
            }
            ul li{
                font-weight: bold;
            }
            ol li{
                font-size: 0.28rem;
            }
        }
    }
}
</style>