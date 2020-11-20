<template>
    <div class="mobile-help">
        <mobile-header :showwhitebg="true"></mobile-header>
        <div class="help-model" v-for="item of menuinfo" :key="item.Id">
            <!-- <router-link :to="`/mobile/helpdetail/?id=${item.Id}&name=${item.Name}`">
                <h4>
                    <span>{{item.Name}}</span>
                    <img src="../../assets/right_arrow_icon.png"/>
                </h4>
            </router-link> -->
            <div>
                <h4>{{item.Name}}</h4>
                <ul>
                    <template v-if="item.Articles&&item.Articles.length">
                        <router-link tag="li" :to="`/mobile/helpdetail/?id=${menuitem.Id}&name=${item.Name}`" v-for="menuitem of item.Articles" :key="menuitem.Id">
                            <span>{{menuitem.Title}}</span>
                            <img src="../../assets/right_arrow_icon.png"/>
                        </router-link>
                    </template>
                    <template v-if="!item.Articles||!item.Articles.length">
                        <li>
                            <span>暂无文章</span>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/common/MobileHeader.vue';
import CommonAjax from "@/utils/http/modules/common.request.js";
export default {
    data(){
        return {
            menuinfo: {},
        }
    },
    components: {
        MobileHeader
    },
    methods: {
        async getCatalogList(){
            try{
                let res = await CommonAjax.getCatalog();
                console.log(res)
                this.menuinfo = res.dataObj.filter(item=>item.Articles&&item.Articles.length);
            }catch(error){
                error&&this.$antdMessage.error(error)
            }
        }
    },
    mounted(){
        this.getCatalogList();
    }
}
</script>

<style lang="less" scoped>
.mobile-help{
    min-height: 100vh;
    padding-top: 0.88rem;
    padding-bottom: 0.2rem;
    background: #F5F6F7;
    .help-model{
        margin: 0.2rem;
        background: #fff;
        border-radius: 0.12rem;
        h4{
            height: 1.3rem;
            line-height: 1.3rem;
            margin: 0 0.4rem;
            color: #202124;
            font-size: 0.3rem;
            font-weight: bold;
            border-bottom: 1px solid #F5F6F7;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        ul{
            margin: 0 0.4rem;
            padding: 0;
            li{
                list-style: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #60646B;
                font-size: 0.28rem;
                font-weight: bold;
                height: 1.28rem;
                border-top: 1px solid #F5F6F7;
                margin-left: 0.3rem;
                &:first-child{
                    border-top: none;
                }
                &>span{
                    margin-right: 0.2rem;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &>img{
                    width: 0.14rem;
                }
            }
        }
    }
}
</style>