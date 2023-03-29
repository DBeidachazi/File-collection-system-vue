<template>
    <div class="overflow-x-auto m-12">
        <div>
            <div class="text-sm breadcrumbs">
                <ul>
                    <li>
                        <a @click="pageStore.roleChange()">
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
                        My Role
                    </li>
                </ul>
            </div>


            <div class="dropdown dropdown-hover">
                <label class="btn m-1 my-4" tabindex="0">select</label>
                <ul class="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52" tabindex="0">
                    <li @click="all"><a>全部</a></li>
                    <li @click="finished"><a>已提交</a></li>
                    <li @click="unfinished"><a>未提交</a></li>
                </ul>
            </div>
        </div>

        <table class="table table-zebra w-full text-center">
            <!-- head -->
            <thead>
            <tr>
                <th>任务ID</th>
                <th>课程名</th>
                <th>课程ID</th>
                <th>班级ID</th>
                <th>完成状态</th>
                <th>截止时间</th>
                <th>文件类型</th>
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-show="allTable" v-for="(respObj, index) in pageStore.roleResp.data">
                <th>{{ respObj.role_id }}</th>
                <th>{{ respObj.role_name }}</th>
                <th>{{ respObj.course_id }}</th>
                <th>{{ respObj.class_id }}</th>
                <th>{{ respObj.status }}</th>
                <th>{{ respObj.deadline.replace("T", " ").replace("+08:00", "") }}</th>
                <th>{{ respObj.file_type }}</th>
                <th>
<!--                    @click 清空选择文件-->
                    <input ref="file" @click="e => {e.target.value = '';}" type="file" @change="uploadFile(respObj, index)" class="file-input file-input-ghost w-full max-w-xs" />
                </th>

            </tr>
            <tr v-show="finishedTable" v-for="respObj in pageStore.roleRespFinished.data">
                <th>{{ respObj.role_id }}</th>
                <th>{{ respObj.role_name }}</th>
                <th>{{ respObj.course_id }}</th>
                <th>{{ respObj.class_id }}</th>
                <th>{{ respObj.status }}</th>
                <th>{{ respObj.deadline.replace("T", " ").replace("+08:00", "") }}</th>
                <th>{{ respObj.file_type }}</th>
                <th>
                    <input ref="file" @click="e => {e.target.value = '';}" type="file" @change="uploadFile(respObj, index)" class="file-input file-input-ghost w-full max-w-xs" />
                </th>
            </tr>
            <tr v-show="unFinishedTable" v-for="respObj in pageStore.roleRespUnFinished.data">
                <th>{{ respObj.role_id }}</th>
                <th>{{ respObj.role_name }}</th>
                <th>{{ respObj.course_id }}</th>
                <th>{{ respObj.class_id }}</th>
                <th>{{ respObj.status }}</th>
                <th>{{ respObj.deadline.replace("T", " ").replace("+08:00", "") }}</th>
                <th>{{ respObj.file_type }}</th>
                <th>
                    <input ref="file" @click="e => {e.target.value = '';}" type="file" @change="uploadFile(respObj, index)" class="file-input file-input-ghost w-full max-w-xs" />
                </th>
            </tr>


            </tbody>
        </table>
    </div>

</template>


<script setup>
import {usePageStore} from "../../../stores/page.js";
import {reactive, ref} from "vue";
import axios from "axios";

let pageStore = usePageStore()

// declare a ref to hold the element reference
// the name must match template ref value
const file = ref(null)

let roleResp = reactive({})

async function searchRole() {
    await axios.post("/path/api/searchrole",
        {stu_id: JSON.parse(localStorage.getItem("userInfo")).stu_id})
        .then(
            ({data}) => {
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].status === 2) {
                        data.data[i].status = "未完成"
                    } else if (data.data[i].status === 1) {
                        data.data[i].status = "已完成"
                    }
                }
                roleResp = data

                // finished
                let roleRespFinished = JSON.parse(JSON.stringify(data))
                for (let i = 0; i < roleRespFinished.data.length; i++) {
                    if (roleRespFinished.data[i].status === "未完成") {
                        roleRespFinished.data.splice(i, 1)
                        i--
                    }
                }
                pageStore.roleRespFinished = roleRespFinished

                // unfinished
                let roleRespUnFinished = JSON.parse(JSON.stringify(data))
                // todo 为什么先打印的会是后面的代码执行后的结果
                console.log(roleRespUnFinished)
                for (let i = 0; i < roleRespUnFinished.data.length; i++) {
                    if (roleRespUnFinished.data[i].status === "已完成") {
                        roleRespUnFinished.data.splice(i, 1)
                        i--
                    }
                }
                pageStore.roleRespUnFinished = roleRespUnFinished

                pageStore.roleResp = roleResp

                // todo page页面我的任务内容更改
            })
}
async function uploadFile(respObj, index) {
    // todo 上传file
    // console.log(respObj)
    let postFile = file.value[index].files[0]
    console.log(postFile)

    let fileType = pageStore.roleResp.data[index].file_type
    let splitFileType = postFile.name.split('.')
    splitFileType = splitFileType[splitFileType.length - 1]
    if (splitFileType !== fileType) {
        console.log(splitFileType + "不是" + fileType + "类型")
        return
    }

    let form = new FormData()
    form.append("file", postFile)

    await pageStore.fileUpload(respObj, form)

    searchRole()
}

let allTable = ref(true)
let finishedTable = ref(false)
let unFinishedTable = ref(false)
function all() {
    allTable.value = true
    finishedTable.value = false
    unFinishedTable.value = false
}
function finished() {
    finishedTable.value = true
    allTable.value = false
    unFinishedTable.value = false
}
function unfinished() {
    unFinishedTable.value = true
    finishedTable.value = false
    allTable.value = false
}

</script>