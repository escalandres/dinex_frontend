import * as yup from "yup";
import { Asserts } from "yup";

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
        .transform((value, originalValue) =>
            String(originalValue).trim() === "" ? null : value
        )
        .default(1), // Día 1 por defecto

    paymentDueDay: yup.number()
        .min(1)
        .max(31)
        .transform((value, originalValue) =>
            String(originalValue).trim() === "" ? null : value
        )
        .default(1), // Día 1 por defecto

    creditLimit: yup.number()
        .min(0, "Credit limit cannot be negative")
        .nullable()
        .transform((value, originalValue) =>
            String(originalValue).trim() === "" ? null : value
        )
        .default(0), // Valor por defecto

    currentBalance: yup.number()
        .min(0, "Current balance cannot be negative")
        .nullable()
        .transform((value, originalValue) =>
            String(originalValue).trim() === "" ? null : value
        )
        .default(0), // Valor por defecto
});

export type InstrumentFormData = Asserts<typeof instrumentValidator>;