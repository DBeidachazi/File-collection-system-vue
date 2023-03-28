import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import axios from "axios";



export const useClassManageStore = defineStore("classManageStore", () => {
    let content = ref(true)
    let classManage = ref(false)
    let classManageStudents = ref(false)
    let publishRole = ref(false)
    let classManageStudentsResp = reactive({})
    async function deleteStudents(data) {
        await axios.post("/path/api/classuserdelete", data)
            .then(({data}) => {
                console.log(data)
            })
        return data
    }
    async function modifyStudent(data) {
        // console.log(data)
        await axios.post("/path/api/classusermodify", data)
            .then(({data}) => {
                // console.log(data)
            })
        return data
    }
    async function searchClassStudents(data) {
        return classManageStudentsResp = await axios.post("/path/api/classsearchuser", data)
            .then(({data}) => {
                // console.log(data)
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].permission_type === 0) {
                        data.data[i].permission_type = "学生"
                    } else {
                        data.data[i].permission_type = "管理员"
                    }
                }
                return data
            })
    }
    async function goToClassManageStudents(class_id) {
        let data = {
            class_id: Number(class_id)
        }
        // 查询班级学生
        classManageStudents.value = true
        content.value = false
        classManage.value = false
        return await searchClassStudents(data)
    }

    function goToClassManage() {
        classManage.value = true
        classManageStudents.value = false
        content.value = false
    }
    function goToContent() {
        content.value = true
        classManage.value = false
        classManageStudents.value = false
    }
    function classManageChange() {
        content.value = !content.value
        classManage.value = !classManage.value
    }
    function publishRoleChange() {
        content.value = !content.value
        publishRole.value = !publishRole.value
    }

    // searchClass
    let getStuId = JSON.parse(localStorage.getItem("userInfo")).stu_id
    let searchClassResp = reactive({})
    function getStuIdFunc() {
        getStuId = JSON.parse(localStorage.getItem("userInfo")).stu_id
    }

    async function createClass(data) {
        await axios.post("/path/api/classcreate", data)
            .then(({data}) => {
                console.log(data)
            })
    }

    // deleteClass
    async function deleteClass(data) {
        console.log(data)
        await axios.post("/path/api/classdelete", data)
            .then(({data}) => {
                console.log(data)
            })
    }
    async function courseCreate(data) {
        console.log(data)
        await axios.post("/path/api/coursecreate", data)
            .then(({data}) => {
                console.log(data)
            })
    }

    return {
        classManageChange,
        publishRoleChange,
        createClass,
        getStuIdFunc,
        deleteClass,
        goToClassManageStudents,
        goToClassManage,
        goToContent,
        searchClassStudents,
        modifyStudent,
        deleteStudents,
        courseCreate,

        classManageStudentsResp,
        classManageStudents,
        getStuId,
        searchClassResp,
        content,
        classManage,
        publishRole
    }
})