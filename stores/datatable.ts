import { defineStore } from "pinia";
import type { TTableContent } from "~/types";

export const useDataTableStore = defineStore({
  id: "datatable",
  state: () => ({
    tableContent: {
      title: "",
      columns: [],
      body: [],
    } as TTableContent,
  }),

  actions: {
    storeTableContent(data: TTableContent) {
      this.tableContent = data;
    },

    updateBody(data: any) {
      this.tableContent.body = data;
    },

    reset() {
      this.tableContent = {
        title: "",
        columns: [],
        body: [],
      };
    },
  },
});
