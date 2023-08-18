import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentInput } from '../../../../components';
import { useForm, useTypeUserStore } from '../../../../hooks';
import React from 'react';


const formFields = {
    name: '',
}

export const CreateTypeUser = React.memo(({ open, handleClose, item }) => {
    const { postTypeUser, putTypeUser } = useTypeUserStore();
    const { name, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ? postTypeUser({ name }) : putTypeUser({ ...item, name });
        onResetForm();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle >
                {Object.keys(item).length === 0 ? "Nuevo Tipo de usuario" : item.name}
            </DialogTitle>


            <form onSubmit={sendSubmit} >
                <DialogContent >
                    <ComponentInput
                        type="text"
                        label="Tipo de usuario"
                        name="name"
                        value={name}
                        onChange={onInputChange}

                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button
                        type="submit"
                    >
                        {Object.keys(item).length === 0 ? 'CREAR' : 'EDITAR'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
});
