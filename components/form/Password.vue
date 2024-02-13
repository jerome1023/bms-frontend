<template>
    <div class="w-full rounded-md border-0 overflow-hidden py-2 px-3 flex items-center shadow-sm ring-1 ring-inset ring-base-green">
        <Field as="input" :type="isShow ? 'text' : 'password'"  :placeholder="placeholder" :id="name" :name="name" class="text-black flex-1 p-0 bg-transparent placeholder:text-base-gray-light focus:ring-0 sm:text-base sm:leading-6 ring-0 border-0 focus:outline-none" />
        <FontAwesomeIcon v-if="isShow" :icon="faEye" class="w-5 mr-2 cursor-pointer" @click="isShow = !isShow" />
        <FontAwesomeIcon v-else :icon="faEyeSlash" class="w-5 mr-2 cursor-pointer"  @click="isShow = !isShow"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {Field} from 'vee-validate/'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const isShow = ref<boolean>(false)

defineProps<{
  name: string
  placeholder?: string
}>()
</script>

<style>
input[type=password]::-ms-reveal,
input[type=password]::-ms-clear
{
    display: none;
}
</style>