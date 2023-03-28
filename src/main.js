import { createApp } from 'vue'
import './style.css'
import "../node_modules/nes.css/css/nes.css";
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router";
const pinia = createPinia()
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App).
    use(pinia).
    use(router).
    use(ElementPlus).
    mount('#app')