import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "../view/Home.vue";
import Register from "../components/home_page/Register.vue";
import Page from "../components/main_page/Page.vue";
import Class from "../components/main_page/class_manage/Class.vue";
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/page',
        name: 'page',
        component: Page,
    },
    {
        path: '/class_manage',
        name: 'class_manage',
        component: Class
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHashHistory(),
    routes
})

export default router