import { Grid, Container } from "@mui/material";

import { Route, Routes } from 'react-router-dom';
import CreateUser from '@components/views/CreateUser/CreateUser';
import CreateLoan from '@components/views/CreateLoan/CreateLoan';
import GetAllLoans from '@components/views//GetAllLoans/GetAllLoans';
import ShareLoan from '@components/views/ShareLoan/ShareLoan';
import NavigationPane from '@components/views/NavigationPane/NavigationPane';
import Home from '@components/views/Home/Home';

function MainView() {
  return (
    <Grid container direction={"column"} justifyContent="space-evenly" alignItems={"stretch"} >
      <Grid item xs={2}>
        <NavigationPane />
      </Grid>
      <Grid item xs={10}>
        <Container disableGutters={false} >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-loan" element={<CreateLoan />} />
            <Route path="/get-all-loans" element={<GetAllLoans />} />
            <Route path="/share-loan" element={<ShareLoan />} />
          </Routes>
        </Container>
      </Grid>
    </Grid>
  );
}

export default MainView;
