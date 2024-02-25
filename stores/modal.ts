import { defineStore } from "pinia";

export const useModalStore = defineStore({
    id: 'modal',
    state: () => ({
        open: false as boolean,
    }),
    actions: {
        toggleModal(val:boolean){
            this.open = val
        }
    }
})