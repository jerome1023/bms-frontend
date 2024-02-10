import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const LoginS = toTypedSchema(
    zod.object({
        email: zod.string().min(1,'Required').email(),
        password: zod.string().min(1, 'Required' ),
    })
)