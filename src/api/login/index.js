import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    login(data){
        return _mm.POST({
            url:'/login/login_acount',
            data:data
        })
    }
}
export default Api;