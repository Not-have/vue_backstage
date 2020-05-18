import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 在这导入登录页面组件
const  Login=()=>import('../components/Login.vue');
const Home=()=>import('../pages/Home');
const Welkome=()=>import('../pages/Welkome.vue');
const User=()=>import('../pages/user/User.vue');

const router = new Router({
    routes:[
        // 定义一个重定向
        {path:'/',component:Login},
        {name:'login',path:'/login',component:Login},
        // Welkome作为home的子
        {name:'home',path:'/home',component:Home,
        // 在下面这样写，代表只要你访问了home，一开始是定向Welkome
            redirect:'/welkome',
            // 包含的子路由
            children:[
                {path:'/welkome',component:Welkome},
                // 下面的地址是服务器 规定死的
                {path:'/users',component:User},

            ]
        }
    ]
})
// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    if(to.path === '/login') return next();
    // 获取token
    const token = window.sessionStorage.getItem('token');
    // 在这判断token是否存在
    if(!token) return next('/login');//不存在踢回登录
    next();//存在进行下一步
})


export default router;