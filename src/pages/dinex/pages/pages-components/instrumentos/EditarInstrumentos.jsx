import { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import PropTypes from 'prop-types';
import { alerta, showLoader, hideLoader } from '../../../../assets/js/utils';

export const EditarInstrumentos = ({ token, instrumento, catalogos }) => {
    const [descripcion, setDescripcion] = useState(instrumento.descripcion);
    const [tipoInstrumentos, setTipoInstrumentos] = useState(instrumento.id_tipo_instrumento);
    const [subtipoInstrumentos, setSubtipoInstrumentos] = useState(instrumento.id_subtipo_instrumento);
    const [diaCorte, setDiaCorte] = useState(instrumento.dia_corte);
    const [diaPago, setDiaPago] = useState(instrumento.dia_pago);
    const [subtipos, setSubtipos] = useState([]);
    const [isSelectedTipo, setIsSelectedTipo] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si ya se ha enviado el formulario
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar la apertura y cierre del modal

    const handleTipoInstrumentosChange = (event) => { 
        const tipoInstrumento = event.target.value;
        //alert(companyName);
        setTipoInstrumentos(tipoInstrumento); 
        console.log('Selected tipo instrumento:', tipoInstrumento);
        console.log("tipo instrumentos", catalogos.tipoInstrumentos);

        const subtipos = catalogos.subtipoInstrumentos.filter((subtipoInstrumento) => subtipoInstrumento.id_tipo_instrumento == tipoInstrumento);
        console.log("selected",subtipos);
        setIsSelectedTipo(true);
        setSubtipos(subtipos ? subtipos : []);
    };

    const handleEditarInstrumento = async (e) => {
        e.preventDefault();

        if (isSubmitting) {
            return; // Evita que el formulario se vuelva a enviar
        }

        setIsSubmitting(true);

        try {
            showLoader();
            const _instrumento = {
                id: instrumento.id,
                descripcion: descripcion.trim(),
                id_tipo_instrumento: tipoInstrumentos,
                id_subtipo_instrumento: subtipoInstrumentos,
                dia_corte: diaCorte,
                dia_pago: diaPago
            };
            console.log("instrumento a editar", _instrumento);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/instrumentos`, {
                method: 'UPDATE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ instrumento: _instrumento }),
            });
            hideLoader();

            if (!response.ok) {
                alerta.autoError('Error al editar el instrumento. Inténtelo nuevamente.');
            } else {
                const data = await response.json();
                data.success ? alerta.autoSuccess(data.message) : alerta.autoError(data.message);
                // Cerrar el modal después de mostrar la alerta
                setTimeout(() => {
                    setIsOpen(false);
                    // Recargar la página actual
                    location.reload();
                }, 3000); // Ajusta el tiempo según sea necesario
            }
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
                <i className="fa-solid fa-plus me-2"></i> Editar instrumento
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
                        <div className="max-w-sm mx-auto space-y-3 text-center">
                            <Dialog.Title className="text-lg font-medium text-gray-800 ">
                                Editar instrumento
                            </Dialog.Title>
                            <Dialog.Description className=" text-sm text-gray-600">
                                    Registra un nuevo instrumento para gestionar sus finanzas.
                            </Dialog.Description>
                            <div className="relative mt-8 mb-4">
                                <fieldset className="Fieldset relative">
                                    <label htmlFor="tipoInstrumentos" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white text-left">Tipo de instrumento *</label>
                                    <input
                                        className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border   rounded-lg"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        placeholder="Ingrese el nombre de su instrumento"
                                        required
                                    />
                                </fieldset>
                            </div>
                            <div className="grid grid-cols-2 gap-x-3 my-4">
                                <fieldset className="Fieldset relative text-left">
                                    <label htmlFor="tipoInstrumentos" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Tipo de instrumento *</label>
                                    <select id="tipoInstrumentos" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 "
                                        onChange={handleTipoInstrumentosChange}
                                        value={tipoInstrumentos || ''}
                                        required
                                    >
                                        <option value="">Seleccione un tipo de instrumento</option>
                                        {
                                            catalogos.tipoInstrumentos && catalogos.tipoInstrumentos.length > 0 && catalogos.tipoInstrumentos.map((tipo, index) => (
                                                <option key={index} value={tipo.id}>{tipo.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                </fieldset>
                                <fieldset className="Fieldset relative text-left">
                                    <label htmlFor="subtipoInstrumentos" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Subtipo de instrumento *</label>
                                    <select id="subtipoInstrumentos" className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-sm rounded-lg dark:bg-gray-50 border dark:border-gray-300 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full p-2.5 "
                                        disabled={!isSelectedTipo}
                                        value={subtipoInstrumentos || ''}
                                        onChange={(e) => setSubtipoInstrumentos(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccione un subtipo de instrumento</option>
                                        {
                                            subtipos && subtipos.length > 0 && subtipos.map((subtipo, index) => (
                                                <option key={index} value={subtipo.id}>{subtipo.descripcion}</option>
                                            ))
                                        }
                                    </select>
                                </fieldset>
                            </div>
                            <div className="grid grid-cols-2 gap-x-3">
                                <fieldset className="Fieldset relative text-left">
                                    <label htmlFor="tipoInstrumentos" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Dia de corte</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={31}
                                        className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border  rounded-lg"
                                        value={diaCorte}
                                        onChange={(e) => setDiaCorte(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="Fieldset relative text-left">
                                    <label htmlFor="subtipoInstrumentos" className="block mb-2 text-sm font-medium dark:text-gray-900 text-white">Día limite de pago</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={31}
                                        className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border   rounded-lg"
                                        value={diaPago}
                                        onChange={(e) => setDiaPago(e.target.value)}
                                    />
                                </fieldset>
                            </div>

                            <Dialog.Close asChild>
                                <button className=" w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                                    onClick={handleEditarInstrumento}
                                >
                                    Registrar nuevo envío
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

EditarInstrumentos.propTypes = {
    token: PropTypes.string
};