<template>
    <div>
        <el-button type="info" @click="quit" class="quiit_box">退出</el-button>
    </div>
</template>

<script>
export default {
    methods: {
        quit(){
            // console.log('aaa')
            // 在这清楚token(也可以按照token名清除)
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    },
}
</script>

<style lang="less" scoped>
    .quiit_box{
        
    }
</style>