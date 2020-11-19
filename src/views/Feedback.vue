<template>
    <div class="page-feedback">
        <headers current="feedback" :showwhitebg="true"></headers>
        <feedback></feedback>
        <footers></footers>
    </div>
</template>

<script>
import headers from '@/common/Header.vue'
import Feedback from '@/common/Feedback.vue'
import Footers from '@/common/Footer.vue';
export default {
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