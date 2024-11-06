import { defineStore } from "pinia";
import type { TTableContent } from "~/types";

export const useDataTableStore = defineStore({
  id: "datatable",
  state: () => ({
    tableContent: {
      title: "",
      columns: [],
      actions: [],
      body: [],
    } as TTableContent,
    activeTabManagement : 0 as Number
  }),

  actions: {
    storeTableContent(data: TTableContent) {
      this.tableContent = data;
    },

    updateBody(data: any) {
      this.tableContent.body = data;
    },

    updateActiveTab (val:number) {
      this.activeTabManagement = val
    },
    
    reset() {
      // this.tableContent = {
      //   title: "",
      //   columns: [],
      //   actions: [],
      //   body: [],
      // };
      this.$reset();
    },
  },
});
