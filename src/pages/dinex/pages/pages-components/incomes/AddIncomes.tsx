import { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { alerta, showLoader, hideLoader, formatCurrency } from '@pages/assets/js/utils';
import { Plus } from 'lucide-react';
import { CountrySelect } from '@pages/components/CountrySelect';
import { sanitizeIncomeData } from '@/utils/sanitize';
import { BackendResponse, AddIncomesProps, Country, IncomeFormData } from '@interfaces/incomes';
import { incomeValidator } from '@validations/incomesValidator';
import { useTranslations } from '@translations/translations';
import { Info } from 'lucide-react';
import { formatDateISO } from '@utils/date';
export const AddIncomes = ({ tokens, currency, catalogs }: AddIncomesProps) => {
    const translations = useTranslations();
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura y cierre del modal
    const [currencySelected, setCurrencySelected] = useState<Country>({
        id: currency.id ?? 'USD',
        name: currency.name ?? 'Dólares estadounidenses',
        flag_icon: currency.flag_icon ?? 'us.svg'
    });
    const [amountFormatted, setAmountFormatted] = useState('0.00');

    const [tooltipText, setTooltipText] = useState('');
    const handleOptionClick = (option) => {
        setCurrencySelected(option);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<IncomeFormData>({
        resolver: yupResolver(incomeValidator),
        mode: "onBlur",
    });

    const handleDialogChange = (open: boolean) => {
        if (!open) {
            reset(); // Reset form inputs when closing the modal
            setCurrencySelected({
                id: currency.id ?? 'MXN',
                name: currency.name ?? 'Pesos mexicanos',
                flag_icon: currency.flag_icon ?? 'mx.svg'
            });
        }
        setIsOpen(open);
    };

    const handleAddIncome = async (data: IncomeFormData) => {
        try {
            showLoader();
            // 🧼 Sanitize data before submitting
            const cleanData = await sanitizeIncomeData(data);
            console.log('Sanitized Data:', cleanData);
            
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/incomes/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokens.authToken}`,
                    'X-CSRF-Token': tokens.csrfToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: cleanData.description.trim(), source: cleanData.source, frequency: cleanData.frequency, amount: cleanData.amount, currency: currencySelected.id, application_date: formatDateISO(cleanData.application_date) }),
            });
            hideLoader();

            if (!response.ok) {
                alerta.autoError('Error on registering income.');
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

    const handleAmountFormatting = (value: string) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {        
            const countryPreferences = JSON.parse(localStorage.getItem('userPreferences')).country;
            const language = localStorage.getItem('lang');
            const formattedValue = formatCurrency(numericValue, currencySelected.id, language, countryPreferences);

            setAmountFormatted(formattedValue);
        }
    };

    const handleTooltipChange = (e) => {
        const source = catalogs.incomeSources.find((source) => source.id === parseInt(e.target.value));
        const text = source ? `${source.source}: ${source.description}` : '';
        setTooltipText(text);
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleDialogChange}>
            <Dialog.Trigger 
                className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                onClick={() => setIsOpen(true)}
            >
                <div className='flex items-center'>
                    <Plus className="mr-2 h-4 w-4" /> {translations("incomes.buttons.add_incomes")}
                </div>
            </Dialog.Trigger>
            
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] modal"
                    onOpenAutoFocus={(event) => {
                        event.preventDefault();
                        // Do not focus anything - the modal remains unfocused initially
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 pb-0">
                        <div>
                            <Dialog.Title className="text-xl font-semibold text-blue-500 text-center w-100">
                                {translations("incomes.forms.title")}
                            </Dialog.Title>
                            <Dialog.Description className="text-sm text-gray-600 mt-1">
                                {translations("incomes.forms.description")}
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
                    <form onSubmit={handleSubmit(handleAddIncome)} className="p-6">
                        <div className="space-y-6">
                            {/* Income name */}
                            <div className="space-y-2">
                                <fieldset>
                                    <label htmlFor="instrumentName" className="text-sm font-medium text-gray-700">
                                        {translations("incomes.forms.fields.description.label")} *
                                    </label>
                                    <input
                                        id="instrumentName"
                                        type="text"
                                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2"
                                        {...register("description")}
                                        placeholder={translations("incomes.forms.fields.description.placeholder")}
                                    />
                                </fieldset>
                                {errors.description && (
                                    <legend className="mt-1 text-sm field-error-message">{errors.description.message}</legend>
                                )}
                            </div>

                            {/* Grid for source and frequency */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <fieldset>
                                        <div className="relative flex items-center">
                                            <label htmlFor="instrumentType" className="text-sm font-medium text-gray-700">
                                                {translations("incomes.forms.fields.source.label")} *
                                            </label>

                                            <div className="group relative ml-4">
                                                <Info className="text-blue-500 w-5 h-5 cursor-pointer" />
                                                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
                                                {tooltipText || translations("incomes.forms.fields.source.tooltip")}
                                                </div>
                                            </div>
                                        </div>
                                        <select 
                                            id="instrumentType" 
                                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            {...register("source", {
                                                onChange: (event) => handleTooltipChange(event)
                                            })}
                                        >
                                            <option value="">{translations("incomes.forms.fields.source.placeholder")}</option>
                                            {catalogs?.incomeSources && catalogs?.incomeSources.length > 0 &&
                                                catalogs.incomeSources?.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.source}</option>
                                                ))
                                            }
                                        </select>
                                    </fieldset>
                                    {errors.source && (
                                        <legend className="mt-1 text-sm field-error-message">{errors.source.message}</legend>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <fieldset>
                                    <label htmlFor="instrumentSubtype" className="text-sm font-medium text-gray-700">
                                        {translations("incomes.forms.fields.frequency.label")} *
                                    </label>
                                    <select 
                                        id="instrumentSubtype" 
                                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
                                        {...register("frequency")}
                                    >
                                        <option value="">{translations("incomes.forms.fields.frequency.placeholder")}</option>
                                        {catalogs?.incomeFrequencies && catalogs?.incomeFrequencies.length > 0 && 
                                            catalogs.incomeFrequencies.map((item, index) => (
                                                <option key={index} value={item.id}>{item.description}</option>
                                            ))
                                        }
                                    </select>
                                    </fieldset>
                                    {errors.frequency && (
                                        <legend className="mt-1 text-sm field-error-message">{errors.frequency.message}</legend>
                                    )}
                                </div>
                            </div>

                            {/* Grid for amount and currency */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <CountrySelect 
                                    countries={catalogs?.currencies} 
                                    countrySelected={currencySelected} 
                                    handleOptionClick={handleOptionClick} 
                                    isCountry={false}
                                />
                                <div className="space-y-2">
                                    <fieldset>
                                    <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                                        {translations("incomes.forms.fields.amount.label")} *
                                    </label>
                                    <input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        min={1}
                                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        {...register("amount", {
                                            onChange: (e) => {
                                                handleAmountFormatting(e.target.value);
                                            }
                                        })}
                                        placeholder={translations("incomes.forms.fields.amount.placeholder")}
                                    />
                                    </fieldset>
                                    {errors.amount && (
                                        <legend className="mt-1 text-sm field-error-message">{errors.amount.message}</legend>
                                    )}
                                    <legend className="mb-1 text-sm">{amountFormatted}</legend>
                                </div>
                                <div className="space-y-2">
                                    <fieldset>
                                        <label htmlFor="currency" className="text-sm font-medium text-gray-700">
                                            {translations("incomes.forms.fields.application_date.label")} *
                                        </label>
                                        <input
                                            id="application_date"
                                            type="date"
                                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            {...register("application_date")}
                                        />
                                        {errors.application_date && (
                                            <legend className="mt-1 text-sm field-error-message">{errors.application_date.message}</legend>
                                        )}
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                        {/* Footer con botones */}
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-6 mt-6 border-t border-gray-200">
                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    className="mt-3 sm:mt-0 w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {translations("incomes.actions.cancel")}
                                </button>
                            </Dialog.Close>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {translations("incomes.actions.save")}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};