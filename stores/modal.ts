import { defineStore } from "pinia";
import type { TForm } from "~/types";

export const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    open: false as boolean,
    form: {
      mode: "",
      title: "",
      component: null,
      schema: {},
      data: {},
    } as TForm,
  }),
  actions: {
    toggleModal(val: boolean) {
      this.open = val;
    },

    mountForm(form: TForm) {
      this.form = form;
    },

    resetFormData() {
      this.form = {
        mode: "",
        title: "",
        component: null,
        schema: {},
        data: {},
      } as TForm;
    },
  },
});
