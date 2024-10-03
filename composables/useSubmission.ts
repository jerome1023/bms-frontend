import type { TObjectLiteral } from "~/types";
import {
  OfficialForm,
  AnnouncementForm,
  BlotterForm,
  DocumentForm,
  SitioForm,
  ResidentForm,
  TransactionForm,
  UserForm,
} from "#components";

export const useGetSubmissionDetails = (
  currentUrl: string,
  mode: string,
  activeTab: number
) => {
  const useModal = useModalStore() as any;

  const id = useModal.form.data.id;

  const getCreateEndpoint = (currentUrl: string): string => {
    const endpointMap: TObjectLiteral<string> = {
      "resident/list": `resident/create`,
    };
    return endpointMap[currentUrl] || `${currentUrl}/create`;
  };

  const getEditEndpoint = (
    currentUrl: string,
    id: string,
    activeTab: number
  ): string => {
    const endpointMap: TObjectLiteral<string> = {
      management:
        activeTab === 1
          ? `document/update/${id}`
          : activeTab === 2
          ? `sitio/update/${id}`
          : "",
      "resident/list": `resident/update/${id}`,
      "resident/manage-account": `users/update/${id}`,
    };
    return endpointMap[currentUrl] || `${currentUrl}/update/${id}`;
  };

  const endpointMap: TObjectLiteral = {
    create: getCreateEndpoint(currentUrl),
    edit: getEditEndpoint(currentUrl, id, activeTab),
    solve: `${currentUrl}/solve/${id}`,
  };

  const methodMap: TObjectLiteral<string> = {
    create: "POST",
    edit: "PUT",
    solve: "PUT",
  };

  if (!useModal.open) return null; // In case modal is not open

  return {
    endpoint: endpointMap[mode],
    method: methodMap[mode],
  };
};

export const useNewValueFormat = (
  val: any,
  currentUrl: string,
  mode: string
) => {
  const useModal = useModalStore() as any;

  const formatMap: Record<string, (val: any) => any> = {
    "barangay-official": (val) => ({
      ...val,
      birthdate: dateFormatter(val.birthdate),
      start_term: dateFormatter(val.start_term),
      end_term: dateFormatter(val.end_term),
    }),
    announcement: (val) => {
      const { image_base64, image, ...rest } = val;
      let updatedImage = image_base64 || undefined;
      if (useModal.form.data.image === image) {
        updatedImage = image;
      }
      return {
        ...rest,
        image: updatedImage || undefined,
        when: dateTimeFormatter(val.when),
      };
    },
    blotter: (val) => {
      if (mode !== "solve") {
        return {
          ...val,
          date: dateFormatter(val.date),
        };
      }
      return val;
    },
    resident: (val) => ({
      ...val,
      birthdate: dateFormatter(val.birthdate),
    }),
  };

  // Return formatted values based on currentUrl or fallback to original val
  return formatMap[currentUrl] ? formatMap[currentUrl](val) : val;
};

export const useManagementSubmissionDetails = (val: any, active: number) => {
  const useBarangayDetail = useBarangayDetailStore();

  const updateImageLogo = (val: any, data: any) => {
    const { image, image_base64, logo, logo_base64, ...rest } = val;
    let updatedImage = image_base64 || undefined;
    let updatedLogo = logo_base64 || undefined;

    if (data.image == image) {
      updatedImage = image;
    }
    if (data.logo == logo) {
      updatedLogo = logo;
    }

    return { ...rest, image: updatedImage, logo: updatedLogo };
  };

  const endpointMap: Record<
    number,
    () => { endpoint: string; method?: string; updatedValues?: any }
  > = {
    0: () => ({
      endpoint: `barangay_details/update/${useBarangayDetail.data.id}`,
      method: "PUT",
      updatedValues: updateImageLogo(val, useBarangayDetail.data),
    }),
    1: () => ({
      endpoint: `document/create`,
    }),
    2: () => ({
      endpoint: `sitio/create`,
    }),
  };

  const result = endpointMap[active]
    ? endpointMap[active]()
    : { endpoint: "", updatedValues: val };

  return {
    endpoint: result.endpoint,
    method: result.method || "POST",
    updatedValues: result.updatedValues || val,
  };
};

export const useGetCurrentForm = (currentUrl: string) => {
  const useDataTable = useDataTableStore();

  const getManagementForm = () => {
    const activeTab = useDataTable.activeTabManagement;
    return activeTab == 1 ? DocumentForm : activeTab == 2 ? SitioForm : null;
  };

  const currentForm: TObjectLiteral = {
    "barangay-official": OfficialForm,
    announcement: AnnouncementForm,
    blotter: BlotterForm,
    management: getManagementForm,
    "resident/list": ResidentForm,
    "resident/manage-account": UserForm,
    transaction: TransactionForm,
  };

  return typeof currentForm[currentUrl] === "function"
    ? currentForm[currentUrl]()
    : currentForm[currentUrl];
};
