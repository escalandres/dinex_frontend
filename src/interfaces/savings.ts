export interface AddSavingsProps {
    user: object;
    tokens: {
        authToken: string;
        csrfToken: string;
    };
    currency: {
        id: string;
        name: string;
        flag_icon: string;
    };
    catalogs: {
        incomeFrequencies: Array<{ id: number; frequency_days: number, description: string }>;
        incomeSources: Array<{ id: number; source: string; type: string, description: string }>;
        currencies: Country[];
    };
    income?: {
        id: number;
        currency: string;
        description: string;
        source: number;
        frequency: number;
        amount: number;
    };
    userPreferences: {
        language: string;
        country: string;
    };
}

export interface EditSavingsProps {
    user: object;
    tokens: {
        authToken: string;
        csrfToken: string;
    };
    currency: {
        id: string;
        name: string;
        flag_icon: string;
    };
    catalogs: {
        instrumentTypes: Array<{ id: number; name: string; color: string }>;
        instrumentSubtypes: Array<{ id: number; id_instrument_type: number; name: string, color: string }>;
        currencies: Country[];
    };
    income?: {
        id: number;
        currency: string;
        description: string;
        source: number;
        frequency: number;
        amount: number;
    };
}

export type SavingPayload = {
    description: string;
    source: number;
    frequency: number;
    amount: number;
    currency: string;
};

export type BackendResponse = {
    success: boolean;
    message: string;
};

export interface Country {
    id: string;
    name: string;
    flag_icon: string;
}

export interface SavingFormData {
    description: string;
    source: number;
    frequency: number;
    amount: number;
    application_date: Date;
}