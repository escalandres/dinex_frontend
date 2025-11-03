import * as yup from "yup";

export const incomeValidator = yup.object({
    description: yup.string()
        .min(3, "Description must be at least 3 characters")
        .max(100, "Description must be at most 100 characters")
        .required("Description is required"),

    source: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("Source is required"),

    frequency: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("Frequency is required"),

    amount: yup.number()
        .min(0.01, "Amount must be at least 0.01")
        .required("Amount is required"),

    application_date: yup.date()
        .typeError("Application date must be a valid date")
        .required("Application date is required"),
});