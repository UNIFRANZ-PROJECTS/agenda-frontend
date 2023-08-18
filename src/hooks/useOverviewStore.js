import { useDispatch } from 'react-redux';
import { cafeApi } from '../services';
import { setOverview } from '../store/report/reportSlices';


export const useOverviewStore = () => {

    const dispatch = useDispatch();

    const getOverview = async () => {
        const { data } = await cafeApi.get('/dashboard/');
        console.log(data)
        dispatch(setOverview({ overview: data }));
    }


    return {
        //* Métodos
        getOverview,
    }

}