import { useDispatch } from 'react-redux';
import { cafeApi } from './../services';
import { setReport } from '../store/report/reportSlices';
import Swal from 'sweetalert2';

import { saveAs } from 'file-saver';

export const useReportStore = () => {

    const dispatch = useDispatch();

    const getReport = async (info) => {
        try {
            const { data } = await cafeApi.post('/reports/', info);
            console.log(data)
            dispatch(setReport({ reports: data.eventos }));
            if (Object.keys(info).length === 0) return;
            Swal.fire('Reporte generado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const getReportDocument = async (info) => {
        try {
            const { data } = await cafeApi.post('/reports/download', info);
            console.log(data)
            // Decodificar la cadena Base64 a un objeto Uint8Array
            const byteCharacters = atob(data.base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Crear un Blob a partir del objeto Uint8Array
            const blob = new Blob([byteArray], { type: 'application/xml' });

            // Guardar el archivo XML en el cliente
            saveAs(blob, data.fileName);
            if (Object.keys(info).length === 0) return;
            Swal.fire('Reporte generado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    return {
        //* Métodos
        getReport,
        getReportDocument
    }

}