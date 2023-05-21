<template>

    <div class=" drawer drawer-mobile">
        <input id="my-drawer-2" class="drawer-toggle" type="checkbox"/>
        <div class="drawer-content ">
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
<!--                    search button-->
<!--                    <button class="btn btn-ghost btn-circle">-->
<!--                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"-->
<!--                             xmlns="http://www.w3.org/2000/svg">-->
<!--                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round"-->
<!--                                  stroke-linejoin="round"-->
<!--                                  stroke-width="2"/>-->
<!--                        </svg>-->
<!--                    </button>-->
                    <label class="btn btn-ghost btn-circle avatar" tabindex="0">
                        <div @click="goToTest" class="w-10 rounded-full">
                            <img alt="img" src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"/>
                        </div>
                    </label>
                </div>
            </div>

            <!--            inside-->
            <div v-if="pageStore.content" class="flex max-h-72 my-12">
                <div class="card lg:card-side bg-base-100 shadow-xl w-3/5 mx-8">
                    <figure><img alt="Album" src="/src/assets/任务完成.svg"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">我发布的</h2>
                        <p>在这里查看发布作业提交情况</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-info" @click="goToPublished">查看</button>
                        </div>
                    </div>
                </div>


                <div class="card w-96 bg-base-100 shadow-xl image-full w-2/5 mx-8">
                    <figure><img alt="Shoes" src="/src/assets/任务完成.svg"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">我的任务</h2>
                        <p v-if="notHaveRole">您的任务已全部完成</p>
                        <p v-if="haveRole">您有 {{ roleNumber }} 条任务待完成</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-success" @click="goToMyRole">查看</button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="pageStore.content" class=" flex-none px-36">
                <div class="card lg:card-side bg-base-100 shadow-xl px-24 max-h-64">
                    <figure><img alt="Album" src="../../assets/任务完成.svg"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">加入班级</h2>
                        <p>请输入班级号加入班级</p>
                        <input v-model="classId" class="input input-ghost w-full max-w-xs" placeholder="请输入班级号"
                               type="text"/>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary" @click="addToClass">加入</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fixed bottom-2.5">
                <i class="nes-octocat animate"></i>
            </div>


            <!--            其他组件-->
            <div v-if="pageStore.role">
                <Submit></Submit>
            </div>

            <div v-if="pageStore.published">
                <Worklist></Worklist>
            </div>

        </div>
        <!--        侧边栏-->
        <div class="drawer-side">
            <label class="drawer-overlay" for="my-drawer-2"></label>
            <ul class="menu p-4 w-80 bg-base-200 text-base-content m-0">
                <!-- Sidebar content here -->

                <li><a @click="pageStore.backToHomePage()">Home</a></li>
                <li><a @click="homeStore.classManage">Class Manage</a></li>
                <li><a class="" @click="homeStore.logOut">Log Out</a></li>
            </ul>

        </div>
    </div>


</template>

<script setup>
import {useHomeStore} from "../../stores/index.js";
import {usePageStore} from "../../stores/page.js";
import {onBeforeMount, reactive, ref} from "vue";
import Submit from "./home/Submit.vue";
import axios from "axios";
import Worklist from "./home/Worklist.vue";
import {useTestStore} from "../../stores/test.js";
import router from "../../router/index.js";

const testStore = useTestStore()
const homeStore = useHomeStore()
const pageStore = usePageStore()

let classId = ref("")

// todo 测试 async + axios + router
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

function addToClass() {
    let stuId = JSON.parse(localStorage.getItem("userInfo"))
    let data = {
        classId: Number(classId.value),
        stuId: Number(stuId.stu_id)
    }
    homeStore.addToClass(data)
    classId.value = ""
}

let roleResp = reactive({})
let worklistResp = reactive({})
let notHaveRole = ref(true) // 没有未完成的任务
let haveRole = ref(false) // 有未完成的任务
let roleNumber = ref(0)

async function sendWorklistRespToPage() {
    await axios.post("/path/api/searchworklist",
        {stu_id: JSON.parse(localStorage.getItem("userInfo")).stu_id})
        .then(({data}) => {
            console.log(data.msg)
            worklistResp = data
            pageStore.worklistResp = worklistResp
        })
}

async function sendRoleRespToPage() {
    await axios.post("/path/api/searchrole",
        {stu_id: JSON.parse(localStorage.getItem("userInfo")).stu_id})
        .then(({data}) => {
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

            if (roleRespUnFinished.data.length !== 0) {
                // 未完成任务的数量
                roleNumber.value = roleRespUnFinished.data.length
                console.log("有任务")
                haveRole.value = true
                notHaveRole.value = false
            } else {
                console.log("没有任务")
            }
            pageStore.roleResp = roleResp
        })
}

onBeforeMount(() => {
    homeStore.loadUserInfo()
    sendRoleRespToPage() // 给我的任务页面使用
    sendWorklistRespToPage()
})


function goToMyRole() {
    pageStore.roleChange()
}

function goToPublished() {
    pageStore.publishChange()
}
</script>