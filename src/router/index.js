import Vue from 'vue'
import Router from 'vue-router'
import AppViewIndex from 'src/views/index'
import AppViewLogin from 'src/views/login'
import AppViewManager from 'src/views/manager'
import AppViewManagerUser from 'src/views/manager/user'

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
                path: 'user',
                name: 'AppViewManagerUser',
                component: AppViewManagerUser
            }]
        }
    ]
})

