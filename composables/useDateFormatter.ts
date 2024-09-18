import dayjs from 'dayjs';

export const dateFormatter = (params:any) => {
    // console.log(dayjs(params, 'YYYY-MM-DD').format('YYYY-MM-DD'))
    return dayjs(params, 'YYYY-MM-DD').format('YYYY-MM-DD');
}

export const dateTimeFormatter = (params:any) => {
    return dayjs(params, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
    // console.log(params)
    // console.log(dayjs(params, 'YYYY-MM-DD h:mm:ss A').format('YYYY-MM-DD HH:mm:ss'))
}