import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    getUserList(data){
        return _mm.POST({
            url:'/account/accountsShow',
            data:data
        })
    },
    delUser(data){
        return _mm.POST({
            url:'/account/accountsDelete',
            data:data
        })
    },
    addUser(data){
        return _mm.POST({
            url:'/account/accountsAdd',
            data:data
        })
    },
    loadData(data){
        return _mm.POST({
            url:'/account/userDetail',
            data:data
        })
    },
    updateUser(data){
        return _mm.POST({
            url:'/account/passwordChange',
            data:data
        })
    }
}
export default Api;