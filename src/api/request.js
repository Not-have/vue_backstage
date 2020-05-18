
import axios from 'axios';

export function request(config){
    // 1、创建实例，不要创建全局的
    const instance = axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1",
        timeout:5000//这个是5秒的意思
    })
    // 2、axios拦截器,它分为全局拦截（axios.interceptors）和实例拦截，下面我们使用实例拦截
    // 2-1、这样写代表拦截请求(里面有两个参数)
    instance.interceptors.request.use(config=>{
        // 这里拦截是成功的（这里至少是发送成功的）,所以在拦截之后，要return出去，要不然外面收不到
        // console.log(config);
        // 在这块加请求头token
        config.headers.Authorization = window.sessionStorage.getItem('token');
        return config;
    },err=>{//这块很少来到，因为是发送失败的(数据很少发送失败)
        console.log(err);
    });
    // 2-2、拦截响应(这里也要传入两个参数)，所以是结果
    instance.interceptors.response.use(res=>{
        // 服务器已经响应了,服务器返回的真正结果
        // console.log(res);
       
        return res;
    },err=>{
        console.log(err);
    });
    // 3、发送网络请求
    return instance(config)
} 
