<template>
    <div class="flex items-start">
        <div class=" drawer drawer-mobile w-1/5">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center justify-center">
                <!-- Page content here -->
                <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 bg-base-200 text-base-content">
                    <!-- Sidebar content here -->
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>

            </div>
        </div>


        <div class=" navbar bg-base-200">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                        <li><a @click="homeStore.push({path: '/'})">Homepage</a></li>
                        <li><a>班级管理</a></li>
                        <li><a></a></li>

                        <li><a class="" @click="logOut">Log out</a></li>
<!--                        todo 移动到侧边栏 删除此按钮后可以添加一个面包屑，参考那个网页制作-->
                    </ul>
                </div>
            </div>
            <div class="navbar-center">
                <a class="btn btn-ghost normal-case text-xl">File-collection</a>
            </div>
            <div class="navbar-end">
                <button class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="" alt="img"/>
                    </div>
                </label>
            </div>
        </div>
    </div>



</template>

<script setup>
import {useHomeStore} from "../../stores/index.js";
import {onBeforeMount} from "vue";
const homeStore = useHomeStore()
onBeforeMount(() => {
    homeStore.loadUserInfo()
})




function logOut() {
    localStorage.removeItem("userInfo")
    homeStore.push({path: '/'})
}
</script>