<template>
    <header class="bg-white w-full flex justify-between px-3 md:px-5 shadow-md h-14 md:h-16">
        <div class="flex items-center gap-3">
            <FontAwesomeIcon @click="toggleSidebar" :icon="faBars" class="bar-selector h-4 w-4 text-base-gray" />
            <p class="font-semibold text-sm md:text-xl">{{ title }}</p>
        </div>
        <Menu as="div" class="flex  items-center" v-slot="{ open }">
            <MenuButton class="relative flex items-center rounded-full text-sm focus:outline-none gap-2">
                <div class="text-right">
                    <p class="hidden md:block font-semibold text-md">{{ `${userStore.user.firstname}
                                            ${userStore.user.lastname}` }}</p>
                    <p v-if="userStore.user.role?.name != 'User'" class="hidden md:block text-sm text-base-gray-light">{{
                        userStore.user.role?.name }}</p>
                </div>
                <img class="h-9 w-9 rounded-full" :src="userData.image" alt="" />
                <FontAwesomeIcon :icon="faChevronDown"
                    :class="['hidden lg:block h-3 w-3 transform transition-transform text-base-gray', { '-rotate-180': open }]" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                    class="absolute right-3 lg:right-5 z-20 mt-44 w-40 origin-top-right rounded-md bg-base-gray-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="(menu, index) in menuItems" :key="index" v-slot="{ active }">
                    <a :href="menu.path" :class="[
                        active ? 'bg-neutral-light-500' : '',
                        'flex items-center gap-4 px-1 mx-3 py-2 text-sm rounded-md cursor-pointer', { 'text-error-400': menu.name.toLowerCase() == 'sign out' }
                    ]" @click="menu.function ? menu.function() : null">
                        <FontAwesomeIcon :icon="menu.icon" class="h-4 w-4" />{{ menu.name }}
                    </a>
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
    </header>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRightFromBracket, faBars, faUserPen, faChevronDown, faCogs } from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuItem, MenuButton, MenuItems } from "@headlessui/vue";
import { toggleAside } from '~/composables/globalRef'
import { useUserStore } from '~/stores/user'
import image from '~/assets/image/profile/no picture male.jpg'

const userStore = useUserStore();
const router = useRouter()
const title = ref()
const userData: any = ref({})

const toggleSidebar = () => {
    toggleAside.value = !toggleAside.value
}

const menuItems = [
    { path: "/edit-profile", name: "Edit Profile", icon: faUserPen },
    { path: "/management", name: "Management", icon: faCogs },
    { name: "Sign out", icon: faArrowRightFromBracket, function: () => userStore.logout() }
];

const userDetails = () => {
    userData.value.image = image
    title.value = findTitleByRoute();
}

onMounted(async () => {
    userDetails();
})

watch(
    () => router.currentRoute.value.path,
    () => {
        userDetails();
    })
</script>