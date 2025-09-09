import { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { alerta, showLoader, hideLoader } from '../../../../assets/js/utils';
import { Plus } from 'lucide-react';

interface AddInstrumentsProps {
    user: object;
    token: object;
}

type InstrumentPayload = {
    description: string;
    id_instrument_type: number;
    id_instrument_subtype: number;
    cut_off_day: number;
    payment_due_day: number;
};

type BackendResponse = {
    success: boolean;
    message: string;
};

const catalog = {
    instrumentType: [
        { id: 1, description: 'Tipo 1' },
        { id: 2, description: 'Tipo 2' },
        { id: 3, description: 'Tipo 3' },
    ],
    instrumentSubtype: [
        { id: 1, id_instrument_type: 1, description: 'Subtipo 1' },
        { id: 2, id_instrument_type: 1, description: 'Subtipo 2' },
        { id: 3, id_instrument_type: 2, description: 'Subtipo 3' },
    ],
};

export const AddInstruments = ({ token }: AddInstrumentsProps) => {
    const [description, setDescription] = useState('');
    const [instrumentType, setInstrumentType] = useState(0);
    const [instrumentSubtype, setInstrumentSubtype] = useState(0);
    const [cutOffDay, setCutOffDay] = useState(1);
    const [paymentDueDay, setPaymentDueDay] = useState(1);
    const [subTypeCatalog, setSubtypeCatalog] = useState([]);
    const [isTypeSelected, setIsTypeSelected] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si ya se ha enviado el formulario
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura y cierre del modal

    const handleInstrumentTypeChange = (event) => {
        const instrumentType = event.target.value;
        //alert(companyName);
        setInstrumentType(instrumentType);
        console.log('Selected tipo instrumento:', instrumentType);
        console.log("tipo instrumentos", catalog.instrumentType);

        const subTypeCatalog = catalog.instrumentSubtype.filter((subtipoInstrumento) => subtipoInstrumento.id_instrument_type == instrumentType);
        console.log("selected",subTypeCatalog);
        setIsTypeSelected(true);
        setSubtypeCatalog(subTypeCatalog ? subTypeCatalog : []);
    };

    const handleAddInstrument = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return; // Evita que el formulario se vuelva a enviar

        setIsSubmitting(true);

        try {
            showLoader();
            const _instrument: InstrumentPayload = {
                description: description.trim(),
                id_instrument_type: instrumentType,
                id_instrument_subtype: instrumentSubtype,
                cut_off_day: cutOffDay,
                payment_due_day: paymentDueDay
            };
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/instrumentos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ instrument: _instrument }),
            });
            hideLoader();

            if (!response.ok) {
                alerta.autoError('Error al agregar el instrumento. Inténtelo nuevamente.');
            }

            const data: BackendResponse = await response.json();
            if(!data.success) alerta.autoError(data.message);

            alerta.autoSuccess(data.message)

            // Close the modal and refresh the page after a short delay
            setTimeout(() => {
                setIsOpen(false);
                location.reload();
            }, 3000);
            
        } catch (error) {
            hideLoader();
            console.log('error', error.message);
        } finally {
            setIsSubmitting(false); // Restablece el estado de envío
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger 
                className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                onClick={() => setIsOpen(true)}
            >
                <div className='flex'>
                    <Plus className="mr-2" /> Add Instrument
                </div>
                
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    <div className="modal rounded-md shadow-lg px-4 py-6">
                        <div className="flex items-center justify-end">
                            <Dialog.Close className="p-2 text-gray-400 !bg-transparent rounded-md hover:bg-gray-100">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mx-auto"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </Dialog.Close>
                        </div>
                        <form onSubmit={handleAddInstrument} className="mt-3">
                            <div className="max-w-sm mx-auto space-y-3 text-center">
                                <Dialog.Title className="text-lg font-medium text-gray-800 ">
                                    Agregar instrumento
                                </Dialog.Title>
                                <Dialog.Description className=" text-sm text-gray-600">
                                        Registra un nuevo instrumento para gestionar sus finanzas.
                                </Dialog.Description>
                                <div className="relative mt-8 mb-4">
                                    <fieldset className="Fieldset relative">
                                        <label htmlFor="instrumentType" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white text-left">Tipo de instrumento *</label>
                                        <input
                                            className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border   rounded-lg"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Ingrese el nombre de su instrumento"
                                            required
                                        />
                                    </fieldset>
                                </div>
                                <div className="grid grid-cols-2 gap-x-3 my-4">
                                    <fieldset className="Fieldset relative text-left">
                                        <label htmlFor="instrumentType" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Tipo de instrumento *</label>
                                        <select id="instrumentType" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 "
                                            onChange={handleInstrumentTypeChange}
                                            required
                                        >
                                            <option value="">Seleccione un tipo de instrumento</option>
                                            {
                                                catalog.instrumentType && catalog.instrumentType.length > 0 && catalog.instrumentType.map((tipo, index) => (
                                                    <option key={index} value={tipo.id}>{tipo.description}</option>
                                                ))
                                            }
                                        </select>
                                    </fieldset>
                                    <fieldset className="Fieldset relative text-left">
                                        <label htmlFor="instrumentSubtype" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Subtipo de instrumento *</label>
                                        <select id="instrumentSubtype" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 "
                                            disabled={!isTypeSelected}
                                            onChange={(e) => setInstrumentSubtype(Number(e.target.value))}
                                            required
                                        >
                                            <option value="">Seleccione un subtipo de instrumento</option>
                                            {
                                                subTypeCatalog && subTypeCatalog.length > 0 && subTypeCatalog.map((subtipo, index) => (
                                                    <option key={index} value={subtipo.id}>{subtipo.description}</option>
                                                ))
                                            }
                                        </select>
                                    </fieldset>
                                </div>
                                <div className="grid grid-cols-2 gap-x-3">
                                    <fieldset className="Fieldset relative text-left">
                                        <label htmlFor="instrumentType" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Dia de corte</label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={31}
                                            className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border  rounded-lg"
                                            value={cutOffDay}
                                            onChange={(e) => setCutOffDay(Number(e.target.value))}
                                        />
                                    </fieldset>
                                    <fieldset className="Fieldset relative text-left">
                                        <label htmlFor="instrumentSubtype" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Día limite de pago</label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={31}
                                            className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border   rounded-lg"
                                            value={paymentDueDay}
                                            onChange={(e) => setPaymentDueDay(Number(e.target.value))}
                                        />
                                    </fieldset>
                                </div>

                                <Dialog.Close asChild>
                                    <button className=" w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                                        type="submit"
                                    >
                                        Registrar nuevo envío
                                    </button>
                                </Dialog.Close>
                            </div>
                        </form>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};