import { useDispatch, useSelector } from 'react-redux';
import { cafeApi } from './../services';
import { setCategories, setAddCategories, setUpdateCategories, setCategorySelect } from '../store/event/eventSlices';
import Swal from 'sweetalert2';

export const useCategorieStore = () => {

    const dispatch = useDispatch();

    const getCategorie = async () => {
        const { data } = await cafeApi.get('/categories/');
        console.log(data)
        dispatch(setCategories({ categories: data.categorias }));
    }
    const selectCategorie = async (id) => {
        dispatch(setCategorySelect({ id }));
    }
    const postCategorie = async (info) => {
        try {
            const { data } = await cafeApi.post('/categories/', info);
            dispatch(setAddCategories({ categorie: data.categoria }));
            Swal.fire('Categoria creado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }

    const putCategorie = async (info) => {
        try {
            const { data } = await cafeApi.put(`/categories/${info.id}`, info);
            dispatch(setUpdateCategories({ categorie: data.categoria }));
            Swal.fire('Categoria edutado correctamente', '', 'success');
        } catch (error) {
            Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
        }
    }


    return {
        //* Métodos
        getCategorie,
        selectCategorie,
        postCategorie,
        putCategorie,
    }

}