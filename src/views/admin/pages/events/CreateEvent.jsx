import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentDate, ComponentDraw, ComponentImage, ComponentInput, ComponentSelect } from '../../../../components';
import { useEventStore, useForm } from '../../../../hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { CategorieTable } from '../categories/CategorieTable';
import { GuestsTable } from '../guests/GuestsTable';
import { useSelector } from 'react-redux';
import { CarrerTable } from '../users/CarrerTable';
import { addHours } from 'date-fns';

import noimage from './../../../../assets/images/no-image.webp';

const formFields = {
    title: '',
    description: '',
    start: new Date(),
    end: addHours(new Date(), 2),
}


export const CreateEvent = React.memo(({ open, handleClose, item }) => {

    const { carrers = [] } = useSelector((state) => state.users);
    const { categories = [], guests = [] } = useSelector((state) => state.events);

    const { selection = [] } = useSelector((state) => state.selections);
    const [formValues, setFormValues] = useState(formFields);


    const { postEvent, putEvent } = useEventStore();
    const { title, description, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);

    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();

        const updatedGuest = {
            title,
            description,
        };

        if (imageBase64 != '') {
            console.log('hay algo')
            updatedGuest.archivo = imageBase64;
        }
        console.log('no hay algo')
        // console.log(imageBase64)

        Object.keys(item).length === 0 ?
            postEvent({
                title,
                description,
                careerIds: selection.filter((e) => carrers.map(e => e.id).includes(e)),
                categoryIds: selection.filter((e) => categories.map(e => e.id).includes(e)),
                guestIds: selection.filter((e) => guests.map(e => e.id).includes(e)),
                start: formValues.start,
                end: formValues.end,
                modality: 'presencial',
                archivo: imageBase64,
            }) :
            putEvent({
                ...item,
                ...updatedGuest,
                careerIds: selection.filter((e) => carrers.map(e => e.id).includes(e)),
                categoryIds: selection.filter((e) => categories.map(e => e.id).includes(e)),
                guestIds: selection.filter((e) => guests.map(e => e.id).includes(e)),
                start: formValues.start,
                end: formValues.end,
            });
        onResetForm();
    }

    const [image, setImage] = useState(noimage)
    const [imageBase64, setImageBase64] = useState('')
    useEffect(() => {
        if (Object.keys(item).length === 0) {
            setImage(noimage);
            setstartDate(null)
            setEndDate(null)
        } else {
            console.log(item)
            setImage(item.image)
            setstartDate(new Date(item.start))
            setEndDate(new Date(item.end))
        }
    }, [item])

    const [startDate, setstartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    //
    const onDateChanged = (event, changing) => {
        console.log('changee', event)

        setFormValues({
            ...formValues,
            [changing]: event
        })
        if (changing === 'start') setstartDate(event)
        if (changing === 'end') setEndDate(event)
    }
    //

    const [opendrawerCarrer, setOpenDrawerCarrer] = useState(false);
    const [opendrawerCategorie, setOpenDrawerCategorie] = useState(false);
    const [opendrawerGuest, setOpenDrawerGuest] = useState(false);

    const handleDrawerCarrer = useCallback((value) => {
        setOpenDrawerCarrer(value);
    }, []);
    const handleDrawerCategorie = useCallback((value) => {
        setOpenDrawerCategorie(value);
    }, []);
    const handleDrawerGuest = useCallback((value) => {
        setOpenDrawerGuest(value);
    }, []);
    //
    return (
        <>
            {
                opendrawerCarrer ?
                    <ComponentDraw
                        stateEdit={false}
                        stateSelect={true}
                        stateMultiple={true}
                        title='Carreras'
                        list={carrers}
                        opendrawer={opendrawerCarrer}
                        handleDrawer={handleDrawerCarrer}
                    >
                        <CarrerTable />
                    </ComponentDraw> :
                    <></>
            }
            {
                opendrawerCategorie ?
                    <ComponentDraw
                        stateEdit={false}
                        stateSelect={true}
                        stateMultiple={true}
                        title='Categorias'
                        list={categories.filter((e) => e.state)}
                        opendrawer={opendrawerCategorie}
                        handleDrawer={handleDrawerCategorie}
                    >
                        <CategorieTable />
                    </ComponentDraw> :
                    <></>
            }
            {
                opendrawerGuest ?
                    <ComponentDraw
                        stateEdit={false}
                        stateSelect={true}
                        stateMultiple={true}
                        title='Expositores'
                        list={guests.filter((e) => e.state)}
                        opendrawer={opendrawerGuest}
                        handleDrawer={handleDrawerGuest}
                    >
                        <GuestsTable />
                    </ComponentDraw> :
                    <></>
            }
            <Dialog
                maxWidth="xl"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >
                    {Object.keys(item).length === 0 ? "Nuevo Evento" : item.name}
                </DialogTitle>

                <form onSubmit={sendSubmit} >
                    <DialogContent>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentDate
                                    value={startDate}
                                    title="Fecha de Inicio"
                                    onChange={(event) => onDateChanged(event, 'start')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentDate
                                    value={endDate}
                                    title="Fecha fin"
                                    onChange={(event) => onDateChanged(event, 'end')}
                                />
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid container item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item xs={12} sm={12}>
                                    <ComponentInput
                                        type="text"
                                        label="Titulo"
                                        name="title"
                                        value={title}
                                        onChange={onInputChange}
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <ComponentInput
                                        type="text"
                                        label="Descripción"
                                        name="description"
                                        value={description}
                                        onChange={onInputChange}
                                        multiline
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ padding: '5px', display: 'flex', justifyContent: 'center' }}>
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
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['title']}
                                    items={categories}
                                    title="Selecciona categorias"
                                    onPressed={() => handleDrawerCategorie(true)} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['first_name']}
                                    items={guests}
                                    title="Selecciona expositores"
                                    onPressed={() => handleDrawerGuest(true)} />
                            </Grid>
                        </Grid>
                        <Grid item sx={{ padding: '5px' }}>
                            <ComponentSelect
                                labelChip={['abbreviation', 'campus']}
                                items={carrers}
                                title="Selecciona uno o varias carreras"
                                onPressed={() => handleDrawerCarrer(true)} />
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
        </>

    );
});
