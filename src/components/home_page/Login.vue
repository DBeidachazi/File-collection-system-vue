<template>

    <div>

        <div class="hero min-h-screen bg-base-200 nes-container with-title is-centered">
            <!--            warn弹窗-->
            <div v-if="warnStatus" class="z-50 absolute top-2.5">
                <div class="alert alert-warning shadow-lg">
                    <div>
                        <svg class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"/>
                        </svg>
                        <span>{{ warnMsg }}</span>
                    </div>
                </div>
            </div>

            <!--            info弹窗-->
            <div v-if="infoStatus" class="z-50 absolute top-2.5">
                <div class="alert alert-success shadow-lg">
                    <div>
                        <svg class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"/>
                        </svg>
                        <span>{{ infoMsg }}</span>
                    </div>
                </div>
            </div>

            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">登录罢!</h1>
                    <i class="nes-kirby" @click="kirby"></i>
                    <p class="py-6">
                        你是否还有心追求真理？你是否还有勇气反抗黑暗？你是否还有朋友与你同行？如果有，请勇敢地输入账号密码，加入我们的呐喊吧！</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">stuid</span>
                            </label>
                            <input v-model="data.stu_id" class="input input-bordered" placeholder="stuid" type="text"/>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">password</span>
                            </label>
                            <input v-model="data.password" class="input input-bordered" placeholder="password"
                                   type="text"/>
                            <label class="label">
                                <!--                                open label-->
                                <label class="label-text-alt link link-hover" for="register">Sign Up</label>

                                <!--                                label-->
                                <input id="register" class="modal-toggle" type="checkbox"/>
                                <div class="modal modal-bottom sm:modal-middle">
                                    <div class="modal-box">
                                        <h3 class="font-bold text-lg">请填入您的姓名学号和密码</h3>
                                        <Register ref="childRegister"></Register>
                                        <div class="modal-action">
                                            <label class="btn btn-ghost" for="register">Cancel</label>
                                            <label class="btn" for="register" @click="register">Sign In</label>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary" @click="Login">SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fixed bottom-2">
                <i class="nes-mario py-20 px-4"></i>
                <i class="nes-ash py-16 "></i>
                <i class="nes-pokeball px-40"></i>
                <i class="nes-bulbasaur px-4"></i>
                <i class="nes-charmander py-16"></i>
                <i class="nes-squirtle py-20 px-4"></i>

            </div>
        </div>
    </div>

</template>

<!--suppress JSValidateTypes -->
<script setup>
import {onBeforeMount, reactive, ref, watch} from "vue";
import {useHomeStore} from "../../stores/index.js";
import kirby from "./kirby.js";
import Register from "./Register.vue";

const homeStore = useHomeStore()
// 定义子组件实例
const childRegister = ref(null)

const data = reactive({
    stu_id: "",
    password: ""
})
let userRegisterData = reactive({
    stu_id: "",
    name: "",
    password: "",
})

let warnMsg = ref("")
let warnStatus = ref(false)
let infoStatus = ref(false)
let infoMsg = ref("")
onBeforeMount(() => {
    if (!homeStore.loadUserInfo()) {
        homeWarn()
    }
})

async function Login() {
    let returnValue = {}
    data.stu_id = Number(data.stu_id) // stu_id int32类型 强制转换为number
    let returnValuePromise = homeStore.userLogin(data)
    await returnValuePromise
        .then(res => {
            returnValue = res
        })
    if (returnValue.code === 0) {
        // 登陆成功
        homeInfo(returnValue)
    } else {
        // 登录失败
        homeWarn()
        console.log(returnValue.msg)
    }
}

async function register() {
    let returnValue = {}
    // 调用子组件方法
    userRegisterData = childRegister.value.getUser()

    userRegisterData.stu_id = Number(userRegisterData.stu_id)
    let returnValuePromise = homeStore.userRegister(userRegisterData)
    await returnValuePromise
        .then(res => {
            returnValue = res
        })
    if (returnValue.code === 0) {
        // success
        homeInfo(returnValue, "noRoute")
    } else {
        // failed
        homeWarn()
        console.log(returnValue.msg)
    }
    // 然后清除用户输入内容
    childRegister.value.clearUser()
}

// 警告提示
function homeWarn() {
    warnStatus.value = homeStore.warnStatus
    warnMsg.value = homeStore.warnMsg
    setTimeout(() => {
        warnStatus.value = !warnStatus.value;
    }, 3000)
}

// 信息提示
function homeInfo(returnValue, noRoute) {
    infoStatus.value = homeStore.infoStatus
    infoMsg.value = homeStore.infoMsg
    console.log(returnValue.msg)
    if (noRoute == null) {
        setTimeout(() => {
            infoStatus.value = !infoStatus.value
            homeStore.push({path: "/page"})
        }, 1000) // todo 路由跳转
    }

}

watch(
    () => data.stu_id,
    (value, oldValue) => {
        data.stu_id = value.replace(/\D/g, '')
        if (data.stu_id.length === 9) {
            data.stu_id = oldValue
        }
    }
)
watch(
    () => data.password,
    (value, oldValue) => {
        data.password = value.replace(/\s/g, '')
        if (data.password.length === 20) {
            data.password = oldValue
        }
    }
)
</script>