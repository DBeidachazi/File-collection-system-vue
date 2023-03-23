import {defineStore} from "pinia";
import {reactive, ref} from "vue";



export const usePageStore = defineStore("",() => {
    let roleResp = reactive({})
    let roleRespFinished= reactive({})
    let roleRespUnFinished = reactive({})
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"))

    let content = ref(true)
    let role = ref(false)


    function roleChange() {
        content.value = !content.value
        role.value = !role.value
    }


    function backToHomePage() {
        content.value = true
        role.value = false
        // todo 补充
    }


    return {
        content,
        role,
        roleChange,
        backToHomePage,
        roleResp,
        roleRespFinished,
        roleRespUnFinished
    }
})