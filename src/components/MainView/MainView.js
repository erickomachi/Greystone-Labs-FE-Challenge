import './MainView.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import CreateUser from '@components/CreateUser/CreateUser';

function MainView() {
  return (
    <Routes>
      <Route path="/" element={<CreateUser />} />
    </Routes>
  );
}

export default MainView;
