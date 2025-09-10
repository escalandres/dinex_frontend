// validations/passwordSchema.ts
import * as yup from "yup";

export const passwordSchema = yup.object({
    currentPassword: yup
        .string()
        .required("Current password is required")
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[@$!%*?&]/, "Must contain at least one special character"),
    newPassword: yup
        .string()
        .required("New password is required")
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[@$!%*?&]/, "Must contain at least one special character"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords do not match")
        .required("Password confirmation is required"),
});

