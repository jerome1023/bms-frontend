<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10">
      <div class="fixed inset-0 bg-black/40" aria-hidden="true" />
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-neutral-light-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center ">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all my-8 w-full md:max-w-[650px] p-6">
              <FontAwesomeIcon :icon="faXmark" />
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  
<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const props = defineProps<{
  open: boolean;
}>();
</script>
  