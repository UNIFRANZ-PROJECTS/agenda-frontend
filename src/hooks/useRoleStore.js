import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from './../services';
import { setRoles, setAddRole, setUpdateRole } from '../store/user/userSlices';
import Swal from 'sweetalert2';

export const useRoleStore = () => {
    const dispatch = useDispatch();

    const getRole = async () => {
        const { data } = await cafeApi.get('/roles/');
        console.log(data)
        dispatch(setRoles({ roles: data.roles }));
    }
    const postRole = async (info) => {
        try {
            const { data } = await cafeApi.post(`/roles/`, info);
            dispatch(setAddRole({ role: data.rol }));
            Swal.fire('Rol creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putRole = async (info) => {
        try {
            console.log(info)
            const { data } = await cafeApi.put(`/roles/${info.id}`, info);
            dispatch(setUpdateRole({ role: data.rol }));
            Swal.fire('Rol editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }


    return {
        //* Métodos
        getRole,
        postRole,
        putRole,
    }

}