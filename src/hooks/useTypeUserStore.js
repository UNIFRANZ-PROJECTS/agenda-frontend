import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from './../services';
import { setTypeUsers, setAddTypeUser, setUpdateTypeUser } from '../store/user/userSlices';
import Swal from 'sweetalert2';

export const useTypeUserStore = () => {
    const dispatch = useDispatch();

    const getTypeUser = async () => {
        const { data } = await cafeApi.get('/typeusers/');
        console.log(data)
        dispatch(setTypeUsers({ typeUsers: data.tiposUsuarios }));
    }
    const postTypeUser = async (info) => {
        try {
            const { data } = await cafeApi.post(`/typeusers/`, info);
            dispatch(setAddTypeUser({ typeUser: data.tipoUsuario }));
            Swal.fire('Tipo de usuario creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putTypeUser = async (info) => {
        try {
            const { data } = await cafeApi.put(`/typeusers/${info.id}`, info);
            dispatch(setUpdateTypeUser({ typeUser: data.tipoUsuario }));
            Swal.fire('Se modifico el tipo de usuario', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    return {
        //* Métodos
        getTypeUser,
        postTypeUser,
        putTypeUser,
    }

}