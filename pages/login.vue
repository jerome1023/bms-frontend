<template>
    <div class="flex justify-center items-center h-screen">
        <div class="lg:h-auto w-full max-w-md bg-base-gray-200 p-10 rounded-lg shadow-lg m-2">
            <Form :validation-schema="LoginS" @submit="login">
                <div class="flex flex-col items-center mb-7">
                    <h1 class="text-2xl lg:text-3xl">Welcome</h1>
                </div>
                <Alert v-if="log_status.error" type="danger" title='Invalid Email or Password'
                    parent-class="col-span-full" />
                <div>
                    <FormGroup label="Email" type="text" name="email" placeholder="sample@email.com" span="col-span-2" />
                    <FormGroup label="Password" type="password" name="password" placeholder="Enter Password"
                        span="col-span-2" />
                </div>
                <div class="mt-5">
                    <button class="btn w-full relative flex justify-center">
                        <svg v-if="log_status.loading"
                            class="animate-spin h-5 w-5 mr-1 text-white absolute self-center left-2"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        Login
                    </button>
                </div>
                <h3 class="sm:text-lg">Don't have an account? <a href="/register" class="underline text-blue-100">Register
                        Here</a>
                </h3>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoginS } from '~/server/schema';
// nextTick(() => {
//   if (process.client) {
//     useNuxtApp().$toast('notify after nextTick');
//   }
// });\

const log_status = ref({
    error: false,
    loading: false
})

const login = async (value: any) => {
    log_status.value.loading = true
    try {
        const response = await useLogin(value) as any;
        const { token, firstname, lastname, role, status_code, message } = response
        if (status_code === 200) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify({ firstname, lastname, role }))
            navigateTo('/dashboard')
        }
        else {
            log_status.value.error = true
        }
    } catch (error: any) {
        useNuxtApp().$toast.error(error.message);
    }
    log_status.value.loading = false
}
</script>