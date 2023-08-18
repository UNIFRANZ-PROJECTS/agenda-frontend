import { useDispatch } from 'react-redux';
import { setSelectAll, setSelectOne, setDeselectAll, setDeselectOne, setClearAll } from '../store/selection/selectionSlice';


export const useSelectorStore = () => {

    const dispatch = useDispatch();

    const selectAll = (data) => {
        dispatch(setSelectAll({ selection: data }));
    }
    const selectOne = async (data) => {
        dispatch(setSelectOne({ select: data }));
    }
    const deselectAll = async (data) => {
        dispatch(setDeselectAll({ selection: data }));
    }
    const deselectOne = async (data) => {
        dispatch(setDeselectOne({ select: data }));
    }
    const clearSelect = async () => {
        dispatch(setClearAll());
    }

    return {
        //* Propiedades
        //* Métodos
        selectAll,
        selectOne,
        deselectAll,
        deselectOne,
        clearSelect,

    }

}