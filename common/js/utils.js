/**
 * Created by dongwei on 2017/5/15.
 */

/**
 * 深度拷贝
 * @returns {*}
 */
var mix = function () {
    var argu = arguments;
    if (argu.length <= 0)return {};
    var obj = argu[0];
    if (!obj || typeof obj != 'object')obj = {};
    var keys, key;
    for (var i = 1; i < argu.length; i++) {
        if(argu[i] && argu[i] instanceof Array){
            if(!(obj instanceof Array)){
                obj=[];
            }
            for(var k=0;k<argu[i].length;k++){
                if(typeof argu[i][k] == 'object'){
                    obj.push(mix({}, argu[i][k]));
                }else{
                    obj.push(argu[i][k]);
                }
            }
        }else if (argu[i] && typeof argu[i] == 'object') {
            keys = Object.keys(argu[i]);
            for (var j = 0; j < keys.length; j++) {
                key = keys[j];
                if (typeof argu[i][key] == 'object') {
                    obj[key] = mix(obj[key], argu[i][key]);
                } else {
                    obj[key] = argu[i][key];
                }
            }
        }
    }
    return obj;
}
//
// if(argu[i][key]&& argu[i][key] instanceof Array){
//     if(!obj[key]||!obj[key] instanceof Array){
//         obj[key]=[]
//     }
//     for(var k=0;j<argu[i][key].length;k++){
//         if(argu[i][key][k])
//             }
// }else

    /**
 * 获取search参数
 * @returns {{}}
 */
/**
 * 获取search参数
 * @returns {{}}
 */
var getHashObj = function () {
    var qs = location.hash.length > 0 && location.hash.indexOf("?")>0 ? location.hash.substr(location.hash.indexOf("?")+1, location.hash.length): '',
        args = {},
        items = qs.length > 0 ? qs.split('&') : [],
        item = null, name = null, value = null, i = 0, len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}

var getSearchObj = function () {
    var  qs = location.search.length>0 ? location.search.substr(1):'',
        args = {},
        items = qs.length>0 ? qs.split('&'):[],
        item = null,name = null,value = null,i = 0,len = items.length;
    for(i = 0;i < len; i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);

        if(name.length){
            args[name] = value;
        }
    }
    return args;
}

var getQuery = function(obj){
    return mix({},getHashObj(),getSearchObj(),obj)
}
var cookie = {
    set:function (name, value) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * 1);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    get:function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delete: function (name) {
        this.set(name, '', -1);
    }
}

var each = function(array,callback){
    if(array instanceof Array){
        for(var i=0;i<array.length;i++){
            callback(array[i],i);
        }
    }else if(typeof array=='object'){
        var keys=Object.keys(array);
        for(var i=0;i<keys.length;i++){
            callback(array[keys[i]],keys[i]);
        }
    }

}

module.exports = {
    mix: mix,
    getSearchObj: getSearchObj,
    getQuery:getQuery,
    cookie:cookie,
    each:each
}