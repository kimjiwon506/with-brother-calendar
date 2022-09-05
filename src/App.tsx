import dayjs from 'dayjs';
import React, { useState } from 'react';
import './App.css';
import DatePicker from './components/DatePicker';

export interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <div className="app">
      <DatePicker showData={date} onChange={setDate} />
    </div>
  );
};

export default App;
