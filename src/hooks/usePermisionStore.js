import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from './../services';
import { setPermisions, setAddPermision } from '../store/user/userSlices';
import Swal from 'sweetalert2';

export const usePermisionStore = () => {

    const dispatch = useDispatch();

    const getPermisions = async () => {
        const { data } = await cafeApi.get('/permisions/');
        console.log(data)
        dispatch(setPermisions({ permisions: data.permisos }));
    }
    const postPermisions = async (info) => {
        try {
            const { data } = await cafeApi.post(`/permisions/`, info);
            dispatch(setAddPermision({ typeUser: data.tipoUsuario }));
            Swal.fire('Tipo de usuario creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }


    return {
        //* Métodos
        getPermisions,
        postPermisions
    }

}