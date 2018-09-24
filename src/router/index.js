import Vue from 'vue'
import Router from 'vue-router'
import AppViewIndex from 'src/views/index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'AppViewIndex',
            component: AppViewIndex
        }
    ]
})

