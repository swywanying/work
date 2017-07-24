var utils = require('./utils');
var services = require('./services');
var consts = require('./const');
var listConfig = {
    url:'',
    dataList:[],
    total:0,
    page:1,
    pageSize:10,
    params:{},
    selected:{}
}
module.exports= {
    init:function(listNode,config){
        utils.mix(listNode,utils.mix({},listConfig,listNode));
        config.methods.refresh=function(page,listNode,options){
            var self = this;
            if(!listNode)listNode = this;
            if(page){
                listNode.page=page;
            }
            var params = {};
            if(listNode.page){
                params = {page:listNode.page,pageSize:listNode.pageSize};
            }
            params=utils.mix(params,listNode.params);
            listNode.selected={};
            services.get(listNode.url,params,function(code,rsp,msg){
                if(code==services.CODE_SUCC){
                    if(rsp.data instanceof Array){
                        listNode.dataList = rsp.data;
                        listNode.total = rsp.data.length;
                    }else{
                        listNode.dataList = rsp.data.dataList;
                        listNode.total=rsp.data.total;
                    }
                    self.$emit(consts.listLoadEvent,listNode);
                }else{
                    if(vm)vm.$Message.error(msg);
                }
            });
        }
    }
}