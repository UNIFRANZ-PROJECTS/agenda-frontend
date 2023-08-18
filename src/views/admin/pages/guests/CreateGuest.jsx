import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentImage, ComponentInput } from '../../../../components';
import { useForm, useGuestStore } from '../../../../hooks';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import noimage from './../../../../assets/images/no-image.webp';
const formFields = {
    first_name: '',
    last_name: '',
    description: '',
    specialty: '',
}

export const CreateGuest = React.memo(({ open, handleClose, item }) => {
    const { postGuest, putGuest } = useGuestStore();
    const { first_name, last_name, description, specialty, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();

        const updatedGuest = {
            first_name,
            last_name,
            description,
            specialty,
        };

        if (imageBase64 != '') {
            console.log('hay algo')
            updatedGuest.archivo = imageBase64;
        }
        console.log('no hay algo')
        // console.log(imageBase64)

        Object.keys(item).length === 0 ?
            postGuest({ first_name, last_name, description, specialty, archivo: imageBase64 }) :
            putGuest({ ...item, ...updatedGuest });
        onResetForm();
    }

    const [image, setImage] = useState(noimage)
    const [imageBase64, setImageBase64] = useState('')
    useEffect(() => {
        if (Object.keys(item).length === 0) {
            setImage(noimage);
        } else {
            console.log(item)
            setImage(item.image)
        }
    }, [item])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle >
                {Object.keys(item).length === 0 ? "Nuevo Expositor" : item.name}
            </DialogTitle>

            <form onSubmit={sendSubmit} >
                <DialogContent>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={6} sx={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
                            <ComponentImage
                                sendImage={({ base64, urlImage }) => {
                                    console.log('base64', base64)
                                    console.log('urlImage', urlImage)
                                    setImageBase64(base64);
                                    setImage(urlImage)
                                }}
                                fileImage={image}
                                accept={"image/png, image/gif, image/jpeg"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            <ComponentInput
                                type="text"
                                label="Nombre"
                                name="first_name"
                                value={first_name}
                                onChange={onInputChange}
                            />
                            <ComponentInput
                                type="text"
                                label="Apellido"
                                name="last_name"
                                value={last_name}
                                onChange={onInputChange}
                            />
                            <ComponentInput
                                type="text"
                                label="Especialidad"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                            />
                            <ComponentInput
                                type="text"
                                label="Descripción"
                                name="specialty"
                                value={specialty}
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
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
