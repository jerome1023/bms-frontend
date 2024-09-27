const router = useRouter()

export const toggleAside = ref(true);
const updateToggleAside = () => {
    const isMd = window.matchMedia('(max-width: 768px)').matches;
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
    const isMd = window.matchMedia('(max-width: 768px)').matches;
    const asideElement = document.querySelector('.aside-container');
    const barElement = document.querySelector('.bar-selector');

    if (isMd && asideElement && !asideElement.contains(event.target) && !barElement?.contains(event.target) && toggleAside.value === true) {
        toggleAside.value = false;
    }
};

const routeTitles:any = {
    '/dashboard': 'Dashboard',
    '/barangay-official': 'Barangay Official',
    '/resident/list': 'Resident List',
    '/resident/manage-account': 'Resident Account',
    '/request/pending': 'Pending Request',
    '/request/approved': 'Approved Request',
    '/request/disapproved': 'Disapproved Request',
    '/transaction': 'Transaction',
    '/announcement': 'Announcement',
    '/blotter': 'Blotter',
    '/archive': 'Archive',
    '/barangay-details' : 'Management'
};

export const findTitleByRoute = () => {
    const currentPath = router.currentRoute.value.path;
    return routeTitles[currentPath] || 'Unknown';
};