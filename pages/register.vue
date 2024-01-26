<template>
    <div class="flex justify-center items-center lg:h-screen">
        <div class="lg:h-auto w-full max-w-3xl bg-base-gray-200 p-10 m-2 rounded-lg shadow-lg">
            <Form :validation-schema="RegisterS"  @submit="register" v-slot="{ values }" >
                <div class="flex flex-col items-center mb-7">
                    <h1 class="text-2xl sm:text-4xl">Create an account</h1>
                    <h3 class="sm:text-lg">Already have an account? <a href="/login"
                            class="underline text-blue-100">Login</a>
                    </h3>
                </div>
                <div class="sm:grid grid-cols-6 gap-x-3">
                    <FormGroup label="Firstname" type="text" name="firstname" span="col-span-3"/>
                    <FormGroup label="Lastname" type="text" name="lastname" span="col-span-3"/>
                    <FormGroup label="Address" type="text" name="address" span="col-span-full"/>
                    <FormGroup label="Gender" type="select"
                        :options="options" name="gender" span="col-span-3"/>
                    <FormGroup label="Email" type="text" name="email" span="col-span-3"/>
                    <FormGroup label="Password" type="password" name="password" placeholder="Password" span="col-span-3"/>
                    <FormGroup label="Confirm Password" type="password" placeholder="Confirm Password" name="confirm_password" span="col-span-3"/>
                </div>
                <div class="mt-5">
                    <button class="btn w-full">Register</button>
                </div>
                <!-- <pre>{{ values }}</pre> -->
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { RegisterS } from '~/server/schema';

const register = () => {
    console.log('Register Success');
}

const options = [
    { 
        text: 'Male', 
        value: 'male' 
    }, 
    { 
        text: 'Female', 
        value: 'female' 
    }
]
</script>