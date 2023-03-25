import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import router from "../router/index.js";



export const usePageStore = defineStore("pageStore",() => {
    let roleResp = reactive({})
    let roleRespFinished= reactive({})
    let roleRespUnFinished = reactive({})
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"))

    let worklistResp = reactive({})

    let content = ref(true)
    let role = ref(false)
    let published = ref(false)


    function roleChange() {
        content.value = !content.value
        role.value = !role.value
    }
    function publishChange() {
        content.value = !content.value
        published.value = !published.value
    }


    function backToHomePage() {
        content.value = true
        role.value = false
        published.value = false
        router.push({path: '/page'}).then(()=>{})
        // todo 补充
    }


    return {
        roleChange,
        backToHomePage,
        publishChange,

        published,
        content,
        role,
        roleResp,
        roleRespFinished,
        roleRespUnFinished,
        worklistResp,

    }
})