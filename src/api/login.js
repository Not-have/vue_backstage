import {request} from '@/api/request';
// 登录的数据
export function login(username,password){
    return request({
        url:'/login',
        method:"post",
        params:{
            username,
            password
        }
    })
}


