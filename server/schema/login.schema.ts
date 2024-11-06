import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

export const LoginS = toTypedSchema(
  zod.object({
    email: zod
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Required" }),
    password: zod.string().min(1, "Required"),
  })
);
