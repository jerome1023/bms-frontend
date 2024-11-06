import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

export const RegisterS = toTypedSchema(
  zod
    .object({
      firstname: zod.string().min(1, { message: "Required" }),
      lastname: zod.string().min(1, { message: "Required" }),
      address: zod.string().min(1, { message: "Required" }),
      gender: zod.string().min(1, { message: "Required" }),
      email: zod
        .string()
        .email({ message: "Invalid email format" })
        .min(1, { message: "Required" }),
      password: zod
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirm_password: zod.string().min(1, { message: "Required" }),
      role: zod.string().min(1, { message: "Required" }),
    })
    // Add a refinement to ensure password and confirm_password match
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"], // This will assign the error to the `confirm_password` field
    })
);
