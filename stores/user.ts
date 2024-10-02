import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {} as any,
        id: ''
    }),
    actions: {
        getUserDetails: async function () {
            this.id = localStorage.getItem('id') || '';
            if (this.id) {
                const response = await useGetFetch(`users/${this.id}`)
                this.user = response.status_code == 200 ? response.data : this.logout()
            }
        },
        logout: async function() {
            // const token = localStorage.getItem('token');
            // const response = await useApiFetch(`/api/${path}`, {
            //     method: method ?? 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: {}
            // })
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            this.$reset()
            useBarangayDetailStore().reset();
            useDataTableStore().reset()
            // navigateTo('/login')
        }
    }
})