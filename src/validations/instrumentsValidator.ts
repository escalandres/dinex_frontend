import * as yup from "yup";

export const instrumentValidator = yup.object({
    description: yup.string()
        .min(3, "Description must be at least 3 characters")
        .max(100, "Description must be at most 100 characters")
        .required("Description is required"),

    idInstrumentType: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("Instrument type is required"),

    idInstrumentSubtype: yup.number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("Instrument subtype is required"),

    cutOffDay: yup.number()
        .min(1)
        .max(31)
        .required("Cut-off day is required"),

    paymentDueDay: yup.number()
        .min(1)
        .max(31)
        .required("Payment due day is required"),
});