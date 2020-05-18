<template>
    <div class="login_container">
        <!-- 登录组件 -->
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单区域(拿到这个表单里面的实例对象，就是用ref) -->
            <el-form ref='login_From' :model="loginFrom" :rules="loginRules" label-width="0px" class="login_from ">
                <!-- 账户 -->
                <el-form-item label="" prop="userName">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginFrom.userName">
                    </el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="" prop="userPassword">
                    <el-input prefix-icon="iconfont icon-3702mima" v-model="loginFrom.password" type="password">
                    </el-input>
                </el-form-item>
                <!--  -->
                <el-form-item label="" class="login_btns">
                    <el-button type="primary" @click="loginBtn">登录</el-button>
                    <el-button type="info" @click="restBtn">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
// 引入数据的请求
import {login} from '@/api/login.js';
// import {request} from '@/api/request';
export default {
    data() {
        return {
            // 这是登陆的数据对象
            loginFrom:{
                userName:'admin',
                password:'123456'
            },
            // 添加验证对象
            loginRules:{
                // 用户名
                userName:[
                     { required:true,message:'请输入登录名称', trigger:'blur'},
                     { min:3, max:10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                // 密码
                password:[
                    { required:true,message:'请输入登录密码', trigger:'blur'},
                    { min:3, max:10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 点击重置的
        restBtn(){
            // 指向当前登录的组件实例对象
            // console.log(this);
            this.$refs.login_From.resetFields();//他是重置表单
        },
        // 点击登录，对他进行一个yu验证
        loginBtn(){
            // 再这个里面穿两个形参，第一个一般为布尔值(判断表单的验证结果)   同时这个箭头函数里的括号可以省略，因为里面只有一个值
    // 这块需要重写





// 登录的数据
           /* request({
                url: '/login',
                params: {
                    username:this.loginFrom.userName,
                    password:this.loginFrom.password
                }
            }).then(res =>{
               console.log(res);

            })
*/
            // 先判断一下规则在请求数据
            login(this.loginFrom.userName,this.loginFrom.password).then(res =>{
                
                console.log(res);
                let loginRes = res.data;
                // 在请求成功的时候，进行一系列操作
                if(loginRes.meta.status !== 200) return  this.$message.error('登录失败');
                // console.log('登录成功')
                this.$message({
                    message: '登录成功',
                    type: 'success'
                });


                // 登录成功，进行token的保存和路由的跳转
                // console.log(res.data.data.token)
                window.sessionStorage.setItem('token',res.data.data.token);
                // 跳转
                this.$router.push('/home');
            }).catch(err =>{
                console.log(err);
            })
        },


    },
    created() {
        
    },
}
</script>
<style lang="less" scoped>
    .login_container{
        height:100%;
        background-color:#2b4b6b;
        position: relative;
    }
    .login_box{
        width:450px;
        height:300px;
        background-color:white;
        border-radius:3px;
        // 居中
        position: absolute;
        left:50%;
        top:50%;
        margin-left:-225px;
        margin-top:-150px;
        .avatar_box{
            height:130px;
            width:130px;
            border:1px solid #eee;
            border-radius:50%;
            padding:10px;
            position: absolute;
            left:50%;
            margin-left:-92px;
            top:-65px;
            background-color: white;
            img{
                width:100%;
                height:100%;
                border:1px solid #eee;
                border-radius:50%;
                background:#eee;
               
            }
        }
    }
    .login_from{
        position: relative;
        top:40%;
        box-sizing:border-box;
        padding:0 20px;
    }
    .login_btns{
        display: flex;
        justify-content:flex-end;
    }
</style>