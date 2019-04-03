import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    addNews(data){
        return _mm.POST({
            url:'/news/newsConfig',
            data:data
        })
    },
    getNewsDetail(data){
        return _mm.POST({
            url:'/news/showNews',
            data:data
        })
    },
    updateWall(data){
        return _mm.POST({
            url:'/news/updateNews',
            data:data
        })
    },
    authWall(data){
        return _mm.POST({
            url:'/news/verifyNews',
            data:data
        })
    },
    publish(data){
        return _mm.POST({
            url:'/news/submitNews',
            data:data
        })
    },
    delWall(data){
        return _mm.POST({
            url:'/news/deleteNews',
            data:data
        })
    },
    getBrowseData(data){
        return _mm.POST({
            url:'/data/newsData',
            data:data
        })
    }
}
export default Api;