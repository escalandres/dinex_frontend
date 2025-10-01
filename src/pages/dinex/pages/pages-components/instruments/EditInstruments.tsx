import { useState, useEffect } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { alerta, showLoader, hideLoader } from '../../../../assets/js/utils';
import { Pencil } from 'lucide-react';
import { CountrySelect } from '@pages/components/CountrySelect';
import { sanitizeInstrumentData } from '@/utils/sanitize';
import { BackendResponse, AddInstrumentsProps, Country, InstrumentFormData } from '@interfaces/instruments';
import { instrumentValidator } from '@/validations/instrumentsValidator';
import { useTranslations } from '@translations/translations';

export const EditInstruments = ({ tokens, catalogs, instrument}: AddInstrumentsProps) => {
    const getInstrumentCurrency = (id) => {
        const currency = catalogs.currencies.find((currency) => currency.id === id);
        return currency ? { flag: currency.flag_icon, name: currency.name } : {};
    };
    const translations = useTranslations();
    const [subTypeCatalog, setSubtypeCatalog] = useState([]);
    const [isTypeSelected, setIsTypeSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currencySelected, setCurrencySelected] = useState<Country>({
        id: instrument?.currency ?? 'MXN',
        name: getInstrumentCurrency(instrument?.currency).name ?? 'Pesos mexicanos',
        flag_icon: getInstrumentCurrency(instrument?.currency).flag ?? 'mx.svg'
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<InstrumentFormData>({
        resolver: yupResolver(instrumentValidator),
        mode: "onBlur",
    });

    // Inicializar el formulario con los datos del instrumento al abrir el modal
    useEffect(() => {
        if (isOpen && instrument) {
            // Cargar los datos del instrumento
            setValue('description', instrument.description || '');
            setValue('idInstrumentType', instrument.idInstrumentType || null);
            setValue('idInstrumentSubtype', instrument.idInstrumentSubtype || null);
            setValue('cutOffDay', instrument.cutOffDay || 0);
            setValue('paymentDueDay', instrument.paymentDueDay || 0);

            // Configurar la moneda seleccionada
            // if (instrument.currency) {
            //     const selectedCurrency = catalogs?.currencies?.find(
            //         curr => curr.id === instrument.currency
            //     );
            //     if (selectedCurrency) {
            //         setCurrencySelected(selectedCurrency);
            //     }
            // }

            // Cargar el subtipo basado en el tipo de instrumento
            if (instrument.idInstrumentType) {
                const subTypes = catalogs.instrumentSubtypes.filter(
                    (instrumentSubtype) => instrumentSubtype.id_instrument_type == instrument.idInstrumentType
                );
                setSubtypeCatalog(subTypes || []);
                setIsTypeSelected(true);
            }
        }
    }, [isOpen, instrument, catalogs, setValue]);

    const handleInstrumentTypeChange = (event) => {
        const instrumentType = event.target.value;
        const subTypeCatalog = catalogs.instrumentSubtypes.filter(
            (instrumentSubtype) => instrumentSubtype.id_instrument_type == instrumentType
        );
        setIsTypeSelected(true);
        setSubtypeCatalog(subTypeCatalog ? subTypeCatalog : []);
        // Resetear el subtipo cuando cambia el tipo
        setValue('idInstrumentSubtype', null);
    };

    const handleOptionClick = (option) => {
        setCurrencySelected(option);
    };

    const handleDialogChange = (open: boolean) => {
        if (!open) {
            reset();
            setIsTypeSelected(false);
            setSubtypeCatalog([]);
            setCurrencySelected({
                id: instrument?.currency ?? 'MXN',
                name: getInstrumentCurrency(instrument?.currency).name ?? 'Pesos mexicanos',
                flag_icon: getInstrumentCurrency(instrument?.currency).flag ?? 'mx.svg'
            });
        }
        setIsOpen(open);
    };

    const handleEditInstrument = async (data: InstrumentFormData) => {
        try {
            showLoader();
            
            // Sanitizar datos antes de enviar
            const cleanData = await sanitizeInstrumentData(data);
            console.log('Sanitized Data:', cleanData);
            
            // Usar PUT para actualizar y incluir el ID del instrumento en la URL
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/instruments/${instrument.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${tokens.authToken}`,
                    'X-CSRF-Token': tokens.csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    description: cleanData.description.trim(), 
                    type: cleanData.idInstrumentType, 
                    subtype: cleanData.idInstrumentSubtype, 
                    cut_off_day: cleanData.cutOffDay, 
                    payment_due_day: cleanData.paymentDueDay, 
                    currency: currencySelected.id 
                }),
            });
            
            hideLoader();

            if (!response.ok) {
                alerta.autoError('Error al actualizar el instrumento.');
                return;
            }

            const result: BackendResponse = await response.json();
            if (!result.success) {
                alerta.autoError(result.message);
                return;
            }

            alerta.autoSuccess(result.message);

            // Cerrar el modal y recargar después de un breve retraso
            setTimeout(() => {
                setIsOpen(false);
                location.reload();
            }, 3000);
            
        } catch (error) {
            hideLoader();
            console.log('error', error.message);
            alerta.autoError('Error al actualizar el instrumento.');
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleDialogChange}>
            <Dialog.Trigger 
                className="px-3 py-1.5 text-sm text-white font-medium"
                onClick={() => setIsOpen(true)}
            >
                <div className='flex items-center !bg-yellow-500 hover:!bg-yellow-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none'>
                    <Pencil className="mr-1 h-3 w-3" /> {translations("instruments.buttons.edit_instruments")}
                </div>
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] modal"
                    onOpenAutoFocus={(event) => {
                        event.preventDefault();
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 pb-0">
                        <div>
                            <Dialog.Title className="text-xl font-semibold text-blue-500 text-center">
                                {translations("instruments.forms.edit_title")}
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-gray-600 mt-1">
                                {translations("instruments.forms.edit_description")}
                            </Dialog.Description>
                        </div>
                        <Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground x-button">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="sr-only">Close</span>
                        </Dialog.Close>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(handleEditInstrument)} className="p-6">
                        <div className="space-y-6">
                            {/* Instrument name */}
                            <div className="space-y-2">
                                <fieldset>
                                    <label htmlFor="instrumentName" className="text-sm font-medium text-gray-700">
                                        {translations("instruments.forms.fields.name.label")} *
                                    </label>
                                    <input
                                        id="instrumentName"
                                        type="text"
                                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2"
                                        {...register("description")}
                                        placeholder={translations("instruments.forms.fields.name.placeholder")}
                                    />
                                </fieldset>
                                {errors.description && (
                                    <legend className="mt-1 text-sm field-error-message">{errors.description.message}</legend>
                                )}
                            </div>

                            {/* Grid for type and subtype */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <fieldset>
                                        <label htmlFor="instrumentType" className="text-sm font-medium text-gray-700">
                                            {translations("instruments.forms.fields.type.label")} *
                                        </label>
                                        <select 
                                            id="instrumentType" 
                                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            {...register("idInstrumentType", {
                                                onChange: (e) => {
                                                    handleInstrumentTypeChange(e);
                                                }
                                            })}
                                        >
                                            <option value="">{translations("instruments.forms.fields.type.placeholder")}</option>
                                            {catalogs?.instrumentTypes && catalogs?.instrumentTypes.length > 0 && 
                                                catalogs.instrumentTypes?.map((tipo, index) => (
                                                    <option key={index} value={tipo.id}>{tipo.name}</option>
                                                ))
                                            }
                                        </select>
                                    </fieldset>
                                    {errors.idInstrumentType && (
                                        <legend className="mt-1 text-sm field-error-message">{errors.idInstrumentType.message}</legend>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <fieldset>
                                        <label htmlFor="instrumentSubtype" className="text-sm font-medium text-gray-700">
                                            {translations("instruments.forms.fields.subtype.label")} *
                                        </label>
                                        <select 
                                            id="instrumentSubtype" 
                                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
                                            disabled={!isTypeSelected}
                                            {...register("idInstrumentSubtype")}
                                        >
                                            <option value="">{translations("instruments.forms.fields.subtype.placeholder")}</option>
                                            {subTypeCatalog && subTypeCatalog?.length > 0 && 
                                                subTypeCatalog?.map((subtipo, index) => (
                                                    <option key={index} value={subtipo.id}>{subtipo.name}</option>
                                                ))
                                            }
                                        </select>
                                    </fieldset>
                                    {errors.idInstrumentSubtype && (
                                        <legend className="mt-1 text-sm field-error-message">{errors.idInstrumentSubtype.message}</legend>
                                    )}
                                </div>
                            </div>

                            {/* Grid for cut off day and payment due day */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <fieldset>
                                        <label htmlFor="cutOffDay" className="text-sm font-medium text-gray-700">
                                            {translations("instruments.forms.fields.cut_off_day.label")}
                                        </label>
                                        <input
                                            id="cutOffDay"
                                            type="number"
                                            min={1}
                                            max={31}
                                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            {...register("cutOffDay")}
                                            placeholder={translations("instruments.forms.fields.cut_off_day.placeholder")}
                                        />
                                    </fieldset>
                                    {errors.cutOffDay && (
                                        <legend className="mt-1 text-sm field-error-message">{errors.cutOffDay.message}</legend>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <fieldset>
                                        <label htmlFor="paymentDueDay" className="text-sm font-medium text-gray-700">
                                            {translations("instruments.forms.fields.payment_due_day.label")}
                                        </label>
                                        <input
                                            id="paymentDueDay"
                                            type="number"
                                            min={1}
                                            max={31}
                                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            {...register("paymentDueDay")}
                                            placeholder={translations("instruments.forms.fields.payment_due_day.placeholder")}
                                        />
                                    </fieldset>
                                    {errors.paymentDueDay && (
                                        <legend className="mt-1 text-sm field-error-message">{errors.paymentDueDay.message}</legend>
                                    )}
                                </div>

                                <CountrySelect 
                                    countries={catalogs?.currencies} 
                                    countrySelected={currencySelected} 
                                    handleOptionClick={handleOptionClick} 
                                    isCountry={false}
                                />
                            </div>
                        </div>

                        {/* Footer con botones */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-6 mt-6 border-t border-gray-200">
                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    className="mt-3 sm:mt-0 w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {translations("instruments.actions.cancel")}
                                </button>
                            </Dialog.Close>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {translations("instruments.actions.update")}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};