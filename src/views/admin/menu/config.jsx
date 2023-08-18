import { CalendarMonth, Event, Hail, MenuOutlined, Wifi } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

export const items = (data) => {
    const permissions = () => {
        return data ? data.permisions : [];
    };
    const isSuperUser = () => {
        return data ? data.isSuperUser : false;
    };
    return [
        {
            title: 'Principal',
            subitems: [
                {
                    title: 'Dashboard',
                    path: '/dashboardview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <Wifi />
                        </SvgIcon>
                    ),
                },
                {
                    title: 'Calendario',
                    path: '/calendarview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <CalendarMonth />
                        </SvgIcon>
                    ),
                },
            ],
        },

        // Filtrar y generar elementos basados en las condiciones
        (isSuperUser() || permissions().filter(
            (e) =>
                e.category === 'Eventos' ||
                e.category === 'Expositores' ||
                e.category === 'Categorias'
        ).length > 0) && {
            title: 'Administración de eventos',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Eventos').length > 0) && {
                    title: 'Eventos',
                    path: '/eventsview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <Event />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Expositores').length > 0) && {
                    title: 'Expositores',
                    path: '/guestsview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <Hail />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Categorias').length) > 0 && {
                    title: 'Categorias',
                    path: '/categoriesview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },

        (isSuperUser() || permissions().filter(
            (e) =>
                e.category === 'Usuarios' ||
                e.category === 'Tipos de usuario' ||
                e.category === 'Roles' ||
                e.category === 'Permisos'
        ).length > 0) && {
            title: 'Administración de usuarios',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Usuarios').length > 0) && {
                    title: 'Usuarios',
                    path: '/usersview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Tipos de usuario').length > 0) && {
                    title: 'Tipos de usuario',
                    path: '/typeusersview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Roles').length > 0) && {
                    title: 'Roles',
                    path: '/rolesview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
                (isSuperUser() || permissions().filter((e) => e.category === 'Permisos').length > 0) && {
                    title: 'Permisos',
                    path: '/permisionsview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },

        (isSuperUser() || permissions().filter((e) =>
            e.category === 'Estudiantes'
        ).length > 0) && {
            title: 'Administración de estudiantes',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Estudiantes').length > 0) && {
                    title: 'Estudiantes',
                    path: '/studentsview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },

        (isSuperUser() || permissions().filter((e) =>
            e.category === 'Reportes'
        ).length > 0) && {
            title: 'Reportes',
            subitems: [
                (isSuperUser() || permissions().filter((e) => e.category === 'Reportes').length > 0) && {
                    title: 'Reportes',
                    path: '/reportsview',
                    icon: (
                        <SvgIcon fontSize="small">
                            <MenuOutlined />
                        </SvgIcon>
                    ),
                },
            ].filter(Boolean),
        },
    ].filter(Boolean);
}

