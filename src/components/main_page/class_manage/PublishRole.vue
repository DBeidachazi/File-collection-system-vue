<template>

    <div class="overflow-x-auto m-12">
        <div>
            <div class="text-sm breadcrumbs">
                <ul>
                    <li>
                        <a @click="classStore.publishRoleChange()">
                            <svg class="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"></path>
                            </svg>
                            My Class
                        </a>
                    </li>
                    <li>
                        <svg class="w-4 h-4 mr-2 stroke-current" fill="none" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2"></path>
                        </svg>
                        Publish Role
                    </li>
                </ul>
            </div>


            <div v-if="!showPublicRole" class="font-bold text-2xl flex justify-center items-center py-12">
                您还没有管理的班级
            </div>

            <div v-if="showPublicRole" class="flex flex-col justify-center items-center">
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">课程名</span>
                    </label>
                    <input v-model="courseName" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">班级选择</span>
                    </label>
                    <select v-model="classId" class="select select-bordered">
                        <option v-for="respObj in classStore.searchClassResp.data">{{ respObj.class_user.class_id }}</option>
                    </select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">老师名称</span>
                    </label>
                    <input v-model="userName" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">文件类型</span>
                    </label>
                    <input v-model="fileType" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                </div> <br>

                <el-date-picker v-model="deadline" value-format="YYYY-MM-DD HH:mm:ss" type="datetime" placeholder="Select date and time"/> <br>

                <button @click="submit" class="btn btn-active btn-secondary btn-wide">提交</button>
            </div>

        </div>
    </div>

</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {useClassManageStore} from "../../../stores/classManage.js";
const classStore = useClassManageStore()

let stuId = Number(JSON.parse(localStorage.getItem('userInfo')).stu_id)
let courseName = ref('')
let userName = ref('')
let deadline = ref('')
let fileType = ref('')
let classId = ref('')

// 查看用户是否有管理的班级
let showPublicRole = ref(true)
onBeforeMount(() => {
    if (classStore.searchClassResp.code === 1) {
        showPublicRole.value = false
    }
})


async function submit() {
    await classStore.courseCreate(
        {
            stuId: stuId,
            classId: Number(classId.value),
            courseName: courseName.value,
            username: userName.value,
            deadline: deadline.value,
            fileType: fileType.value
        }
    )

    courseName.value = ''
    userName.value = ''
    deadline.value = ''
    fileType.value = ''
    classId.value = ''
}
</script>