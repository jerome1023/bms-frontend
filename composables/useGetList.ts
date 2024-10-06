import type { TTableColumn } from "~/types";

export const useManageList = async (page: string, tabIndex: number) => {
    const useDataTable = useDataTableStore();

    let endpoint = "";
    let title = "";
    let columns: TTableColumn[] = [];
    let actions: string[] = []

    switch (page) {
        case "management":
            switch (tabIndex) {
                case 1:
                    endpoint = "document/list";
                    title = "Document";
                    columns = [
                        { field: "name", header: "Name" },
                        { field: "price", header: "Price" },
                    ];
                    break;
                case 2:
                    endpoint = "sitio/list";
                    title = "Sitio";
                    columns = [{ field: "name", header: "Name" }];
                    break;
                default:
                    return;
            }
            actions = ["edit", "delete"];
            break;
        case "archive":
            switch (tabIndex) {
                case 0:
                    endpoint = "barangay-official/archive_list";
                    title = "Official";
                    columns = [
                        { field: "fullname", header: "Name" },
                        { field: "gender", header: "Gender" },
                        { field: "position", header: "Position" },
                        { field: "start_term", header: "Start Term" },
                        { field: "end_term", header: "End Term" },
                    ];
                    break;
                case 1:
                    endpoint = "resident/archive_list";
                    title = "Resident";
                    columns = [
                        { field: "fullname", header: "Name" },
                        { field: "gender", header: "Gender" },
                        { field: "house_number", header: "House Number" },
                        { field: "sitio_name", header: "Sitio" },
                        { field: "voter_status", header: "Voter Status" },
                    ];
                    break;
                case 2:
                    endpoint = "request/archive_list/pending";
                    title = "Pending Request";
                    columns = [
                        { field: "fullname", header: "Name" },
                        { field: "document_name", header: "Document" },
                        { field: "purpose", header: "Purpose" },
                        { field: "price", header: "Price" },
                    ];
                    break;
                case 3:
                    endpoint = "request/archive_list/approved";
                    title = "Approved Request";
                    columns = [
                        { field: "fullname", header: "Name" },
                        { field: "document_name", header: "Document" },
                        { field: "purpose", header: "Purpose" },
                        { field: "price", header: "Price" },
                    ];
                    break;
                case 4:
                    endpoint = "request/archive_list/disapproved";
                    title = "Disapproved Request";
                    columns = [
                        { field: "fullname", header: "Name" },
                        { field: "document_name", header: "Document" },
                        { field: "purpose", header: "Purpose" },
                        { field: "price", header: "Price" },
                    ];
                    break;
                case 5:
                    endpoint = "transaction/archive_list";
                    title = "Transaction";
                    columns = [
                        { field: "fullname", header: "Fullname" },
                        { field: "document_name", header: "Document" },
                        { field: "purpose", header: "Purpose" },
                        { field: "price", header: "Price" },
                        { field: "created_at", header: "Date" },
                    ];
                    break;
                case 6:
                    endpoint = "announcement/archive_list";
                    title = "Announcement";
                    columns = [
                        { field: "what", header: "What" },
                        { field: "where", header: "Where" },
                        { field: "who", header: "Who" },
                        { field: "when", header: "When" },
                        { field: "details", header: "Details" },
                    ];
                    break;
                case 7:
                    endpoint = "blotter/archive_list";
                    title = "Blotter";
                    columns = [
                        { field: "complainant", header: "Complainant" },
                        { field: "complainee", header: "Complainee" },
                        { field: "complain", header: "Complain" },
                        { field: "date", header: "Date" },
                        { field: "status", header: "Status" },
                    ];
                    break;
                default:
                    return;
            }
            actions = ['restore', 'delete'];
            break
        default:
            return;
    }

    await useGetData(endpoint).then((response) => {
        useDataTable.storeTableContent({
            title,
            columns,
            actions,
            body: response ?? [],
        });
    });
};
