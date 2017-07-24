/**
 * Created by dongwei on 2017/5/15.
 */
var vueInit = require('./common/js/vueInit');
var mixins = require('./common/js/mixins');
var css = require('./common/css/style.scss');
var Vue = require('vue');
var router = require('./router');
var service = require('./common/js/services');
var consts = require('./common/js/const');
var widget = require('./app/components/widget');
var utils=require('./common/js/utils');
widget.init(Vue);
var vm;
var config = {
    mixins:[mixins.loaded],
    data:{
    },
    created:function(){

    },
    methods: {

    },
}
config.router = router;
router.afterEach(function(route){
    config.data.path = route.path;
});
vm = vueInit.init(config,router);
