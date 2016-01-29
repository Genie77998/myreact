export const  CarApi = {
    getCar(keyword,pageSize,pageNum){
        return new Promise((resolve, reject) => {
            $.ajax({
                type:"get",
                url:'http://cx.baoxian.com/searchList/'+keyword,
                data:{
                    p : pageNum,
                    pMax : pageSize
                },
                dataType:"jsonp",
                jsonp: "callback",
                success(resp){
                    resolve(resp);
                },
                error(r){
                    reject(r);
                }
            })
        })
    }
}
