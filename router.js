/**
 * Created by dongwei on 2017/5/15.
 */
var Vue = require('vue');
var VueRouter = require('vue-router');
var page = require('./app/pages/page.vue');
var second = require('./app/pages/second.vue');

Vue.use(VueRouter);
const routes = [
    { path: '/', redirect: '/page' },
    { path: '/page', component: page },
    { path: '/second', component: second },
]
var router = new VueRouter({
    routes:routes
});

module.exports=router;