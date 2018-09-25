import Vue from 'vue'
import Router from 'vue-router'
import AppViewIndex from 'src/views/index'
import AppViewManager from 'src/views/manager'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'AppViewIndex',
            component: AppViewIndex
        }, {
            path: '/manager',
            name: 'AppViewManager',
            component: AppViewManager,
            child: {

            }
        }
    ]
})

