<template>
    <div class="md:px-2">
        <button @click="event?.()" class="btn btn-sm flex items-center gap-1">
            <FontAwesomeIcon :icon="faPlus" class=" md:h-4 md:w-4" /> Add<span class="hidden md:block"> Official</span>
        </button>
        <div class="mt-3 flow-root">
            <div class="relative z-10 w-full lg:w-[20rem]">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="search" name="search" v-model="searchQuery"
                    class="block w-full p-2 ps-10 text-sm text-base-gray border border-base-gray rounded-lg focus:outline-none"
                    placeholder="Search...">
            </div>
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div v-if="currentPage > 0" class="relative">
                        <table class="min-w-full table-fixed divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th v-for="header in content.head" scope="col"
                                        class="min-w-[11rem] py-3.5 px-3 text-left text-sm font-semibold text-base-gray">
                                        {{ header }}
                                    </th>
                                    <th v-if="content.action.length !== 0" scope="col"
                                        class="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                        <span class="sr-only">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-base-gray-light bg-white">
                                <tr>
                                    <template>
                                        <tbody class="whitespace-nowrap px-3 py-4 text-sm font-medium text-base-gray">
                                            <span> tesdg </span>
                                        </tbody>
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="mt-4 bg-neutral-light-500">
                        <p>No Result</p>
                    </div>
                </div>
            </div>
        </div>
        <nav class="flex items-center justify-between py-3 mt-5" aria-label="Pagination">
            <div class="hidden sm:block">
                <p class="text-sm text-base-gray">
                    Showing {{ startIndex }} to {{ endIndex }} of {{ filteredContent.length }} results
                </p>
            </div>
            <div class="flex flex-1 justify-between sm:justify-end">
                <button @click="previousPage" :disabled="currentPage === 1"
                    class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold ring-1 ring-inset text-base-gray ring-base-gray hover:bg-neutral-light-500 hover:text-black focus-visible:outline-offset-0">Previous</button>
                <button @click="nextPage" :disabled="endIndex >= filteredContent.length"
                    class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset text-base-gray ring-base-gray hover:bg-neutral-light-500 hover:text-black focus-visible:outline-offset-0">Next</button>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useUserStore } from '~/stores/user';
import type { TTableContent } from '~/types';


const props = defineProps<{
    content: TTableContent
    event?: Function
}>()


const handleClickEvent = (action: string, id: any) => {
    // handleTableEvent(action, id)
}

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10)

const startIndex = computed(() => {
    if (filteredContent.value.length === 0) {
        return 0;
    }
    return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endIndex = computed(() => {
    if (filteredContent.value.length === 0) {
        return 0;
    }
    return Math.min(startIndex.value - 1 + itemsPerPage.value, filteredContent.value.length);
});

const filteredContent = computed(() => {
    if (!searchQuery.value) {
        return props.content.body;
    }
    return props.content.body.filter((content) => {
        return Object.entries(content).some(([key, value]) =>
            key !== 'id' &&
            String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    );
});

const paginatedContent = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredContent.value.slice(start, end);
});

const nextPage = () => {
    if (endIndex.value < props.content.body.length) {
        currentPage.value++;
    }
};

const previousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

watch([filteredContent, searchQuery], () => {
    currentPage.value = filteredContent.value.length > 0 ? 1 : 0;
}, { immediate: true });
</script>