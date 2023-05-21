import {createRouter, createWebHashHistory} from 'vue-router'
// import Home from "../view/Home.vue";
// import Register from "../components/home_page/Register.vue";
// import Page from "../components/main_page/Page.vue";
// import Class from "../components/main_page/Class.vue";
// import Blank from "../components/blank/Blank.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('/src/view/Home.vue')
    },
    {
      path: '/blank',
      name: 'blank',
      component: () => import('../components/blank/Blank.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/home_page/Register.vue')
    },
    {
        path: '/page',
        name: 'page',
        component: () => import('../components/main_page/Page.vue'),
    },
    {
        path: '/class_manage',
        name: 'class_manage',
        component: () => import('../components/main_page/Class.vue')
    },
    {
        path: '/information',
        name: 'test',
        component: () => import('../view/TestView.vue')
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router