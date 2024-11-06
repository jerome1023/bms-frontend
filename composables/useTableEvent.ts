export const tableEvent = (action: string, id?: string) => {
    const actionMap = <any>{
        'edit' : `/barangay-official/edit?id:${id}`,
        'view' : `/barangay-official/view?id:${id}`,
        'archive' : `/barangay-official/archive?id:${id}`
    }

    return actionMap[action]
}