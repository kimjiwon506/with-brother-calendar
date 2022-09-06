import * as React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Calendar from './pages/Calendar';
import DayJsTest from './pages/DayJsTest';

const Root: React.FC = () =>
  useRoutes([
    {
      path: '/',
      element: <Calendar />,
    },
    {
      path: '/dayjs',
      element: <DayJsTest />,
    },
    {
      path: '*',
      element: <Navigate to={'/'} replace />,
    },
  ]);

export default Root;
