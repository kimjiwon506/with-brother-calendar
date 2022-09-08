import { BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import Routes from './routes';

export interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default App;
