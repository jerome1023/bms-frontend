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
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-base-gray-light bg-white">
                                <tr v-for="(item, index) in paginatedContent" :key="index">
                                    <template v-for="(data, key,) in item">
                                        <td v-if="key !== 'id' && key !== 'action' && data != null"
                                            class="whitespace-nowrap px-3 py-4 text-sm font-medium text-base-gray">
                                            <span> {{ data }} </span>
                                        </td>
                                    </template>
                                    <td v-if="item.action.length > 0" class="px-3 py-2 flex items-center gap-1">
                                        <template v-for="(action, index) in item.action" :key="index">
                                            <NuxtLink>
                                                <FontAwesomeIcon v-if="action == 'edit'" :icon="faPenAlt"
                                                    class="action-icon p-1.5 bg-blue-100 text-white rounded-full" />
                                                <FontAwesomeIcon v-if="action == 'archive'" :icon="faArchive"
                                                    class="action-icon p-1.5 bg-error-400 text-white rounded-full" />
                                            </NuxtLink>
                                            <!-- <template v-if="index !== item.action.length - 1">&nbsp;</template> -->
                                        </template>
                                    </td>
                                    <!-- <td v-if="item.action.length > 0"
                                        class="sticky right-0 lg:relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 gap-1">
                                        <Menu as="div" class="relative inline-block text-left" v-slot="{ open }">
                                            <div>
                                                <MenuButton
                                                    class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-2 text-sm font-semibold text-base-gray shadow-sm ring-1 ring-inset ring-base-gray-light z-20">
                                                    Action
                                                    <ChevronDownIcon :class="[{ 'rotate-180': open }, 'h-5 w-5 flex-none']"
                                                        aria-hidden="true" />
                                                </MenuButton>
                                            </div>

                                            <transition enter-active-class="transition ease-out duration-100"
                                                enter-from-class="transform opacity-0 scale-95"
                                                enter-to-class="transform opacity-100 scale-100"
                                                leave-active-class="transition ease-in duration-75"
                                                leave-from-class="transform opacity-100 scale-100"
                                                leave-to-class="transform opacity-0 scale-95">
                                                <MenuItems
                                                    class="absoluteright-0 z-10 my-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div class="py-1">
                                                        <MenuItem v-for="action in item.action" v-slot="{ active }">
                                                        <a @click="handleClickEvent(action.toLowerCase(), item.id)"
                                                            :class="[{ 'bg-neutral-light-500': active }, { 'text-error-400': action.toLowerCase() === 'delete' }, 'block px-4 py-2 text-sm cursor-pointer']">
                                                            {{ capitalizeAction(action) }}</a>
                                                        </MenuItem>
                                                    </div>
                                                </MenuItems>
                                            </transition>
                                        </Menu>
                                    </td> -->
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
import { faPlus, faPenAlt, faArchive } from '@fortawesome/free-solid-svg-icons'
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