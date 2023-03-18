<template>

    <div>

        <div class="hero min-h-screen bg-base-200 nes-container with-title is-centered">
<!--            warn弹窗-->
            <div v-if="warnStatus" class="z-50 absolute top-2.5">
                <div class="alert alert-warning shadow-lg">
                    <div>
                        <svg class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round"
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
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{{ infoMsg }}</span>
                    </div>
                </div>
            </div>

            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">登录罢!</h1>
                    <i class="nes-kirby" @click="loadUserInfo"></i>
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
                                <a class="label-text-alt link link-hover" href="#">Forgot password?</a>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary" @click="Login">Login</button>
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
import {onBeforeMount, reactive, ref} from "vue";
import {useHomeStore} from "../../stores/index.js";
const homeStore = useHomeStore()

let warnMsg = ref("")
let warnStatus = ref(false)
let infoStatus = ref(false)
let infoMsg = ref("")
onBeforeMount(() => {
        if ( !homeStore.loadUserInfo() ) {
            setTimeout(()=>{warnStatus.value = ! warnStatus.value},3000)
        }
        warnStatus.value = homeStore.warnStatus
        warnMsg.value = homeStore.warnMsg

        // todo jwt检测登录状态通过，路由跳转
        console.log(warnMsg.value, warnStatus.value)
})

const data = reactive({
    stu_id: "",
    password: ""
})

async function Login() {
    let returnValue = false
    data.stu_id = Number(data.stu_id) // stu_id int32类型 强制转换为number
    let returnValuePromise = homeStore.userLogin(data)
    await returnValuePromise
        .then(res => {
            returnValue = res
    })

    if (returnValue.code === 0) {
        // 登陆成功
        infoStatus.value = homeStore.infoStatus
        infoMsg.value = homeStore.infoMsg
        console.log(returnValue.data)
        setTimeout(() => {
            infoStatus.value = !infoStatus.value
            homeStore.push({path: "/"})
        }, 1500) // todo 路由跳转
    } else {
        // 登录失败
        console.log(returnValue.data)
    }
}

function loadUserInfo() {
    homeStore.loadUserInfo()
}

// watch(
//     () => data.stu_id,
//     (value, oldValue) => {
//         data.stu_id = value.replace(/\D/g, '')
//         if (data.stu_id.length === 9) {
//             data.stu_id = oldValue
//         }
//     }
// )
</script>