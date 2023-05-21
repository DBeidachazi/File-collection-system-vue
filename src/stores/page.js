import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import router from "../router/index.js";
import axios from "axios";


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
    }


    // 文件上传
    async function fileUpload(respObj, form) {
        // todo change this interface, add /api, not information
        let url = `/path/api/upload/${respObj.class_id}/${respObj.stu_id}/${respObj.course_id}`
        await axios.post(url, form).then(
            ({data}) => {
                console.log(data)
            }
        )
    }

    async function deleteCourse(course_id) {
        await axios.post("/path/api/coursedelete", course_id)
            .then( ({data}) => {
                console.log(data)
            })
    }

    let courseId = ref('')
    let classId = ref('')

    const downloadCourse = async (data) => {
        courseId.value = data.courseId
        classId.value = data.classId
        let url = '/path/api/filedownload'
        await axios({
            method: "post",
            url,
            data: data,
            responseType: 'blob',
            headers:{ 'Content-Type': 'application/json; application/octet-stream'}
        })
            .then( ({data}) => {
                let url = window.URL.createObjectURL(new Blob([data]))
                let a = document.createElement('a')
                a.style.display = 'none'
                a.href = url
                a.setAttribute('download',classId.value + '_' + courseId.value +'.zip')
                document.body.appendChild(a)
                a.click() //执行下载
                window.URL.revokeObjectURL(a.href)
                document.body.removeChild(a)
            })
    }


    return {
        roleChange,
        backToHomePage,
        publishChange,
        fileUpload,
        deleteCourse,
        downloadCourse,

        published,
        content,
        role,
        roleResp,
        roleRespFinished,
        roleRespUnFinished,
        worklistResp,

    }
})