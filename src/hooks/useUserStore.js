import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from './../services';
import { setUsers, setAddUser, setUpdateUser } from '../store/user/userSlices';
import Swal from 'sweetalert2';

export const useUserStore = () => {

    const dispatch = useDispatch();

    const getUser = async () => {
        const { data } = await cafeApi.get('/users/');
        console.log(data)
        dispatch(setUsers({ users: data.usuarios }))
    }
    const postUser = async (info) => {
        try {
            const { data } = await cafeApi.post('/users/', info);
            dispatch(setAddUser({ user: data.usuario }));
            Swal.fire('Usuario creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putUser = async (info) => {
        try {
            const { data } = await cafeApi.put(`/users/${info.id}`, info);
            dispatch(setUpdateUser({ user: data.usuario }));
            Swal.fire('Usuario editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }


    return {
        //* Métodos
        getUser,
        postUser,
        putUser
    }

}