import * as React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Calendar from './pages/Calendar';

const Root: React.FC = () =>
  useRoutes([
    {
      path: '/',
      element: <Calendar />,
    },
    {
      path: '*',
      element: <Navigate to={'/'} replace />,
    },
  ]);

export default Root;
