import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "../view/Home.vue";
import Register from "../components/home_page/Register.vue";
import Page from "../components/main_page/Page.vue";
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
        component: Page
    },

]


const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHashHistory(),
    routes
})

export default router