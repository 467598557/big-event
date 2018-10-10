import Vue from 'vue'
import Router from 'vue-router'
import AppViewIndex from 'src/views/index'
import AppViewInit from 'src/views/init'
import AppViewLogin from 'src/views/login'
import AppViewRegister from 'src/views/register'
import AppViewManager from 'src/views/manager'
import AppViewManagerUser from 'src/views/manager/user'
import AppViewManagerConfig from 'src/views/manager/config'
import AppViewManagerInfo from 'src/views/manager/info'

Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'AppViewLogin',
            component: AppViewLogin
        }, {
            path: '/register',
            name: 'AppViewRegister',
            component: AppViewRegister
        }, {
            path: '/',
            name: 'AppViewIndex',
            component: AppViewIndex
        }, {
            path: '/init',
            name: 'AppViewInit',
            component: AppViewInit
        }, {
            path: '/manager',
            name: 'AppViewManager',
            component: AppViewManager,
            children: [{
                path: '/',
                name: 'AppViewManagerInfo',
                component: AppViewManagerInfo
            }, {
                path: 'user',
                name: 'AppViewManagerUser',
                component: AppViewManagerUser
            }, {
                path: 'config',
                name: 'AppViewManagerConfig',
                component: AppViewManagerConfig
            }, {
                path: 'info',
                name: 'AppViewManagerInfo',
                component: AppViewManagerInfo
            }]
        }
    ]
});
export default router;

