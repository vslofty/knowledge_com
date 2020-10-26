<template>
    <div class="footer">
        <div class="container container-1">
            <div class="top">
                <p class="d-flex ali-cen">
                    <span class="blackcolor">服务支持</span>
                    <span>下载中心</span>
                    <span>帮助文档</span>
                    <span>在线客服</span>
                </p>
                <p>
                    <em>售前电话</em>
                </p>
            </div>
            <div class="bottom">
                <p class="d-flex ali-cen">
                    <span class="blackcolor">公司地址</span>
                    <span>广州市天河区林和东路285号天安人寿中心30楼</span>
                </p>
                <h4>400-086-6612</h4>
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
    height: 236px;
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
            span{
                color: #60646B;
                margin-right: 23px;
                font-size: 14px;
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
        height: 83px;
        border-top: 1px solid #F6F7F8;
    }
}
</style>