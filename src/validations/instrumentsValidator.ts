import * as yup from "yup";

export const instrumentValidator = yup.object({
    description: yup.string()
        .min(3, "Description must be at least 3 characters")
        .max(100, "Description must be at most 100 characters")
        .required("Description is required"),

    idInstrumentType: yup.number()
        .required("Instrument type is required"),

    idInstrumentSubtype: yup.number()
        .required("Instrument subtype is required"),

    cutOffDay: yup.number()
        .min(1)
        .required("Cut-off day is required"),

    paymentDueDay: yup.number()
        .min(1)
        .required("Payment due day is required"),

    // currency: yup.number()
    //     .required("Currency is required"),
});