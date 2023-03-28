<template>
    <div class="overflow-x-auto m-12">
        <div class="  overflow-hidden">
            <div class="text-sm breadcrumbs">
                <ul>
                    <li>
                        <a @click="classStore.classManageChange()">
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
                        Class Manage
                    </li>
                </ul>
            </div>

            <div class="flex">
                <div class="left w-3/5">
                    <table class="table table-zebra w-full text-center">
                        <thead>
                        <tr>
                            <th>班级ID</th>
                            <th>班级名称</th>
                            <th></th>       <!-- 操作 -->
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="respObj in classStore.searchClassResp.data">
                                <th>{{ respObj.class_user.class_id }}</th>
                                <th>{{ respObj.class_name }}</th>

                                <th class="dropdown dropdown-top dropdown-end block">
                                    <label tabindex="0" class="btn btn-ghost">····</label>
                                    <ul class="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52" tabindex="0">
                                        <li @click="deleteClass(respObj.class_user.class_id)"><a>删除</a></li>
                                        <li @click="goToClassStudentManage(respObj);"><a>学生管理</a></li>
                                    </ul>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="right grid grid-cols-5 grid-rows-4 gap-y-4 w-2/5 h-2/5">
<!--                    todo 调整创建班级样式 -->
                    <div class="col-start-3">创建班级</div>
                    <input v-model="classId" type="text" placeholder="六位班级号" class="row-start-2 col-start-2 col-end-5 input input-bordered input-accent w-full max-w-xs" />
                        <input v-model="className" type="text" placeholder="班级名称" class="row-start-3 col-start-2 col-end-5 input input-bordered input-info w-full max-w-xs" />
                        <button @click="createClass" class="row-start-4 col-start-2 col-end-5 btn btn-success">创建</button>
                </div>
            </div>



        </div>
    </div>

</template>

<script setup>
import {ref, watch} from "vue";
import {useClassManageStore} from "../../../stores/classManage.js";
import {useHomeStore} from "../../../stores/index.js";
const classStore = useClassManageStore()
const homeStore = useHomeStore()
const emit = defineEmits(['searchClass'])
function searchClass() {
    emit('searchClass')
}


let classId = ref("")
watch(classId, (newValue, oldValue) => {
    classId.value = newValue.replace(/\D/g, '')
    if (classId.value.length >= 7) {
        classId.value = oldValue
    }
})
let stuId = classStore.getStuId
let className = ref("")
watch(className, (newValue, oldValue) => {
    if (className.value.length >= 15) {
        className.value = oldValue
    }
})

async function createClass() {
    // 判空
    if (classId.value === "" || className.value === "") {
        alert("班级号或班级名不能为空")
        return
    }
    // 判断班级号是否已经存在
    searchClass()

    if (classStore.searchClassResp.data.code === 0) {
        for (let respObj of classStore.searchClassResp.data) {
            if (respObj.class_user.class_id === Number(classId.value)) {
                alert("该班级号已经存在")
                return
            }
        }
    }

    await classStore.createClass({
        classId: Number(classId.value),
        stuId,
        className: className.value
    })
    classId.value = ""
    className.value = ""
    // 刷新班级列表
    searchClass()
}

async function deleteClass(class_id) {
    await classStore.deleteClass({
        class_id: Number(class_id),
    })
    await homeStore.push({path: '/blank'})
    await homeStore.push({path: '/class_manage'})
    // 刷新班级列表
    searchClass()

}


// 将异步操作return一个promise对象，然后在then中获取值并在仓库中存储
function goToClassStudentManage(respObj) {
    classStore.goToClassManageStudents(respObj.class_user.class_id).then(
        res => {
            classStore.classManageStudentsResp = res
        }
    )
}
</script>