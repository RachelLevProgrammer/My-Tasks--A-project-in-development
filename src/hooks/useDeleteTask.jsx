// hooks/useDeleteTask.js
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCalendar } from '../store/userSlice';

const useDeleteTask = (mockTasks, setMockTasks, setSelectedTask) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const useremail = useSelector((state) => state.user.useremail);
  const userTasks = useSelector((state) => state.user.calendar);

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/Tasks/deleteTask/${taskId}`, {
        params: { email: useremail },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const updatedTasks = mockTasks.filter(task => {
          const current = Array.isArray(task) ? task[0] : task;
          return current._id !== taskId;
        });
        setMockTasks(updatedTasks);
        setSelectedTask(null);

        const updatedCalendar = userTasks.filter(task => {
          const current = Array.isArray(task) ? task[0] : task;
          return current._id !== taskId;
        });
        dispatch(setCalendar(updatedCalendar));

        alert('Task deleted successfully');
      }
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Error deleting task');
    }
  };

  return deleteTask;
};

export default useDeleteTask;
