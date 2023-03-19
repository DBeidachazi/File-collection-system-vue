<template>
    <div class="flex justify-center items-center">
        <div class="">
            <div class="nes-field is-inline">
                <input id="inline_field" v-model="userRegisterData.name" class="nes-input is-success" placeholder="Username"
                       type="text">
            </div>

            <div class="nes-field is-inline">
                <input id="warning_field" v-model="userRegisterData.stu_id" class="nes-input is-warning" placeholder="StuId"
                       type="text">
            </div>
            <div class="nes-field is-inline">
                <input id="error_field" v-model="userRegisterData.password" class="nes-input is-error" placeholder="Password"
                       type="text">
            </div>
        </div>
    </div>
</template>

<script setup>
import {defineExpose, reactive, watch} from "vue";

let userRegisterData = reactive({
    stu_id: "",
    name: "",
    password: "",
})

function getUser() {
    return userRegisterData
}

function clearUser() {
    userRegisterData.stu_id = ""
    userRegisterData.name = ""
    userRegisterData.password = ""
}

// 暴露子组件方法
defineExpose({
    getUser,
    clearUser
})

watch(
    () => userRegisterData.stu_id,
    (value, oldValue) => {
        userRegisterData.stu_id = value.replace(/\D/g, '')
        if (userRegisterData.stu_id.length === 9) {
            userRegisterData.stu_id = oldValue
        }
    }
)
watch(
    () => userRegisterData.password,
    (value, oldValue) => {
        userRegisterData.password = value.replace(/\s/g, '')
        if (userRegisterData.password.length === 20) {
            userRegisterData.password = oldValue
        }
    }
)
watch(
    () => userRegisterData.name,
    (value, oldValue) => {
        userRegisterData.name = value.replace(/\s/g, '')
        if (userRegisterData.name.length > 15) {
            userRegisterData.name = oldValue
        }
    }
)
</script>
