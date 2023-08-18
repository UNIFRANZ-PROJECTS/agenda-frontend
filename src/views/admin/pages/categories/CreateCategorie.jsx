import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentImage, ComponentInput } from '../../../../components';
import { useCategorieStore, useForm } from '../../../../hooks';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import noimage from './../../../../assets/images/no-image.webp';

const formFields = {
    title: '',
}

export const CreateCategorie = React.memo(({ open, handleClose, item }) => {
    const { postCategorie, putCategorie } = useCategorieStore();
    const { title, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();

        const updatedGuest = {
            title,
        };

        if (imageBase64 != '') {
            console.log('hay algo')
            updatedGuest.archivo = imageBase64;
        }
        console.log('no hay algo')
        // console.log(imageBase64)

        Object.keys(item).length === 0 ?
            postCategorie({ title, archivo: imageBase64 }) :
            putCategorie({ ...item, ...updatedGuest });
        onResetForm();
    }

    const [image, setImage] = useState(noimage)
    const [imageBase64, setImageBase64] = useState('')
    useEffect(() => {
        if (Object.keys(item).length === 0) {
            setImage(noimage);
        } else {
            console.log(item)
            setImage(item.icon)
        }
    }, [item])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle >
                {Object.keys(item).length === 0 ? "Nueva Categoria" : item.name}
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
                                accept={".svg"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            <ComponentInput

                                id="titleCategorie"
                                type="text"
                                label="Nombre"
                                name="title"
                                value={title}
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
