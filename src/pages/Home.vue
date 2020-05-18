<template>
    <div class="home_box">
        <!-- 把请求过来的数据传递给子组件 -->
        <Context :menuList='sidebarList' />
    </div>
</template>

<script>
// 引入退出组件
import Context from '@/components/Context.vue';

//引入请求的数据
import {sidebar} from '@/api/home.js' 
export default {
    data() {
        return {
            // 左侧菜单的数据
            sidebarList:[]
        }
    },
    components:{
        Context
    },
    created() {
        this.getMenuList();
    },
    methods: {
        //侧边栏数据
        async getMenuList(){
            await sidebar().then(res =>{
                // console.log(res);             
                // console.log(res.data.data);
                // 在这定义获取数据失败
                if(res.data.meta.status !==200) return this.$message.error(res.data.meta.msg);
                //成了，赋值
                 this.sidebarList = res.data.data;
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .home_box{
        height:100%;
    }
</style>