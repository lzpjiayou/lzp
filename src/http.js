import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';

let loading;

function startLoading() {
    loading = ElLoading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}

function endLoading() {
    loading.close();
}
//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading();
    return config;
}, error => {
    return Promise.reject(error);
});
//响应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response;
}, error => {
    endLoading();
    ElMessage.error(error.response.data);
    return Promise.reject(error);
});

export default axios;