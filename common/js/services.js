// var baseUrl = 'http://172.16.88.150:29051/';
var consts = require('./const');
var utils = require('./utils');
var _rspHandle = function(rsp, callback, arg) {
    if (rsp.code) {
        if (callback) {
            callback(rsp.code,rsp || {}, rsp.msg,  arg);
        }
    } else {
        console.log('服务器异常!');
    }
};
var _404 = function() {

};

var _500 = function() {

};

var _504 = function() {

};

var _302 = function() {
};

var _401 = function() {
    if(vm)vm.$nextTick(function(){
        vm.$emit(consts.loginEvent);
    });
};

module.exports = {
    //服务器返回码对应信息
    CODE_SUCC: '000000', //成功
    CODE_FAIL: '200000', //失效
    CODE_ERROR: '-999999', //失败
    CODE_PARAM_ERR: '10002', //参数错误
    CODE_VERIFI_ERROR: "10012", //验证码错误

    /*
     * HTTP POST 请求
     *
     * api      接口url
     * data     数据
     * callback 回调方法
     */
    post: function (url, data, callback, headers, arg, async) {
        if (url.indexOf("http://") == -1) {
            url = window.baseUrl + url;
        }
        var ticket=utils.cookie.get(consts.ticketKey);
        if(!ticket)ticket = '';
        url+='?ticket='+ticket;
        if (url !== '') {
            $.ajax({
                url: url,
                timeout: 60000, //超时时间设置，单位毫秒
                dataType: 'json',
                type: 'POST',
                async: async === undefined ? true : async,
                data: JSON.stringify(data),
                headers: {
                },
                contentType: 'application/json',
                success: function (rsp) {
                    _rspHandle(rsp, callback, arg);
                },
                error: function () {
                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    switch (status) {
                        case 'timeout':
                            _504();
                            break;
                        case 'error':
                            break;
                    }
                },
                statusCode: {
                    404: function () {
                        _404();
                    },
                    500: function () {
                        _500();
                    },
                    504: function () {
                        _504();
                    },
                    302: function () {
                        _302();
                    },
                    401: function () {
                        _401();
                    }
                }
            });
        }

    },


    /*
     * HTTP GET 请求
     *
     * api      接口url
     * data     数据
     * callback 回调方法
     */
    get: function (url, data, callback, headers, arg, async) {
        if (url.indexOf("http://") == -1) {
            url = window.baseUrl + url;
        }
        var ticket=utils.cookie.get(consts.ticketKey);
        if(!ticket)ticket = '';
        data.ticket = ticket;
        if (url !== '') {
            $.ajax({
                url: url,
                timeout: 60000, //超时时间设置，单位毫秒
                dataType: 'json',
                type: 'GET',
                async: async === undefined ? true : async,
                data: data,
                headers: {
                },
                success: function (rsp) {
                    _rspHandle(rsp, callback, arg);
                },
                error: function () {
                },
                complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                    switch (status) {
                        case 'timeout':
                            _504();
                            break;
                        case 'error':
                            // _500 ();
                            break;
                    }
                },
                statusCode: {
                    404: function () {
                        _404();
                    },
                    500: function () {
                        _500();
                    },
                    504: function () {
                        _504();
                    },
                    302: function () {
                        _302();
                    },
                    401: function () {
                        _401();
                    }
                }
            });
        }
    }
}