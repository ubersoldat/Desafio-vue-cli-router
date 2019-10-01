import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('../App'),
            children: [
                {
                    path: '/',
                    name: 'Inicio',
                    component: () => import('../views/Inicio')
                }
                ,
                {
                    path: '/form',
                    name: 'Form',
                    component: () => import('../views/Form')
                }
                ,
                {
                    path: '/tabla',
                    name: 'Tabla',
                    component: () => import('../views/Tabla')
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
export default router