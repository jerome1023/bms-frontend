import { defineStore } from "pinia";

export const useBarangayDetailStore = defineStore({
  id: "barangay_details",
  state: () => ({
    data: {} as any,
  }),
  actions: {
    storeDetails(val: any) {
      this.data = val;
    },
    reset() {
      this.$reset();
    },
  },
});
