<template>
    <div class="help">
        <headers current="help" :showwhitebg="true"></headers>
        <div class="container">
            <div class="left">
                <a-menu mode="inline" :default-selected-keys="['1']" :default-open-keys="[1]" style="width: 256px" @click="onOpenChange">
                    <a-sub-menu :key="item.Id" v-for="item of menuinfo">
                        <span slot="title"><span>{{item.mainName}}</span></span>
                        <a-menu-item :key="submenu.id" v-for="submenu of item.subMenu">{{submenu.name}}</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
            <div class="right">
                <h2 class="title">{{contentInfo.title}}</h2>
                <span class="timer">更新时间：{{contentInfo.creattime}}</span>
                <div class="content" v-html="contentInfo.content"></div>
            </div>
        </div>
        
    </div>
</template>

<script>
import headers from '@/common/Header.vue'

export default {
    data(){
        return{
            menuinfo: require("./../static/menu.json"),
            contentArr: require("./../static/help.json"),
            contentInfo: {},
            openKeys: [1]
        }
    },
    components: {
        headers
    },
    mounted(){
        this.$nextTick(()=>{
            this.contentInfo=this.contentArr[0];
        })
    },
    methods: {
        onOpenChange(item, key, keyPath) {
            console.log(item, key, keyPath)
            this.contentArr.forEach(help=>{
                if(help.id==item.key){
                    this.contentInfo=help;
                }
            })
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
    .left{
        display: flex;
        background: #fff;
        border-radius: 4px;
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
        /deep/ .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
            background: linear-gradient(270deg, rgba(255, 168, 0, 0) 0%, rgba(255, 168, 0, 0.1) 100%);
            color: #FFA800;
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
            padding: 16px 0;
            border-top: 1px solid #F5F6F7;
            color: #666;
            font-size: 16px;
            p{
                line-height: 1.8;
            }
        }
    }
}
</style>