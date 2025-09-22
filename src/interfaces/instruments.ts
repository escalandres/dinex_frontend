export interface AddInstrumentsProps {
    user: object;
    token: object;
    csrfToken: string;
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
}

export type InstrumentPayload = {
    description: string;
    id_instrument_type: number;
    id_instrument_subtype: number;
    cut_off_day: number;
    payment_due_day: number;
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

export interface InstrumentFormData {
    description: string;
    idInstrumentType: number;
    idInstrumentSubtype: number;
    cutOffDay: number;
    paymentDueDay: number;
}