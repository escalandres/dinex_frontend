// validations/passwordSchema.ts
import * as yup from "yup";

export const passwordSchema = yup.object({
    currentPassword: yup
        .string()
        .required("La contraseña actual es obligatoria")
        .min(8, "Debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial"),
    newPassword: yup
        .string()
        .required("La nueva contraseña es obligatoria")
        .min(8, "Debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "Debe contener al menos un número")
        .matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden")
        .required("La confirmación de la contraseña es obligatoria"),
});

