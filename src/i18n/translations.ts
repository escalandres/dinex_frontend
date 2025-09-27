import { useTranslation } from "react-i18next";

export const useTranslations = () => {
    const { t:translations } = useTranslation();
    return (key: string) => translations(key);
};
