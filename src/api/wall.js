import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    addWall(data){
        return _mm.POST({
            url:'/wall/wallConfig',
            data:data
        })
    },
    getWallDetail(data){
        return _mm.POST({
            url:'/wall/showWall',
            data:data
        })
    },
    getDetailById(data){
        return _mm.POST({
            url:'/wall/detailWall',
            data:data
        })
    },
    updateWall(data){
        return _mm.POST({
            url:'/wall/updateWall',
            data:data
        })
    },
    authWall(data){
        return _mm.POST({
            url:'/wall/verifyWall',
            data:data
        })
    },
    publish(data){
        return _mm.POST({
            url:'/wall/submitWall',
            data:data
        })
    },
    delWall(data){
        return _mm.POST({
            url:'/wall/deleteWall',
            data:data
        })
    },
    //获取浏览数据
    getBrowseData(data){
        return _mm.POST({
            url:'/data/wallData',
            data:data
        })
    }
}
export default Api;