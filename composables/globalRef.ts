const router = useRouter()
const isMd = window.matchMedia('(max-width: 768px)').matches;

export const toggleAside = ref(true);

const updateToggleAside = () => {
    toggleAside.value = !isMd;
}

updateToggleAside();
window.addEventListener('resize', updateToggleAside);

watch(
    () => router.currentRoute.value.path,
    () => {
        updateToggleAside()

    })

export const closeAsideOnClickOutside = (event: any) => {
    const asideElement = document.querySelector('.aside-container');
    const barElement = document.querySelector('.bar-selector');

    if (isMd && asideElement && !asideElement.contains(event.target) && !barElement?.contains(event.target) && toggleAside.value === true) {
        toggleAside.value = false;
    }
};

export const findTitleByRoute = () => {
    switch (router.currentRoute.value.path) {
        case '/dashboard':
            return 'Dashboard';
        case '/barangay-official':
            return 'Barangay Official';
        case '/resident/list':
            return 'Resident List';
        case '/resident/manage-account':
            return 'Resident Account';
        case '/request/pending':
            return 'Pending Request';
        case '/request/approved':
            return 'Approved Request';
        case '/request/disapproved':
            return 'Disapproved Request';
        case '/transaction':
            return 'Transaction';
        case '/announcement':
            return 'Announcement';
        case '/blotter':
            return 'Blotter';
        case '/archive':
            return 'Archive';
        default:
            return 'Unknown';
    }
}