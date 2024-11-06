import { defineStore } from "pinia";

export const useBarangayDetailStore = defineStore({
  id: "barangay_details",
  state: () => ({
    data: {} as any,
  }),
  actions: {
    mountDetails: async function(){
      await useGetData("barangay_details/list").then((response)=>{
        this.data = response
      })
    },
    storeDetails(val: any) {
      this.data = val;
    },
    reset() {
      this.$reset();
    },
  },
});
