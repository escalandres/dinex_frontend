import { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { alerta, showLoader, hideLoader, formatCurrency } from '@pages/assets/js/utils';
import { Plus } from 'lucide-react';
import { CountrySelect } from '@pages/components/CountrySelect';
import { sanitizeInstrumentData } from '@/utils/sanitize';
import { BackendResponse, AddInstrumentsProps, Country, InstrumentFormData } from '@interfaces/instruments';
import { instrumentValidator } from '@validations/instrumentsValidator';
import { useTranslations } from '@translations/translations';

const INSTRUMENT_TYPES = {
    SAVINGS: {
        ID: 1,
        SAVING_ACCOUNT: 1
    },
    EXPENSES: {
        ID: 2,
        CREDIT_CARD: 4
    }
}

export const AddInstruments = ({ tokens, currency, catalogs }: AddInstrumentsProps) => {
    const translations = useTranslations();
    const [subTypeCatalog, setSubtypeCatalog] = useState([]);
    const [isTypeSelected, setIsTypeSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura y cierre del modal
    const [showCreditCardSection, setShowCreditCardSection] = useState(false);
    const [showSavingAccountSection, setShowSavingAccountSection] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === 'dark');
    const [currencySelected, setCurrencySelected] = useState<Country>({
        id: currency.id ?? 'MXN',
        name: currency.name ?? 'Pesos mexicanos',
        flag_icon: currency.flag_icon ?? 'mx.svg'
    });
    const [creditLimitFormatted, setCreditLimitFormatted] = useState('');
    const [currentBalanceFormatted, setCurrentBalanceFormatted] = useState('');
    const handleInstrumentTypeChange = (event) => {
        const instrumentType = event.target.value;
        const subTypeCatalog = catalogs.instrumentSubtypes.filter((instrumentSubtype) => instrumentSubtype.id_instrument_type == instrumentType);
        setIsTypeSelected(true);
        setSubtypeCatalog(subTypeCatalog ? subTypeCatalog : []);
    };

    const handleOptionClick = (option) => {
        setCurrencySelected(option);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InstrumentFormData>({
        resolver: yupResolver(instrumentValidator),
        mode: "onBlur",
    });

    const handleDialogChange = (open: boolean) => {
        if (!open) {
            reset(); // Reset form inputs when closing the modal
            setIsTypeSelected(false);
            setSubtypeCatalog([]);
            setCurrencySelected({
                id: currency.id ?? 'MXN',
                name: currency.name ?? 'Pesos mexicanos',
                flag_icon: currency.flag_icon ?? 'mx.svg'
            });
            setShowCreditCardSection(false);
            setShowCreditCardSection(false);
            setCreditLimitFormatted('');
            setCurrentBalanceFormatted('');
        }
        setIsOpen(open);
    };

    const handleInstrumentSubtypeChange = () => {
        // const instrumentSubtype = event.target.value;
        if(Number.parseInt((document.getElementById('instrumentType') as HTMLSelectElement).value) === INSTRUMENT_TYPES.EXPENSES.ID && Number.parseInt((document.getElementById('instrumentSubtype') as HTMLSelectElement).value) === INSTRUMENT_TYPES.EXPENSES.CREDIT_CARD) {
            setShowCreditCardSection(true);
        }

        if(Number.parseInt((document.getElementById('instrumentType') as HTMLSelectElement).value) === INSTRUMENT_TYPES.SAVINGS.ID && Number.parseInt((document.getElementById('instrumentSubtype') as HTMLSelectElement).value) === INSTRUMENT_TYPES.SAVINGS.SAVING_ACCOUNT) {
            setShowSavingAccountSection(true);
        }
    };

    const handleAddInstrument = async (data: InstrumentFormData) => {
        try {
            showLoader();
            // 🧼 Sanitize data before submitting
            const cleanData = await sanitizeInstrumentData(data);
            console.log('Sanitized Data:', cleanData);
            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/instruments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokens.authToken}`,
                    'X-CSRF-Token': tokens.csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: cleanData.description.trim(), type: cleanData.idInstrumentType, subtype: cleanData.idInstrumentSubtype, cut_off_day: cleanData.cutOffDay, payment_due_day: cleanData.paymentDueDay, currency: currencySelected.id, credit_limit: cleanData.creditLimit, current_balance: cleanData.currentBalance }),
            });
            hideLoader();

            if (!response.ok) {
                alerta.autoError('Error al registrar el instrumento.');
                return;
            }

            const result: BackendResponse = await response.json();
            if(!result.success) alerta.autoError(result.message);

            alerta.autoSuccess(result.message)

            // Close the modal and refresh the page after a short delay
            setTimeout(() => {
                setIsOpen(false);
                location.reload();
            }, 3000);
            
        } catch (error) {
            hideLoader();
            console.log('error', error.message);
            alerta.autoError('Error al registrar el instrumento.');
        } finally {
            // setIsSubmitting(false); // Restablece el estado de envío
        }
    };

    const handleCreditLimitChange = (value: string) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {        
            const countryPreferences = JSON.parse(localStorage.getItem('userPreferences')).country;
            const language = localStorage.getItem('lang');
            const formattedValue = formatCurrency(numericValue, currencySelected.id, language, countryPreferences);

            setCreditLimitFormatted(formattedValue);
        }
    };

    const handleCurrentBalanceChange = (value: string) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {        
            const countryPreferences = JSON.parse(localStorage.getItem('userPreferences')).country;
            const language = localStorage.getItem('lang');
            const formattedValue = formatCurrency(numericValue, currencySelected.id, language, countryPreferences);

            setCurrentBalanceFormatted(formattedValue);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleDialogChange}>
            <Dialog.Trigger 
                className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                onClick={() => setIsOpen(true)}
            >
                <div className='flex items-center'>
                    <Plus className="mr-2 h-4 w-4" /> {translations("instruments.buttons.add_instruments")}
                </div>
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] modal"
                    onOpenAutoFocus={(event) => {
                        event.preventDefault();
                        // No enfocar nada - el modal queda sin foco inicial
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 pb-0">
                        <div>
                            <Dialog.Title className="text-xl font-semibold text-blue-500 text-center">
                                {translations("instruments.forms.title")}
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-gray-600 mt-1">
                                {translations("instruments.forms.description")}
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
                    <form onSubmit={handleSubmit(handleAddInstrument)} className="p-6">
                        <div className="space-y-6">
                            {/* Instrument name and Currency */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Primer campo: ocupa 2 columnas */}
                                <div className="space-y-2 col-span-1 md:col-span-2">
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

                                {/* Segundo campo: ocupa 1 columna */}
                                <div>
                                    <CountrySelect
                                    countries={catalogs?.currencies}
                                    countrySelected={currencySelected}
                                    handleOptionClick={handleOptionClick}
                                    isCountry={false}
                                    />
                                </div>
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
                                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
                                        disabled={!isTypeSelected}
                                        {...register("idInstrumentSubtype", {
                                            onChange: () => {
                                                handleInstrumentSubtypeChange();
                                            }
                                        })}
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

                            { /* Solo mostrar si el tipo de instrumento es tarjeta de crédito */
                            (showCreditCardSection) && (
                                <div className="p-4 space-y-4">
                                    <div className="relative">
                                        <span className="block w-full h-px bg-gray-300 dark:bg-black-100"></span>
                                        <p className={`inline-block w-fit text-sm ${isDarkMode ? 'text-white bg-[#2C3339]' : 'bg-[#FBF9FA] text-black'} px-2 absolute -top-2 inset-x-0 mx-auto`}>{translations("instruments.forms.sections.credit_card_info.title")}</p>
                                    </div>
                                    <br />
                                    {translations("instruments.forms.sections.credit_card_info.subtitle")}
                                    {/* Grid for cut off day and payment due day */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                {...register("paymentDueDay")}
                                                placeholder={translations("instruments.forms.fields.payment_due_day.placeholder")}
                                            />
                                            </fieldset>
                                            {errors.paymentDueDay && (
                                                <legend className="mt-1 text-sm field-error-message">{errors.paymentDueDay.message}</legend>
                                            )}
                                        </div>
                                    </div>

                                    {/* Grid for credit limit and current balance */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <fieldset>
                                            <label htmlFor="creditLimit" className="text-sm font-medium text-gray-700">
                                                {translations("instruments.forms.fields.credit_limit.label")}
                                            </label>
                                            <input
                                                id="creditLimit"
                                                type="number"
                                                step="0.01"
                                                min={0}
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                {...register("creditLimit", {
                                                    onChange: (e) => {
                                                        handleCreditLimitChange(e.target.value);
                                                    }
                                                })}
                                                placeholder={translations("instruments.forms.fields.credit_limit.placeholder")}
                                            />
                                            </fieldset>
                                            {errors.creditLimit && (
                                                <legend className="mt-1 text-sm field-error-message">{errors.creditLimit.message}</legend>
                                            )}
                                            <legend className="mb-1 text-sm">{creditLimitFormatted}</legend>
                                        </div>

                                        <div className="space-y-2">
                                            <fieldset>
                                            <label htmlFor="currentBalance" className="text-sm font-medium text-gray-700">
                                                {translations("instruments.forms.fields.current_balance.label")}
                                            </label>
                                            <input
                                                id="currentBalance"
                                                type="number"
                                                step="0.01"
                                                min={0}
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                {...register("currentBalance", {
                                                    onChange: (e) => {
                                                        handleCurrentBalanceChange(e.target.value);
                                                    }
                                                })}
                                                placeholder={translations("instruments.forms.fields.current_balance.placeholder")}
                                            />
                                            </fieldset>
                                            {errors.currentBalance && (
                                                <legend className="mt-1 text-sm field-error-message">{errors.currentBalance.message}</legend>
                                            )}
                                            <legend className="mb-1 text-sm">{currentBalanceFormatted}</legend>
                                        </div>
                                    </div>
                                </div>
                            )}

                            { /* Solo mostrar si el tipo de instrumento es cuenta de ahorros */
                            (showSavingAccountSection) && (
                                <div className="p-4 space-y-4">
                                    <div className="relative">
                                        <span className="block w-full h-px bg-gray-300 dark:bg-black-100"></span>
                                        <p className={`inline-block w-fit text-sm ${isDarkMode ? 'text-white bg-[#2C3339]' : 'bg-[#FBF9FA] text-black'} px-2 absolute -top-2 inset-x-0 mx-auto`}>{translations("instruments.forms.sections.saving_account.title")}</p>
                                    </div>
                                    <br />
                                    {translations("instruments.forms.sections.credit_card_info.subtitle")}
                                    {/* Grid for cut off day and payment due day */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                {...register("paymentDueDay")}
                                                placeholder={translations("instruments.forms.fields.payment_due_day.placeholder")}
                                            />
                                            </fieldset>
                                            {errors.paymentDueDay && (
                                                <legend className="mt-1 text-sm field-error-message">{errors.paymentDueDay.message}</legend>
                                            )}
                                        </div>
                                    </div>

                                    {/* Grid for credit limit and current balance */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <fieldset>
                                            <label htmlFor="creditLimit" className="text-sm font-medium text-gray-700">
                                                {translations("instruments.forms.fields.credit_limit.label")}
                                            </label>
                                            <input
                                                id="creditLimit"
                                                type="number"
                                                step="0.01"
                                                min={0}
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                {...register("creditLimit", {
                                                    onChange: (e) => {
                                                        handleCreditLimitChange(e.target.value);
                                                    }
                                                })}
                                                placeholder={translations("instruments.forms.fields.credit_limit.placeholder")}
                                            />
                                            </fieldset>
                                            {errors.creditLimit && (
                                                <legend className="mt-1 text-sm field-error-message">{errors.creditLimit.message}</legend>
                                            )}
                                            <legend className="mb-1 text-sm">{creditLimitFormatted}</legend>
                                        </div>

                                        <div className="space-y-2">
                                            <fieldset>
                                            <label htmlFor="currentBalance" className="text-sm font-medium text-gray-700">
                                                {translations("instruments.forms.fields.current_balance.label")}
                                            </label>
                                            <input
                                                id="currentBalance"
                                                type="number"
                                                step="0.01"
                                                min={0}
                                                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                {...register("currentBalance", {
                                                    onChange: (e) => {
                                                        handleCurrentBalanceChange(e.target.value);
                                                    }
                                                })}
                                                placeholder={translations("instruments.forms.fields.current_balance.placeholder")}
                                            />
                                            </fieldset>
                                            {errors.currentBalance && (
                                                <legend className="mt-1 text-sm field-error-message">{errors.currentBalance.message}</legend>
                                            )}
                                            <legend className="mb-1 text-sm">{currentBalanceFormatted}</legend>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
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
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {translations("instruments.actions.save")}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};