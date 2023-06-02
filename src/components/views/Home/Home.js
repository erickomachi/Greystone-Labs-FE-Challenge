import { Container } from "@mui/material";
import { Paper } from '@material-ui/core';
import './Home.css'

function Home() {
  return (
    <Container maxWidth='md' disableGutters={false}>
      <Paper className="Home">
      <div>Welcome to the Loan Amortization App!</div>
      <div>Click on the links above to get started!</div>
      </Paper>
    </Container>
  );
}

export default Home;
