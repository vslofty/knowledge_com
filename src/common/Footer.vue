<template>
    <div class="footer">
        <div class="container container-1">
            <div class="top">
                <p class="d-flex ali-cen">
                    <span class="blackcolor">服务支持</span>
                    <router-link to="/download/">下载中心</router-link>
                    <router-link to="/help/m001">帮助文档</router-link>
                    <a target="_blank" href="https://zanshang.kf5.com/kchat/45235?from=在线支持&group=0">在线客服</a>
                </p>
                <p class="d-flex ali-cen">
                    <span class="blackcolor">公司地址</span>
                    <span>广州市天河区林和东路285号天安人寿中心30楼</span>
                </p>
            </div>
        </div>
        <div class="container-2">
            <div class="container d-flex juc-bet ali-cen">
                <div>Copyright © 2020 www.vzan.com All Rights Reserved Powered by 广州赞赏信息科技有限公司 </div>
                <div>安全联盟认证 ICP备案： 粤ICP备16043221号       粤公网安备 44010602002751号</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.footer{
    position: relative;
    height: 183px;
    background: #fff;
    display: flex;
    flex-direction: column;
    .container-1{
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            span,a{
                color: #60646B;
                margin-right: 23px;
                font-size: 14px;
            }
            a:hover{
                color: #FFA800;
            }
            em{
                color: #60646B;
                font-size: 16px;
            }
        }
        .bottom{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-top: 6px;
            span{
                color: #60646B;
                margin-right: 23px;
                font-size: 14px;
            }
            h4{
                color: #202124;
                font-size: 32px;
                font-weight: bold;
                margin: 0;
            }
        }
        .blackcolor{
            color: #252525!important;
            font-weight: bold;
        }
    }
    .container-2{
        display: flex;
        color: #B8BABF;
        font-size: 12px;
        height: 77px;
        border-top: 1px solid #F6F7F8;
    }
}
</style>