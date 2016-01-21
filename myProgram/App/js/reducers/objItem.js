import { UPDATE_OBJ } from '../actions'
let states = {
        name: '隔壁老王',
        age: 18,
        sex: '男',
        email: 'wj77998@yeah.net',
        mobile: '18657114802'
    }
let promise = new Promise( (resolve, reject) => {
    $.ajax({
        type:"get",
        url:'http://cx.baoxian.com/searchList/daz?p=1&pMax=30',
        dataType:"jsonp",
        jsonp: "callback",
        success(resp){
            resolve(resp);
        },
        error(r){
            reject(r);
        }
    })
});

promise.then(function(result) {
        //promise成功的话会执行这里"
    states.carModel = result
}, function(err) {
    //promise失败会执行这里
    console.log(err); // Error: "It broke"
});




export default function objItem( state = states, action) {
    switch (action.type) {
        case UPDATE_OBJ:
            if (typeof action.name != 'undefined' && typeof action.value != 'undefined') {
                state[action.name] = action.value
                return state
            } else {
                return state
            }
        default:
            return state
    }
}
