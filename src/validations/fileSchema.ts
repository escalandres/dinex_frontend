import * as yup from "yup";

const FILE_SIZE = 3 * 1024 * 1024; // 3MB
const SUPPORTED_FORMATS = ["image/svg+xml", "image/jpeg", "image/png"];

export const fileSchema = yup.object({
    file: yup
        .mixed()
        .required("Debes seleccionar un archivo")
        .test("fileSize", "El archivo excede el tamaño permitido", (value) => {
            const file = value as File;
            return file && file.size <= FILE_SIZE;
        })
        .test("fileType", "Formato no permitido", (value) => {
            const file = value as File;
            return file && SUPPORTED_FORMATS.includes(file.type);
    }),
});
