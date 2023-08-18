import { useEffect } from 'react';
import { useAuthStore } from '../hooks';
import { RouterClient } from '../views/RouterClient';
import { Layout } from '../views/admin/Layout';
import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardView } from '../views/admin/pages/dashboard';
import { CalendarView } from '../views/admin/pages/calendar';
import { EventViews } from '../views/admin/pages/events';
import { GuestsView } from '../views/admin/pages/guests';
import { CategoriesView } from '../views/admin/pages/categories';
import { Usersview } from '../views/admin/pages/users';
import { TypeUsersView } from '../views/admin/pages/typeUsers';
import { RolesView } from '../views/admin/pages/roles/RolesView';
import { PermisionsView } from '../views/admin/pages/permisions';
import { StudentsView } from '../views/admin/pages/students';
import { ReportsView } from '../views/admin/pages/reports';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    };

    return (
        (status === 'not-authenticated') ?
            <RouterClient /> :
            <Layout>
                <Routes>
                    <Route path="/dashboardview" element={<DashboardView />} />
                    <Route path="/calendarview" element={<CalendarView />} />
                    <Route path="/eventsview" element={<EventViews />} />
                    <Route path="/guestsview" element={<GuestsView />} />
                    <Route path="/categoriesview" element={<CategoriesView />} />
                    <Route path="/usersview" element={<Usersview />} />
                    <Route path="/typeusersview" element={<TypeUsersView />} />
                    <Route path="/rolesview" element={<RolesView />} />
                    <Route path="/permisionsview" element={<PermisionsView />} />
                    <Route path="/studentsview" element={<StudentsView />} />
                    <Route path="/reportsview" element={<ReportsView />} />
                    <Route path="/*" element={<Navigate to={"/dashboardview"} />} />
                </Routes>
            </Layout>
    )
}
