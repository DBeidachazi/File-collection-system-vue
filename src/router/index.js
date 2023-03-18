import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "../view/Home.vue";
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHashHistory(),
    routes
})

export default router