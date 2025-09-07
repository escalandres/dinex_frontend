import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup
        .string()
        .required("El correo electrónico es obligatorio")
        .email("Formato de correo inválido"),
    password: yup
        .string()
        .required("Ingresa una contraseña")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "La contraseña no cumple con el formato requerido"
        ),
});