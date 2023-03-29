<template>
    <div class="overflow-x-auto m-12">
        <div>
            <div class="text-sm breadcrumbs">
                <ul>
                    <li>
                        <a @click="pageStore.publishChange">
                            <svg class="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"></path>
                            </svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <svg class="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2"></path>
                        </svg>
                        Published
                    </li>
                </ul>
            </div>

        </div>

        <table class="table table-zebra w-full text-center">
            <!-- head -->
            <thead>
            <tr>
                <th>课程ID</th>
                <th>课程名</th>
                <th>提交人数</th>
                <th>截止时间</th>
                <th></th>          <!-- 下载 -->
                <th></th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="respObj in pageStore.worklistResp.data">
                    <th>{{ respObj.course_id }}</th>
                    <th>{{ respObj.course_name }}</th>
                    <th>{{ respObj.status }}</th>
                    <th>{{ respObj.deadline.replace("T", " ").replace("+08:00", "") }}</th>
                    <th>
                        <button @click="downloadCourse(respObj)" class="btn btn-ghost btn-xl">下载</button>
                    </th>
                    <th>
                        <button @click="deleteCourse(respObj)" class="btn btn-ghost btn-xl">删除</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {usePageStore} from "../../../stores/page.js";
import axios from "axios";
import {reactive} from "vue";
const pageStore = usePageStore()

let worklistResp = reactive({})

const sendWorklistRespToPage = () => {
    axios.post("/path/api/searchworklist",
        {stu_id: JSON.parse(localStorage.getItem("userInfo")).stu_id})
        .then(({data}) => {
            console.log(data.msg)
            worklistResp = data
            pageStore.worklistResp = worklistResp
        })
}

const deleteCourse = async (respObj) => {
    await pageStore.deleteCourse({
        course_id: respObj.course_id
    })

    sendWorklistRespToPage()
}

const downloadCourse = async (respObj) => {
    console.log(respObj)
    await pageStore.downloadCourse({
        courseId: respObj.course_id,
        stuId: respObj.stu_id,
        classId: respObj.class_id
    })
}

</script>