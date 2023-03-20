<template>
    <div class="overflow-x-auto m-12">
        <div >
            <div class="text-sm breadcrumbs">
                <ul>
                    <li>
                        <a @click="pageStore.roleChange()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        My Role
                    </li>
                </ul>
            </div>



            <div class="dropdown dropdown-hover">
                <label tabindex="0" class="btn m-1 my-4">select</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-box w-52">
                    <li><a>全部</a></li>
                    <li><a>已提交</a></li>
                    <li><a>未提交</a></li>
                </ul>
            </div>
        </div>

        <table class="table table-zebra w-full">
            <!-- head -->
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->
            <tr>
                <th>1</th>
                <td>Cy </td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
            </tr>

            <!-- row 1 -->
            <tr>
                <th>1</th>
                <td>Cy </td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
            </tr>

            <!-- row 1 -->
            <tr>
                <th>1</th>
                <td>Cy </td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
            </tr>

            </tbody>
        </table>
    </div>
</template>


<script setup>
import {usePageStore} from "../../../stores/page.js";
import {onBeforeMount} from "vue";
let pageStore = usePageStore()

// fixme 无法正确获取到pageStore.roleResp
onBeforeMount(  () => {
    pageStore.searchRole()
})
console.log(pageStore.roleResp) // 打印出 null


</script>