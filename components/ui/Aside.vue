<template>
    <aside class="aside-container absolute md:relative h-screen bg-base-green min-w-[260px] overflow-auto z-50">
        <FontAwesomeIcon @click="toggleSidebar" :icon="faXmark"
            class="h-5 w-5 md:hidden absolute text-white top-3 right-2" />
        <div class="h-16 flex items-center p-2 gap-2 mb-3">
            <img :src="barangay.logo" class="h-9 w-9 rounded-full" />
            <p class="flex-1 text-white font-medium text-lg">{{ barangay.name }}</p>
        </div>
        <div v-for="(item, index) in aside" :key="index" class="ml-2">
            <a @click="navigateTo(item.path)" v-if="index != 2 && index != 3"
                :class="['py-3 mb-1 pl-2 flex items-center gap-2 bg-green cursor-pointer', currentRoute === item.path ? 'bg-white text-base-green rounded-l-full' : 'text-white']">
                <FontAwesomeIcon :icon="item.icon" class="h-4 w-4" />
                <p>{{ item.name }}</p>
            </a>
            <Disclosure v-else as="div" v-slot="{ open }" class="text-white">
                <DisclosureButton
                    :class="['flex items-center w-full py-2.5 px-2 text-base leading-7', !open && currentRouteMatchesOneOfPaths(item) ? 'bg-white text-base-green rounded-l-full' : '']">
                    <FontAwesomeIcon :icon="item.icon" class="h-4 w-4 mr-2" />
                    <p class="flex-1 text-left">{{ item.name }}</p>
                    <FontAwesomeIcon :icon="faChevronDown"
                        :class="['h-4 w-4 transform transition-transform', { '-rotate-180': open }]" />
                </DisclosureButton>
                <DisclosurePanel>
                    <div v-for="section in item.section" :key="section.name" class="border-l-2 ml-3.5">
                        <DisclosureButton as="a" @click="navigateTo(section.path)"
                            :class="['py-2 ml-1 pl-3 flex items-center gap-2 text-sm font-semibold leading-7 cursor-pointer', open && currentRoute === section.path ? 'bg-white text-base-green rounded-l-full' : 'text-white']">
                            <FontAwesomeIcon :icon="section.icon" class="h-4 w-4" />
                            {{ section.name }}
                        </DisclosureButton>
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faChevronDown,
    faUserTie,
    faUsers,
    faUserGear,
    faBoxArchive,
    faCircleExclamation,
    faBullhorn,
    faFileCircleXmark,
    faFileCircleCheck,
    faFileLines,
    faGauge,
    faFileInvoice,
    faAddressCard,
    faClockRotateLeft,
    faXmark
} from '@fortawesome/free-solid-svg-icons'
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import logo from '~/assets/image/logo.jpg'
import { closeAsideOnClickOutside, toggleAside } from '~/composables/globalRef'

const router = useRouter()
const currentRoute = ref()

const barangay = {
    logo: logo,
    name: 'Sta Catalina Sur'
}

const aside = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: faGauge
    },
    {
        name: 'Barangay Official',
        path: '/barangay-official',
        icon: faUserTie
    },
    {
        name: 'Resident',
        icon: faAddressCard,
        section: [{
            name: 'List',
            path: '/resident/list',
            icon: faUsers
        },
        {
            name: 'Manage Account',
            path: '/resident/manage-account',
            icon: faUserGear
        }]
    },
    {
        name: 'Request',
        icon: faFileInvoice,
        section: [{
            name: 'Pending',
            path: '/request/pending',
            icon: faFileLines
        },
        {
            name: 'Approved',
            path: '/request/approved',
            icon: faFileCircleCheck
        },
        {
            name: 'Disapproved',
            path: '/request/disapproved',
            icon: faFileCircleXmark
        }
        ]
    },
    {
        name: 'Transaction',
        path: '/transaction',
        icon: faClockRotateLeft
    },
    {
        name: 'Announcement',
        path: '/announcement',
        icon: faBullhorn
    },
    {
        name: 'Blotter',
        path: '/blotter',
        icon: faCircleExclamation
    },
    {
        name: 'Archive',
        path: '/archive',
        icon: faBoxArchive
    }
]

const toggleSidebar = () => {
    toggleAside.value = !toggleAside.value
}

const currentRouteMatchesOneOfPaths = (item: any) => {
    return item.section.some((section: any) => currentRoute.value === section.path);
}

watch(() => router.currentRoute.value.path,
    () => {
        currentRoute.value = router.currentRoute.value.path
    })

onMounted(() => {
    currentRoute.value = router.currentRoute.value.path
    document.body.addEventListener('click', closeAsideOnClickOutside);
})

</script>