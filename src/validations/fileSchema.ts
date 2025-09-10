import * as yup from "yup";

const FILE_SIZE = 3 * 1024 * 1024; // 3MB
const SUPPORTED_FORMATS = ["image/svg+xml", "image/jpeg", "image/png"];

export const fileSchema = yup.object({
    file: yup
        .mixed()
        .required("You must select a file")
        .test("fileSize", "File exceeds the maximum allowed size", (value) => {
            const file = value as File;
            return file && file.size <= FILE_SIZE;
        })
        .test("fileType", "Unsupported file format", (value) => {
            const file = value as File;
            return file && SUPPORTED_FORMATS.includes(file.type);
    }),

    multipleFiles: yup
        .mixed()
        .test("multipleFiles", "Only one file is allowed", (value) => {
            const files = value as FileList;
            return files && files.length === 1;
        })

});
