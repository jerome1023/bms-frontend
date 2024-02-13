<template>
    <Field v-slot="{ field, value }" v-model="selected" :name="name">
        <Listbox v-bind="field" as="div" v-slot="{open}">
            <div class="relative">
                <ListboxButton
                    class="relative w-full cursor-default rounded-md bg-transparent py-2 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-base-green sm:text-sm sm:leading-6 flex justify-between">
                    <span :class="['block truncate text-base', {'text-base-gray-light': value}]">{{ selected.text }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FontAwesomeIcon :icon="faChevronDown" :class="['h-4 w-4 transform transition-transform', {'-rotate-180' : open }]" />
                    </span>
                </ListboxButton>
                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-base">
                        <ListboxOption v-for="(option, i) in options" :key="i" v-slot="{ active, selected }" as="template"
                            :value="option" class="ui-active:bg-green-500 ui-active:text-black ui-not-active:bg-white ui-not-active:text-black">
                            <li :class="[active ? 'bg-base-green text-white' : 'text-base-gray', 'relative cursor-default select-none py-2 pl-8 pr-4']">
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ option.text
                                }}</span>
                                <span v-if="selected"
                                    :class="[active ? 'text-white' : 'text-base-green', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                    <FontAwesomeIcon :icon="faCheck" class="h-4 w-4" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </Field>
</template>
  
<script setup lang="ts">
import { Field } from 'vee-validate/'
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'
import type { TOptions } from '~/types';

const props = defineProps<{
    label: string
    name: string
    placeholder?: string
    options?: TOptions;
}>()

const selected = ref({ value: '', text: props.placeholder ?? props.label })
</script>
  