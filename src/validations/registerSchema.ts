import * as yup from "yup";

export const registerSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/, "Only letters and spaces are allowed")
        .min(2, "Must be at least 2 characters"),

    lastname: yup
        .string()
        .required("Last name is required")
        .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/, "Only letters and spaces are allowed")
        .min(2, "Must be at least 2 characters"),

    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(/[@$!%*?&]/, "Must contain at least one special character"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Password confirmation is required"),

});