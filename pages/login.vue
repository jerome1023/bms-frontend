<template>
    <div class="flex justify-center items-center h-screen">
        <div class="lg:h-auto w-full max-w-md bg-base-gray-200 p-10 rounded-lg shadow-lg">
            <Form @submit="login" v-slot="{ values }">
                <div class="flex flex-col items-center mb-7">
                    <h1 class="text-2xl lg:text-3xl">Welcome</h1>
                </div>
                <div>
                    <FormGroup label="Email" type="text" name="email" span="col-span-2" />
                    <FormGroup label="Password" type="text" name="password" span="col-span-2" />
                </div>
                <div class="mt-5">
                    <button class="btn w-full">Login</button>
                </div>
                <h3 class="sm:text-lg">Don't have an account? <a href="/register"
                        class="underline text-blue-100">Register Here</a>
                </h3>
                <!-- <pre>{{ values }}</pre> -->
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'

const login = (value: any) => {
    console.log('Login Success', value);
}
</script>