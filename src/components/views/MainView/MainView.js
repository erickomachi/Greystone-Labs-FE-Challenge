import './MainView.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import CreateUser from '@components/views/CreateUser/CreateUser';
import CreateLoan from '@components/views/CreateLoan/CreateLoan';

function MainView() {
  return (
    <Routes>
      <Route path="/" element={<CreateUser />} />
      <Route path="/create-loan" element={<CreateLoan />} />
    </Routes>
  );
}

export default MainView;
