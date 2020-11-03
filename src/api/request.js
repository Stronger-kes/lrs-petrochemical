import axios from 'axios';
import { Message } from 'element-ui';

// import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到

// 创建axios实例
const service = axios.create({
    baseURL: "/API",
    timeout: 1000
});

// // 请求拦截
service.interceptors.request.use(config => {
    console.log(config, "请求拦截===========>");
    if(config.url !== "login") {
        let token = localStorage.getItem('token');
         // 配置头信息，在封装的request请求中去写
        config.headers["Content-Type"] = token;
    }
    return config;
})

// 响应拦截
service.interceptors.response.use(reslut => {
    console.log(reslut,"响应拦截================>");
    let res = reslut;
    let status = res.status;
    let token = res.data.data.token;
    console.log(token,"token=========================>")
    if (status == 200) {
        token && localStorage.setItem("token", token);
        // Message({
        //     message: '登陆成功',
        //     type: "success"
        // });
        return {
            flag: 1,
            reslut: res,
            status
        }
    }
    if (status === 201) {
        token && localStorage.setItem("token", token);
        Message({
            message: "创建成功",
            type: "success",
        })
        return res;
    }
}, error => {
    return Promise.reject("请求失败", error);
})


export default service;



