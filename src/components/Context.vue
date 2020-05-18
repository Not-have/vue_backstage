<template>
    <!-- 注：组件名称就是类名 -->
    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/oooo.jpg" alt="">
                <span>管理后台</span>
            </div>
            <Quit />
        </el-header>
        <!-- 内容-->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width= " bian?'60px':'200px' " >
                <Sidebar :menuList='menuList' @expel="father"/>
            </el-aside>
            <!-- 主题 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Quit from '@/components/Quit.vue';
import Sidebar from '@/components/Sidebar.vue'
export default {
    data() {
        return {
            // 根据子的数据去改变侧边栏的宽度
            bian:false
        }
    },
    // 接收父传过来的数据(同时在传递给子)
    props:{
        menuList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Quit,
        Sidebar
    },
    methods: {
        father(val){
            console.log(val);
            this.bian = val
        }
    },
}
</script>

<style lang="less" scoped>
    .home_container{
        height:100%;
    }
    .el-header{
        padding-left:0;
        background:#373d41;
        display:flex;
        justify-content:space-between;
        align-items:center;
        > div{
            display: flex;
            align-items: center;
            > span{
                margin-left:20px;
                color:white;
            }
            img{
                width:50px;
                height:50px;
            }
        }
    }
    .el-aside{
        background:#373d41;
    }
    .el-main{
        background:ghostwhite;
    }
</style>