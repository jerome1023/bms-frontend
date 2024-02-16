<template>
    <div class="flex justify-center items-center h-screen">
        <div class="lg:h-auto w-full max-w-md bg-base-gray-200 p-10 rounded-lg shadow-lg m-2">
            <Form :validation-schema="LoginS" @submit="login">
                <div class="flex flex-col items-center mb-7">
                    <h1 class="text-2xl lg:text-3xl">Welcome</h1>
                </div>
                <Alert v-if="status.alert" type="danger" title='Invalid Email or Password'
                    parent-class="col-span-full" />
                <div>
                    <FormGroup label="Email" type="text" name="email" placeholder="sample@email.com" span="col-span-2" />
                    <FormGroup label="Password" type="password" name="password" placeholder="Enter Password"
                        span="col-span-2" />
                </div>
                <div class="mt-5">
                    <button class="btn w-full relative flex justify-center">
                        <Spinner :loading="status.loading"/>
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
import { useAuth } from '~/composables/auth';
import { LoginS } from '~/server/schema';
// nextTick(() => {
//   if (process.client) {
//     useNuxtApp().$toast('notify after nextTick');
//   }
// });\

const status = ref({
    alert: false,
    loading: false
})

const login = async (value: any) => {
    status.value.loading = true
    try {
        const response = await useAuth(value, 'login') as any;
        const { token, status_code, id } = response
        if (status_code === 200) {
            localStorage.setItem('token', token);
            localStorage.setItem('id', id)
            navigateTo('/dashboard')
        }
        else {
            status.value.alert = true
        }
    } catch (error: any) {
        useNuxtApp().$toast.error(error.message);
    }
    status.value.loading = false
}
</script>