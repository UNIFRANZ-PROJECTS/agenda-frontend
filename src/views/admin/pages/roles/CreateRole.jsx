import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentDraw, ComponentInput, ComponentSelect } from '../../../../components';
import { useForm, useRoleStore } from '../../../../hooks';
import { PermisionTable } from '../permisions';

const formFields = {
    name: '',
    permisionIds: [],
}

export const CreateRole = React.memo(({ open, handleClose, item }) => {

    //llamar post or put 
    const { postRole, putRole } = useRoleStore();
    //obtener todos los permisos
    const { permisions = [] } = useSelector((state) => state.users);
    //controladores de seleccion
    const { selection = [] } = useSelector((state) => state.selections);
    //controlador del formulario
    const { name, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    //crear o editar
    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ? postRole({ name, permisionIds: selection }) : putRole({ ...item, name, permisionIds: selection });
        onResetForm();
    };

    //variable para abrir o cerrar el drawer
    const [opendrawer, setOpendrawer] = useState(false);
    //controlador de abrir o cerrar drawer
    const handleDrawer = useCallback((value) => {
        setOpendrawer(value);
    }, []);

    return (
        <>
            <ComponentDraw
                stateSelect={true}
                stateMultiple={true}
                title='Permisos'
                list={permisions}
                opendrawer={opendrawer}
                handleDrawer={handleDrawer}
            >
                <PermisionTable />
            </ComponentDraw>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{Object.keys(item).length === 0 ? 'Nuevo Rol' : item.name}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent>
                        <ComponentInput type="text" label="Rol" name="name" value={name} onChange={onInputChange} />
                        <ComponentSelect
                            labelChip={['name']}
                            items={permisions}
                            title="Seleccióna uno o varios permisos"
                            onPressed={() => handleDrawer(true)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">
                            {Object.keys(item).length === 0 ? 'CREAR' : 'EDITAR'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
});
