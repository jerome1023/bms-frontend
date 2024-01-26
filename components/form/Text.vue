<template>
  <Field v-slot="{field}" :name="name">
    <div class="rounded-md border-0 overflow-hidden py-2 px-3 flex shadow-sm ring-1 ring-inset ring-base-green gap-3">
      <input v-bind="field" :id="name" type="text" :placeholder="placeholder ?? label" :name="name" class="outline-none w-full rounded bg-transparent"/>
    </div>
  </Field>
  </template>
  
  <script setup lang="ts">
  import { Field } from 'vee-validate'
  defineProps<{
      label: string
      name: string
      placeholder?: string
  }>()
  </script>
  