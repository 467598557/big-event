import Vue from 'vue'
import Router from 'vue-router'
import AppViewIndex from 'src/views/index'
import AppViewLogin from 'src/views/login'
import AppViewManager from 'src/views/manager'
import AppViewManagerUser from 'src/views/manager/user'
import AppViewManagerConfig from 'src/views/manager/config'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'AppViewLogin',
            component: AppViewLogin
        }, {
            path: '/',
            name: 'AppViewIndex',
            component: AppViewIndex
        }, {
            path: '/manager',
            name: 'AppViewManager',
            component: AppViewManager,
            children: [{
                path: '/',
                name: 'AppViewManagerUser',
                component: AppViewManagerUser
            }, {
                path: 'user',
                name: 'AppViewManagerUser',
                component: AppViewManagerUser
            }, {
                path: 'config',
                name: 'AppViewManagerConfig',
                component: AppViewManagerConfig
            }]
        }
    ]
})

