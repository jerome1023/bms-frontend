import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const RegisterS = toTypedSchema(
    zod.object({
        firstname: zod.string().min(1, { message: "Required" }),
        lastname: zod.string().min(1, { message: "Required" }),
        address: zod.string().min(1, { message: "Required" }),
        gender: zod.object({
            value: zod.string().min(1, { message: "Required" }),
            text: zod.string().min(1, { message: "Required" }),
        }),
        email: zod.string().min(1, { message: "Required" }),
        password: zod.string().min(1, { message: "Required" }),
        confirm_password: zod.string().min(1, { message: "Required" }),
    })
)