import * as React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Calendar from './pages/Calendar';
import CalendarTest from './pages/CalendarTest';

const Root: React.FC = () =>
  useRoutes([
    {
      path: '/',
      element: <Calendar />,
    },
    {
      path: '/dayjs',
      element: <CalendarTest />,
    },
    {
      path: '*',
      element: <Navigate to={'/'} replace />,
    },
  ]);

export default Root;
