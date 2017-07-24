var header = require('./header.vue');
var footer = require('./footer.vue');

module.exports={
    init:function(vue){
        if(!vue||!vue.component)return
        vue.component('index-header',header);
        vue.component('index-footer',footer);
    }
}