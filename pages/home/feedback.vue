<template>
    <div class="page-feedback" v-cloak>
        <headers current="feedback" :showwhitebg="true"></headers>
        <feedback></feedback>
        <footers></footers>
    </div>
</template>

<script>
import headers from '@/components/Header.vue'
import Feedback from '@/components/Feedback.vue'
import Footers from '@/components/Footer.vue';
export default {
    head:{
        title: "知播-产品反馈",
    },
    data(){
        return{
            
        }
    },
    components: {
        headers,Feedback,Footers
    },
    methods: {
        
    },
    mounted() {
        
    }
}
</script>

<style lang="less" scoped>
.page-feedback{
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(180deg, #FDFEFE 0%, #F5F6F7 100%);
    padding-top: 60px;
    display: flex;
    flex-direction: column;
}
</style>