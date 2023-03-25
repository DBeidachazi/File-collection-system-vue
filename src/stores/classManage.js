import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";



export const useClassManageStore = defineStore("classManageStore", () => {
    let content = ref(true)
    let classManage = ref(false)
    let publishRole = ref(false)
    function classManageChange() {
        content.value = !content.value
        classManage.value = !classManage.value
    }
    function publishRoleChange() {
        publishRole.value = !publishRole.value
        content.value = !content.value
    }

    // searchClass
    let getStuId = JSON.parse(localStorage.getItem("userInfo")).stu_id
    let searchClassResp = reactive({})

    async function createClass(data) {
        await axios.post("/path/api/classcreate", data)
            .then(({data}) => {
                console.log(data)
            })
    }

    return {
        classManageChange,
        publishRoleChange,
        createClass,

        getStuId,
        searchClassResp,
        content,
        classManage,
        publishRole
    }
})