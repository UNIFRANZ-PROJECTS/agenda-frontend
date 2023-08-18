import { useDispatch } from 'react-redux';
import { cafeApi } from './../services';
import { setStudents } from '../store/student/studentSlice';

export const useStudentStore = () => {
    const dispatch = useDispatch();

    const getStudents = async () => {
        const { data } = await cafeApi.get('/students/');
        console.log(data)
        dispatch(setStudents({ students: data.estudiantes }));
    }


    return {
        //* Métodos
        getStudents,
    }

}