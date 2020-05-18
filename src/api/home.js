import {request} from '@/api/request';
export function sidebar(){
    return request({
        method:'get',
        url:'/menus'
    })
}


// ueser页面的数据请求
export function users(query,pagenum,pagesize){
    return request({
        method:'get',
        url:'/users',
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}

export function modify(id,state){
    return request({
        method:'put',
        // uId用户 ID不能为空`携带在url中`；type用户状态不能为空`携带在url中`，值为 true 或者 false
        // url:'/users/:uId/state/:type'   //在这使用es6子夫串模板
        url:`/users/${id}/state/${state}`
    })
}

// 发送添加用户的请求
export function userAdd(username,password,email,mobile){
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(mobile);

    // let params = new URLSearchParams;
    // params.append(
    //     {"username":ruleForm.Username},
    //     {"password":ruleForm.passWord},
    //     {"email":ruleForm.email},
    //     {"mobile":ruleForm.mobile}
    // )
    return request({
        url:'/users',
        method:'post',
        
        params:{
            username,
            password,
            email,
            mobile
        }
    })
}