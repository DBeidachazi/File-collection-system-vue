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
                <th></th>
            </tr>
            </thead>
            <tbody>

            <tr v-show="allTable" v-for="respObj in pageStore.roleResp.data">
                <th>{{ respObj.role_id }}</th>
                <th>{{ respObj.role_name }}</th>
                <th>{{ respObj.course_id }}</th>
                <th>{{ respObj.class_id }}</th>
                <th>{{ respObj.status }}</th>
                <th>{{ respObj.deadline.replace("T", " ").replace("+08:00", "") }}</th>
                <th>
<!--                    @click 清空选择文件-->
                    <input ref="file" @click="e => {e.target.value = '';}" type="file" @change="uploadFile(respObj)" class="file-input file-input-ghost w-full max-w-xs" />
                </th>

            </tr>
            <tr v-show="finishedTable" v-for="respObj in pageStore.roleRespFinished.data">
                <th>{{ respObj.role_id }}</th>
                <th>{{ respObj.role_name }}</th>
                <th>{{ respObj.course_id }}</th>
                <th>{{ respObj.class_id }}</th>
                <th>{{ respObj.status }}</th>
                <th>{{ respObj.deadline.replace("T", " ").replace("+08:00", "") }}</th>
                <th>
                    <button class="btn btn-ghost btn-x">提交</button>
                </th>
            </tr>
            <tr v-show="unFinishedTable" v-for="respObj in pageStore.roleRespUnFinished.data">
                <th>{{ respObj.role_id }}</th>
                <th>{{ respObj.role_name }}</th>
                <th>{{ respObj.course_id }}</th>
                <th>{{ respObj.class_id }}</th>
                <th>{{ respObj.status }}</th>
                <th>{{ respObj.deadline.replace("T", " ").replace("+08:00", "") }}</th>
                <th>
                    <button class="btn btn-ghost btn-x">提交</button>
<!--                    <input type="file" class="file-input file-input-ghost w-full max-w-xs" />-->
                </th>
            </tr>


            </tbody>
        </table>
    </div>

</template>


<script setup>
import {usePageStore} from "../../../stores/page.js";
import {onMounted, ref} from "vue";

let pageStore = usePageStore()

// declare a ref to hold the element reference
// the name must match template ref value
const file = ref(null)
function uploadFile(respObj) {
    // todo 上传file
    console.log(respObj)
    console.log(file.value)
}

// let stu_id = JSON.parse(localStorage.getItem("user")).stu_id
// function changeAction(respObj) {
//     action.value = "/path/api/upload/" + respObj.class_id + "/" + stu_id + "/" + respObj.course_id
// }


onMounted(() => {

})

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