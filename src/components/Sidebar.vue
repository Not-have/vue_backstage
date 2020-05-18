<template>
    <div>
        <!-- 实现点击它折叠菜单 -->
        <div class="toggle_button" @click="toggleCollapse()">|||</div>
        <el-menu
            background-color="#373d41"
            text-color="#fff"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="activePath"
            >
            <!-- 一级菜单 -->
            <el-submenu v-for="item in menuList" :key="item.id"  :index="item.id + '' " >
                <!-- 一级菜单文字图标区域 -->
                <template slot="title">
                    <!-- 图标,根据键值去进行改变 -->
                    <i :class="iconsObj[item.id]"></i>
                    <!-- 文本 -->
                    <span>{{item.authName}}</span>
                </template>
                <!-- 二级菜单 (二级菜单的获取是遍历以及菜单里面的数据) -->
                <!-- 侧边栏路由的改造 -->
                <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="'/' + subItem.path" @click="saveNav('/' + subItem.path)">
                    <template slot="title">
                        <!-- 图标 -->
                        <i class="el-icon-menu"></i>
                        <!-- 文本 -->
                        <span>{{subItem.authName}}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            iconsObj:{
               '125':'iconfont icon-user',
               '103':'iconfont icon-tijikongjian',
               '101':'iconfont icon-shangpin',
               '102':'iconfont icon-danju',
               '145':'iconfont icon-baobiao'
            },
        //是否折叠    
            isCollapse:false,
        //定义被激活的裂解地址
            activePath:''

        }
    },
    props:{
        menuList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mounted() {
        
    },
    methods: {
        toggleCollapse(){
            this.isCollapse = !this.isCollapse;
            this.$emit('expel',this.isCollapse)

        },
        saveNav(val){
            console.log(val);
            window.sessionStorage.setItem('activePath',val);
            // 每次点击的时候重新赋值
            this.activePath=val;
        }
    },
    created() {
        this.activePath=window.sessionStorage.getItem('activePath');
    },
}
</script>
<style lang="less" scoped>
    .toggle_button{
        background:#373d41;
        color: white;
        line-height:24px;
        text-align: center;
        letter-spacing:4px;
        cursor: pointer;
    }
    .iconfont{
        margin-right:5px;
    }
    .el-menu{
        border:0px;
    }
</style>