<template>

  <div class="flex justify-center items-center">
    <div class="card card-side bg-base-100 shadow-xl">
      <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
      <div class="card-body">
        <h2 v-if="testStore.testValue.code === 0" class="card-title">这个人是{{ testStore.testValue.data[0].class_user.username }} !</h2>
        <p v-if="testStore.testValue.code === 0">OH我的天哪！这个人居然拥有 {{ testStore.testValue.data.length }} 个班级</p>

        <h2 v-if="testStore.testValue.code === 1" class="card-title">这个人是{{ name }} !</h2>
        <p v-if="testStore.testValue.code === 1">OH我的天哪！这个人居然一个班级都没有！</p>
        <div class="card-actions justify-end">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useTestStore} from "../../stores/test.js";
let name = JSON.parse(localStorage.getItem("userInfo")).username
const testStore = useTestStore()
console.log(testStore.testValue)
</script>