import * as yup from "yup";

export const registerSchema = yup.object({
    firstName: yup
        .string()
        .required("El nombre es obligatorio")
        .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/, "Solo se permiten letras y espacios")
        .min(2, "Debe tener al menos 2 caracteres"),

    lastName: yup
        .string()
        .required("El apellido es obligatorio")
        .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/, "Solo se permiten letras y espacios")
        .min(2, "Debe tener al menos 2 caracteres"),

    email: yup
        .string()
        .required("El correo electrónico es obligatorio")
        .email("Formato de correo inválido"),
});