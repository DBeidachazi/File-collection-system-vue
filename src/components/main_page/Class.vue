<template>

    <div class=" drawer drawer-mobile">
        <input id="my-drawer-2" class="drawer-toggle" type="checkbox"/>
        <div class="drawer-content">
            <!-- Page content here -->
            <!--            navbar-->
            <div class=" navbar bg-base-200">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label class="btn btn-ghost btn-circle" for="my-drawer-2" tabindex="0">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6h16M4 12h16M4 18h7" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"/>
                            </svg>
                        </label>
                    </div>
                </div>

                <div class="navbar-center">
                    <a class="btn btn-ghost normal-case text-xl">File-collection</a>
                </div>
                <div class="navbar-end">
                  <label class="btn btn-ghost btn-circle avatar" tabindex="0">
                    <div @click="goToTest" class="w-10 rounded-full">
                      <img alt="img" src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"/>
                    </div>
                  </label>
                </div>
            </div>

<!--            inside-->
            <div v-if="classStore.content" class="flex max-h-72 my-12">
                <div class="card lg:card-side bg-base-100 shadow-xl w-3/5 mx-8">
                    <figure><img alt="Album" src="/src/assets/任务完成.svg"/></figure>
                    <div class="card-body">
                        <h2 @click="goToClassManage" class="card-title">班级管理</h2>
                        <p>在这里创建班级或是管理班级</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-info" @click="goToClassManage">查看</button>
                        </div>
                    </div>
                </div>

                <div class="card w-96 bg-base-100 shadow-xl image-full w-2/5 mx-8">
                    <figure><img alt="Shoes" src="/src/assets/任务完成.svg"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">发布任务</h2>
                        <p>向您管理的班级发布任务</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-success" @click="goToPublishRole">查看</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--            其他组件-->
            <div v-if="classStore.classManage" >
                   <ClassManage @searchClass="searchClass" class=""></ClassManage>
            </div>

            <div v-if="classStore.classManageStudents">
                <ClassStudentManage></ClassStudentManage>
            </div>

            <div v-if="classStore.publishRole">
                <PublishRole></PublishRole>
            </div>
        </div>

        <!--        侧边栏-->
        <div class="drawer-side">
            <label class="drawer-overlay" for="my-drawer-2"></label>
            <ul class="menu p-4 w-80 bg-base-200 text-base-content m-0">
                <!-- Sidebar content here -->

                <li><a @click="pageStore.backToHomePage">Home</a></li>
                <li><a @click="homeStore.classManage">Class Manage</a></li>
                <li><a class="" @click="homeStore.logOut">Log Out</a></li>
            </ul>

        </div>
    </div>

</template>

<script setup>
import {usePageStore} from "../../stores/page.js";
import {useHomeStore} from "../../stores/index.js";
import {useClassManageStore} from "../../stores/classManage.js";
import ClassManage from "./class_manage/ClassManage.vue";
import PublishRole from "./class_manage/PublishRole.vue";
import {onBeforeMount} from "vue";
import axios from "axios";
import ClassStudentManage from "./class_manage/ClassStudentManage.vue";
import router from "../../router/index.js";
import {useTestStore} from "../../stores/test.js";
const classStore = useClassManageStore()
const homeStore = useHomeStore()
const pageStore = usePageStore()
const testStore = useTestStore()


onBeforeMount(() => {
    searchClass()
})

async function searchClass() {
    // 重新parseStuId
    classStore.getStuIdFunc()
    await axios.post("/path/api/classsearch", {"stu_id": classStore.getStuId})
        .then(({data}) => {
            console.log(data)
            classStore.searchClassResp = data
        })
}

function goToClassManage() {
    classStore.classManageChange()
}
function goToPublishRole() {
    classStore.publishRoleChange()
}
const goToTest = async () => {
  let stu_id = JSON.parse(localStorage.getItem("userInfo")).stu_id
  await axios.post("/path/api/classsearch", {
    stu_id
  }).then( ({data}) => {
    console.log(data)
    testStore.testValue = data
  })
  console.log("in page.vue: " ,  testStore.testValue)
  await router.push({path: '/information'})
}
</script>
