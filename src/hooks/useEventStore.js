import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from './../services';
import { onLoginStudent } from '../store/auth/authSlice';
import { setEvents, setAddEvents, setUpdateEvents } from '../store/event/eventSlices';
import Swal from 'sweetalert2';

export const useEventStore = () => {

    const dispatch = useDispatch();
    const getEvent = async (campus) => {
        const { data } = await cafeApi.get(`/events/campus/${campus}`);
        console.log(data)
        if (campus == 'lp' || campus == 'ea' || campus == 'cbba' || campus == 'sc') {
            console.log('CAMPUSSSSS')
            dispatch(setEvents({ events: data.eventos }));
        } else {
            console.log('ESTUDIANTEEEE')
            localStorage.setItem('tokenStudent', data.token);
            localStorage.setItem('dataStudent', JSON.stringify(data))
            dispatch(onLoginStudent({ name: data.name, uid: data.uid }));
            dispatch(setEvents({ events: data.eventos }));
        }
    }
    const getEventAdmin = async () => {
        const { data } = await cafeApi.get('/events/admin/');
        console.log(data)
        dispatch(setEvents({ events: data.eventos }));
    }
    const postEvent = async (info) => {
        try {
            const { data } = await cafeApi.post('/events/admin/', info);
            dispatch(setAddEvents({ event: data.evento }));
            Swal.fire('Evento creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }
    const putEvent = async (info) => {
        try {
            const { data } = await cafeApi.put(`/events/admin/${info.id}`, info);
            dispatch(setUpdateEvents({ event: data.evento }));
            Swal.fire('Evento editado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const studentAddEvent = async (id) => {
        try {
            const { data } = await cafeApi.put(`/students/add/event/${id}`)
            Swal.fire('Ya perteneces al evento', '', 'success');

        } catch (error) {
            Swal.fire(error.response.data.errors[0].msg, '', 'error');

        }

    }


    return {
        //* Métodos
        getEvent,
        getEventAdmin,
        postEvent,
        putEvent,
        studentAddEvent,

    }

}