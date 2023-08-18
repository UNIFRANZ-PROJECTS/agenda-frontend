import React from 'react'
import { useAuthStore, useForm } from '../hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ComponentInput } from '../components';
const formFields = {
    code: '',
}
export const LoginClient = ({ open, handleClose }) => {
    const { startLoginCustomer } = useAuthStore();
    const { code, onInputChange, onResetForm } = useForm(formFields);
    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        startLoginCustomer({ code });
        onResetForm();
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Iniciar Sesión"}
            </DialogTitle>
            <form onSubmit={sendSubmit} >
                <DialogContent>
                    <ComponentInput
                        type="text"
                        label="Código de estudiante"
                        name="code"
                        value={code}
                        onChange={(v) => onInputChange(v, { uppercase: true })}
                        uppercase
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        type="submit"
                    >
                        {'INGRESAR'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
