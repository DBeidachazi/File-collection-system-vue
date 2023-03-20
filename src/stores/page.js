import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";



export const usePageStore = defineStore("",() => {
    let roleResp = reactive(null)
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))

    // fixme axios
    async function searchRole() {
        await axios.post("/path/api/searchrole",  { stu_id: userInfo.stu_id })
            .then(({data}) => { // 析构声明
                roleResp = data
                if (roleResp.code === 1) {
                    console.log("没有任务")
                    // todo something
                } else {
                    console.log("有任务")
                    console.log(roleResp)
                    // todo 修改homepage的文字
                }
            })
        return roleResp
    }

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
        searchRole,
        roleResp,
    }
})