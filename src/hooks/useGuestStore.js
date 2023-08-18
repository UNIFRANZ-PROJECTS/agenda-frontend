import { useDispatch } from 'react-redux';
import { cafeApi } from './../services';
import { setGuests, setAddGuests, setUpdateGuests } from '../store/event/eventSlices';
import Swal from 'sweetalert2';

export const useGuestStore = () => {

    const dispatch = useDispatch();

    const getGuest = async () => {
        const { data } = await cafeApi.get('/guests/');
        console.log(data)
        dispatch(setGuests({ guests: data.invitados }));
    }
    const postGuest = async (info) => {
        try {
            const { data } = await cafeApi.post('/guests/', info);
            dispatch(setAddGuests({ guest: data.invitado }));
            Swal.fire('Expositor creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putGuest = async (info) => {
        try {
            console.log(info)
            const { data } = await cafeApi.put(`/guests/${info.id}`, info);
            dispatch(setUpdateGuests({ guest: data.invitado }));
            Swal.fire('Expositor editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }


    return {
        //* Métodos
        getGuest,
        postGuest,
        putGuest,
    }

}