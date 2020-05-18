<template>
    <div>
        <!-- <h2>用户列表组件</h2> -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welkome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card class="box-card">
            <!-- 搜索和添加 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="根据名字查询" v-model="query" class="input-with-select" clearable @clear="getUserList">
                        <!-- 搜索事件的实现 -->
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table :data="userList" border style="width:100%">
                <el-table-column type="index" :resizable="false"></el-table-column>
                
                <el-table-column label="姓名" prop="username"  :resizable="false">
                </el-table-column>
                <el-table-column label="邮箱" prop="email" :resizable="false">
                </el-table-column>
                <el-table-column label="电话" prop="mobile" :resizable="false">
                </el-table-column>
                <el-table-column label="角色" prop="role_name" :resizable="false">
                </el-table-column>
                <el-table-column label="状态" :resizable="false">
                    <!-- 作用域插槽 -->
                    <template slot-scope="scope">
                        <!-- {{scope.row}} -->
                        <el-switch
                            v-model="scope.row.mg_state"
                            
                            @change="userChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="" :resizable="false" >
                    <template slot-scope="">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>

                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <el-tooltip class="item" effect="dark" content="角色分配" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                        
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[2, 4, 6, 10]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <!-- 添加用户框 -->
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                @close="AddDialog"
               >
        <!-- 表单验证 -->
                <el-form :model="ruleForm" :rules="rules" ref="AddruleForm" label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="UserTrue">确 定</el-button>
                </span>
            </el-dialog>


        </el-card>
    </div>
</template>
<script>
import {users,modify} from '@/api/home.js'
export default {
    data() {
    // 验证规则
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

            if (regEmail.test(value)) {
                // 合法的邮箱
                return cb()
            }

            cb(new Error('请输入合法的邮箱'))
        }
        // 验证手机号
        var checkMobile = (rule,value,cb)=>{
            const regMobile =  /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/ ;
            if(regMobile.test(value)){
                return cb()
            }

            cb(new Error('请输入合法的手机号'))
        }
        return {
            // 搜索的关键字
            query:'',
            // 当前的页码
            pagenum:1,
            // 每页数据条数
            pagesize:2,
            // 保存获取的数据
            userList:[],
            // 总共有多少条数据
            total:0,

//控制对话框
            dialogVisible:false,
// 表单
            // 表单数据
            ruleForm:{
                username:'六神无主',
                password:'123',
                email:'2223645@qq.com',
                mobile:'18146302292'
            },
            // 验证规则
            rules:{
                username:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max:10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                    { min: 3, max:10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],

                email:[
                    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: 'blur' }
                ],
                mobile:[
                    { required: true, message: '请输入用手机号', trigger:'blur'},
                    { validator: checkMobile, trigger: 'blur' }
                ]
            }
        }
        
    },
    created() {
        this.getUserList()
    },
    methods: {
        getUserList(){
            users(this.query,this.pagenum,this.pagesize).then(res =>{
                // console.log(res);
                // 在这判断数据是否获取成功
                // console.log(res.data.meta.status)
                if(res.data.meta.status !== 200) return  this.$message.error('用户列表获取失败');
                // console.log(res.data.data.users)
                this.userList=res.data.data.users;
                this.total=res.data.data.total
            })
        },
        // 监听handleSizeChange
        handleSizeChange(newSize){
            // console.log(newSize)
            this.pagesize=newSize;
            // 改变之后重新发送数据请求
            this.getUserList();
        },
        // 监听页码改变事件
        handleCurrentChange(newChange){
            // console.log(newChange);
            this.pagenum=newChange;
            this.getUserList();
        },
        // 监听状态的改变
        userChange(val){
            // console.log(val)
            // 发送修改的数据请求
            modify(val.id,val.mg_state).then(res =>{
                // console.log(res.data.meta);
                // 当用户修改失败，要提醒用户，并且把按钮返回到之前的状态
                if(res.data.meta.status !== 200){
                    // 给他取个反
                    val.mg_state = !val.mg_state;
                    return this.$message.error('用户修改失败');
                }else{
                    this.$message.success('用户修改成功');
                }
            })
        },
        // 关闭对话框
        AddDialog(){
            // console.log('aaaa');
            // 清空表单
            this.$refs.AddruleForm.resetFields();
        },
        // 点击对话框确定的时候
        UserTrue(){
           console.log(this.ruleForm);
        }

    },

}
</script>
<style lang="less" scoped>
    .el-table{
        margin-top:20px;
        font-size:14px;
    }
    .el-pagination{
        margin-top:15px;
    }
</style>