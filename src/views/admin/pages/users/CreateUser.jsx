import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ComponentInput, ComponentDraw, ComponentSelect } from '../../../../components';
import { useForm, useUserStore } from '../../../../hooks';
import { CarrerTable } from './CarrerTable';
import { RoleTable } from '../roles';
import { TypeUserTable } from '../typeUsers/TypeUserTable';
import { Grid } from '@mui/material';

const formFields = {
    name: '',
    email: '',
    type_user: '',
    rol: '',
    careerIds: '',
}

export const CreateUser = React.memo(({ open, handleClose, item }) => {
    const [rolSelect, setRolSelect] = useState({ name: '' });
    const [typeUserSelect, setTypeUserSelect] = useState({ name: '' })
    useEffect(() => {
        if (Object.keys(item).length !== 0) {
            setRolSelect(item.rol)
            setTypeUserSelect(item.type_user)
        } else {
            setRolSelect({ name: 'Selecciona un rol' })
            setTypeUserSelect({ name: 'Selecciona un tipo de usuario' });
        }
    }, [item])

    //llamar post or put 
    const { postUser, putUser } = useUserStore();
    //obtener todas las carreras
    const { carrers = [], roles = [], typeUsers = [] } = useSelector((state) => state.users);
    //controladores de seleccion
    const { selection = [] } = useSelector((state) => state.selections);
    //controlador del formulario
    const { name, email, onInputChange, onResetForm } = useForm(Object.keys(item).length === 0 ? formFields : item);


    //crear o editar
    const sendSubmit = (event) => {
        handleClose();
        event.preventDefault();
        Object.keys(item).length === 0 ?
            postUser({
                name,
                email,
                type_user: typeUserSelect.id,
                rol: rolSelect.id,
                careerIds: selection
            }) :
            putUser({
                ...item,
                name,
                email,
                type_user: typeUserSelect.id,
                rol: rolSelect.id,
                careerIds: selection
            });
        onResetForm();
    };

    //variable para abrir o cerrar el drawer
    const [opendrawerCarrer, setOpenDrawerCarrer] = useState(false);
    const [opendrawerRol, setOpenDrawerRol] = useState(false);
    const [opendrawerTypeUser, setOpenDrawerTypeUser] = useState(false);

    //controlador de abrir o cerrar drawer
    const handleDrawerCarrer = useCallback((value) => {
        setOpenDrawerCarrer(value);
    }, []);
    const handleDrawerRol = useCallback((value) => {
        setOpenDrawerRol(value);
    }, []);
    const handleDrawerTypeUser = useCallback((value) => {
        setOpenDrawerTypeUser(value);
    }, []);


    const selectRol = useCallback((value) => {
        setRolSelect(value);
        setOpenDrawerRol(false);
    }, [])
    const selectTypeUser = useCallback((value) => {
        setTypeUserSelect(value);
        setOpenDrawerTypeUser(false);
    }, [])

    return (
        <>
            {
                opendrawerCarrer ?
                    <ComponentDraw
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
                opendrawerRol ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={false}
                        title='Roles'
                        list={roles.filter((e) => e.state)}
                        opendrawer={opendrawerRol}
                        handleDrawer={handleDrawerRol}
                        itemSelect={selectRol}
                    >
                        <RoleTable />
                    </ComponentDraw> :
                    <></>
            }
            {
                opendrawerTypeUser ?
                    <ComponentDraw
                        stateSelect={true}
                        stateMultiple={false}
                        title='Tipos de usuario'
                        list={typeUsers.filter((e) => e.state)}
                        opendrawer={opendrawerTypeUser}
                        handleDrawer={handleDrawerTypeUser}
                        itemSelect={selectTypeUser}
                    >
                        <TypeUserTable />
                    </ComponentDraw> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{Object.keys(item).length === 0 ? 'Nuevo Usuario' : item.name}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput type="text" label="Nombre" name="name" value={name} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput type="email" label="Correo" name="email" value={email} onChange={onInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={rolSelect.name}
                                    onPressed={() => handleDrawerRol(true)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title={typeUserSelect.name}
                                    onPressed={() => handleDrawerTypeUser(true)}
                                />
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
                        <Button type="submit">
                            {Object.keys(item).length === 0 ? 'CREAR' : 'EDITAR'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
});
