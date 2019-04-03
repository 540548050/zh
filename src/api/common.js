import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    uploadImg(data){
        return _mm.POST({
            url:'/wall/uploadIMG',
            data:data
        })
    },
    updatePassword(data){
        return _mm.POST({
            url:'/account/accountsUpdate',
            data:data
        })
    },
    logout(data){
        return _mm.POST({
            url:'/login/logout_acount',
            data
        })
    }
}
export default Api;