var consts = require('./const');
module.exports={
    loaded:{
        created: function () {
            this.$on(consts.loadedEvent,function(){
                var children = this.$children;
                for(var i = 0;i<children.length;i++){
                    children[i].$emit(consts.loadedEvent,this.userInfo);
                }
            });
            this.$on(consts.loadedFailEvent,function(){
                var children = this.$children;
                for(var i = 0;i<children.length;i++){
                    children[i].$emit(consts.loadedFailEvent,this.userInfo);
                }
            });
        },
        mounted:function(){
            if(window.vm&&window.vm.userInfoLoaded==1){
                this.$emit(consts.loadedEvent);
            }else if(window.vm&&window.vm.userInfoLoaded==2){
                this.$emit(consts.loadedFailEvent);
            }
        }
    }
}