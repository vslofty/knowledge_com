<template>
    <div class="help">
        <headers current="help" :showwhitebg="true"></headers>
        <div class="container">
            <div class="left" :style="`height:${menuHeight}px;`">
                <div class="box">
                    <a-menu mode="inline" :default-selected-keys="selectkey" :default-open-keys="openKeys" :style="`width:${menuWidth}px;`" @click="onOpenChange" v-if="menuinfo&&menuinfo.length">
                        <template v-for="item of menuinfo">
                            <a-menu-item :key="item.Id" v-if="!(item.Articles&&item.Articles.length)">
                                <span style="font-weight:bold;color:#252525;">{{item.Name}}</span>
                            </a-menu-item>
                            <a-sub-menu :key="item.Id" v-if="item.Articles&&item.Articles.length">
                                <span slot="title"><span>{{item.Name}}</span></span>
                                <template v-for="submenu of item.Articles">
                                    <a-menu-item :key="submenu.Id">
                                        <span>{{submenu.Title}}</span>
                                    </a-menu-item>
                                </template>
                            </a-sub-menu>
                        </template>
                    </a-menu>
                </div>
            </div>
            <div class="right" ref="rightbox" :style="`height:${menuHeight}px;`">
                <div class="main-content">
                    <h2 class="title">{{contentInfo.title}}</h2>
                    <span class="timer" v-show="contentInfo.lastEditTime">更新时间：{{contentInfo.lastEditTime}}</span>
                    <div class="content" v-html="contentInfo.context"></div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import headers from '@/common/Header.vue'
import CommonAjax from "@/utils/http/modules/common.request.js";
import menu from './../static/menu.js';
import help from './../static/help.js';

export default {
    data(){
        return{
            menuinfo: [],
            contentInfo: {},
            selectkey: [],
            openKeys: [],
            menuWidth: 0,
            menuHeight: 0,
        }
    },
    components: {
        headers
    },
    mounted(){
        console.log(this.$route,menu)
        this.$nextTick(()=>{
            this.getCatalogList(this.$route.params.id);
            var width=256;var height=100;
            if((document.documentElement.offsetWidth || document.body.offsetWidth)<=1000){
                width=210;
                height=80;
            }
            this.menuWidth = width;
            this.menuHeight = (document.documentElement.offsetHeight || document.body.offsetHeight)-height;
            
            window.onresize = () => {
                return (() => {
                    var width=256;var height=100;
                    if((document.documentElement.offsetWidth || document.body.offsetWidth)<=1000){
                        width=210;
                        height=80;
                    }
                    this.menuWidth = width;
                    this.menuHeight = (document.documentElement.offsetHeight || document.body.offsetHeight)-height;
                })();
            };
        })
    },
    methods: {
        async getCatalogList(articleId){
            try{
                let res = await CommonAjax.getCatalog();
                console.log(res)
                var Ids = [];
                res.dataObj.length&&res.dataObj.forEach(item=>{
                    console.log(articleId,item.Id==articleId,item.Articles.some(art=>art.Id==articleId))
                    if(articleId&&item.Id==articleId){
                        this.selectkey.push(item.Id);
                    }else if(articleId&&item.Articles.some(art=>art.Id==articleId)){
                        var index=item.Articles.findIndex(art=>art.Id==articleId);
                        this.selectkey.push(item.Articles[index].Id);
                    }
                    Ids.push(item.Id);
                });
                (articleId||Ids.length)&&this.getArticleDetails(articleId||Ids[0]);
                this.openKeys = Ids;
                this.menuinfo = res.dataObj;
            }catch(error){
                error&&this.$antdMessage.error(error)
            }
        },
        async getArticleDetails(id){
            try{
                let res = await CommonAjax.getArticleDetail({
                    articleid: id
                });
                console.log(res)
                this.contentInfo = res.dataObj||{};
            }catch(error){
                error&&this.$antdMessage.error(error)
            }
        },
        onOpenChange(item, key, keyPath) {
            console.log(item, key, keyPath)
            this.getArticleDetails(item.key);
            this.$router.push(`/help/${item.key}`);
        },
    }
}
</script>

<style lang="less" scoped>
.help{
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, #FDFEFE 0%, #F5F6F7 100%);
    padding-top: 60px;
    display: flex;
    flex-direction: column;
    .container{
        padding-top: 40px;
        flex: 1;
        display: flex;
    }
    .fixwidth{
        width: 256px;
    }
    .left{
        width: 256px;
        height: 100%;
        display: flex;
        border-radius: 4px;
        overflow: hidden;
        .box{
            height: 100%;
            background: #fff;
            overflow-x: hidden;
            overflow-y: auto;
            &::-webkit-scrollbar{
              width: 0;
              height: 0;
              overflow: hidden;
            }
        }
        /deep/ .ant-menu{
            border-right: none;
        }
        /deep/ .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title{
            height: 64px;
            line-height: 64px;
            margin: 0;
            font-weight: bold;
        }
        /deep/ .ant-menu-sub.ant-menu-inline > .ant-menu-item{
            height: 50px;
            line-height: 50px;
            margin: 0;
        }
        /deep/ .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected,
        /deep/ .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected span{
            background: linear-gradient(270deg, rgba(255, 168, 0, 0) 0%, rgba(255, 168, 0, 0.1) 100%);
            color: #FFA800!important;
            font-weight: bold;
        }
        /deep/ .ant-menu-inline .ant-menu-item::after{
            left: 0;
            border-right: none;
            border-left: 4px solid #FFA800;
        }
        /deep/ .ant-menu-inline .ant-menu-selected::after,/deep/ .ant-menu-inline .ant-menu-item-selected::after{
            transform: scaleY(0.5);
        }
        /deep/ .ant-menu-item:hover,/deep/ .ant-menu-item-active,/deep/ .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,/deep/ .ant-menu-submenu-active,/deep/ .ant-menu-submenu-title:hover,
        /deep/ .ant-menu-submenu-selected{
            color: #252525;
        }
        /deep/ .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
        /deep/ .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after{
            background: linear-gradient(to right, #FFA800, #FFA800);
        }
    }
    .right{
        margin-left: 16px;
        padding: 0 50px;
        flex: 1;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
        .main-content{
            height: 100%;
            overflow: auto;
            .title{
                font-size: 28px;
                font-weight: bold;
                color: #252525;
                margin-top: 40px;
                margin-bottom: 16px;
            }
            .timer{
                display: block;
                color: #666;
                font-size: 14px;
                margin-bottom: 16px;
            }
            .content{
                padding: 16px 0 40px;
                border-top: 1px solid #F5F6F7;
                color: #666;
                font-size: 16px;
                /deep/ p{
                    line-height: 1.8;
                    margin: 20px 0;
                }
                /deep/ img{
                    max-width: 100%;
                    border-radius: 12px;
                }
                /deep/ h3{
                    font-size: 22px;
                    font-weight: bold;
                }
                /deep/ td{
                    padding: 10px;
                }
                /deep/ ul li{
                    font-weight: bold;
                }
                /deep/ ol li{
                    font-size: 14px;
                }
            }
        }
    }
}
</style>