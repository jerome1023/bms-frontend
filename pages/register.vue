<template>
    <div class="flex justify-center items-center lg:h-screen">
        <div class="lg:h-auto w-auto bg-base-gray-200 p-10 m-2 rounded-lg shadow-lg m-2">
            <Form @submit="register" v-slot="{ values }">
                <div class="flex flex-col items-center mb-7">
                    <h1 class="text-2xl sm:text-4xl">Create an account</h1>
                    <h3 class="sm:text-lg">Already have an account? <a href="/login" class="underline text-blue-100">Login</a>
                    </h3>
                </div>
                <div class="sm:grid grid-cols-6 gap-3">
                    <div class="col-span-2">
                        <FormGroup label="Firstname" type="text" name="firstname" />
                    </div>
                    <div class="col-span-2">
                        <FormGroup label="Middlename" type="text" name="middlename" />
                    </div>
                    <div class="col-span-2">
                        <FormGroup label="Lastname" type="text" name="lastname" />
                    </div>
                    <div class="col-span-3">
                        <FormGroup label="Gender" type="select"
                            :options="[{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }]"
                            name="gender" />
                    </div>
                    <div class="col-span-3">
                        <FormGroup label="Address" type="text" name="address" />
                    </div>
                    <div class="col-span-full">
                        <FormGroup label="Email" type="text" name="email" />
                    </div>
                    <div class="col-span-3">
                        <FormGroup label="Password" type="text" name="password" />
                    </div>
                    <div class="col-span-3">
                        <FormGroup label="Confirm Password" type="text" name="confirm_password" />
                    </div>
                </div>
                <div class="mt-5">
                    <button class="btn w-full">Register</button>
                </div>
                <pre>{{ values }}</pre>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'

const register = () => {
    console.log('Register Success');
}
</script>