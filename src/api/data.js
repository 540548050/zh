import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    //产品激活统计
    getProductData(data){
        return _mm.POST({
            url:'/data/validateCount',
            data:data
        })
    },
    //app浏览量统计
    getAppView(data){
        return _mm.POST({
            url:'/data/viewCount',
            data:data
        })
    },
    //app注册量统计
    getAppReg(data){
        return _mm.POST({
            url:'/data/registerCount',
            data:data
        })
    }
}
export default Api;