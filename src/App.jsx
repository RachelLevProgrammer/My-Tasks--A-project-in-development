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
        <Route path='/' element={<Suspense fallback="loading..."><Login/></Suspense>} />
         
          <Route path="/login" element={<Suspense fallback="loading..."><Login/></Suspense>} />
          <Route path="/CalendarComponent" element={<Suspense fallback="loading..."><CalendarComponent/></Suspense>} />
          <Route path="/CreateTask" element={<Suspense fallback="loading..."><CreateTask/></Suspense>} />
          <Route path="/ReadAllTasksForToday" element={<Suspense fallback="loading..."><ReadAllTasksForToday/></Suspense>} />
          <Route path="/ReadTask" element={<Suspense fallback="loading..."><ReadTask/></Suspense>} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
