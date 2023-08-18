import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from './../services';
import { setCarrers } from '../store/user/userSlices';

export const useCarrerStore = () => {

    const dispatch = useDispatch();

    const getCarrers = async () => {
        const { data } = await cafeApi.get('/careers/');
        console.log(data)
        dispatch(setCarrers({ carrers: data.carreras }));
    }


    return {
        //* Métodos
        getCarrers,
    }

}