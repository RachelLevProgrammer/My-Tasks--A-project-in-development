import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const Login = lazy(() => import('../src/componants/Login'));
const CalendarComponent = lazy(() => import('../src/componants/CalendarComponent'));
const CreateTask = lazy(() => import('./componants/CreateTask'));
const ReadAllTasksForToday = lazy(() => import('../src/componants/ReadAllTasksForToday'));
const ReadTask = lazy(() => import('../src/componants/ReadTask'));

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>טוען...</div>}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/CalendarComponent" element={<CalendarComponent />} />
          <Route path="/CreateTask" element={<CreateTask />} />
          <Route path="/ReadAllTasksForToday" element={<ReadAllTasksForToday />} />
          <Route path="/ReadTask" element={<ReadTask />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
