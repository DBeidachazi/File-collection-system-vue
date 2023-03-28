<template>
    <div class="overflow-x-auto m-12">
        <div class="  overflow-hidden">
            <div class="text-sm breadcrumbs">
                <ul>
                    <li>
                        <a @click="classStore.goToContent()">
                            <svg class="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"></path>
                            </svg>
                            My Class
                        </a>
                    </li>
                    <li>
                        <a @click="classStore.goToClassManage()">
                            <svg class="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"></path>
                            </svg>
                            Class Manage
                        </a>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        &nbsp Class Student Manage
                    </li>
                </ul>
            </div>

            <table class="table table-zebra w-full text-center">
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>学号</th>
                    <th>权限</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="respObj in classStore.classManageStudentsResp.data">
                    <th>{{ respObj.username}}</th>
                    <th>{{ respObj.stu_id }}</th>
                    <th>{{ respObj.permission_type }}</th>
                    <th class="dropdown dropdown-top dropdown-end block">
                        <label tabindex="0" class="btn btn-ghost">····</label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52">
                            <li @click="deleteStu(respObj)"><a>删除</a></li>
                            <li @click="modifyStu(respObj)"><a>修改权限</a></li>
                        </ul>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script setup>
import {useClassManageStore} from "../../../stores/classManage.js";
import {useHomeStore} from "../../../stores/index.js";
const homeStore = useHomeStore()
const classStore = useClassManageStore()

async function deleteStu(respObj) {
    let data = {
        class_id: Number(respObj.class_id),
        stu_id: Number(respObj.stu_id)
    }
    await classStore.deleteStudents(data)
    goToClassStudentManage(respObj)
}
async function modifyStu(respObj) {
    let stuId = JSON.parse(localStorage.getItem("userInfo")).stu_id
    let permission = null
    if(respObj.permission_type === "管理员"){
        permission = 0
    }else if(respObj.permission_type === "学生"){
        permission = 1
    }
    let data = {
        classId: Number(respObj.class_id),
        modifyStuId: Number(respObj.stu_id),
        stuId: Number(stuId),
        permission: permission
    }

    await classStore.modifyStudent(data)

    goToClassStudentManage(respObj)



}
function goToClassStudentManage(respObj) {
    classStore.goToClassManageStudents(respObj.class_id).then(
        res => {
            classStore.classManageStudentsResp = res
        }
    )
}

</script>
