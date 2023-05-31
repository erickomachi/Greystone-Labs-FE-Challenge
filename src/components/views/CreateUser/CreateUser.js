import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button } from "@material-ui/core"
import FormTextField from '@components/helper/forms/FormTextField';
import './CreateUser.css';
import { API_URL } from '../../../data/settings';

const defaultValue = {
  username: ''
};

const CreateUser = () => {
  const methods = useForm({ defaultValues: defaultValue });
  const { handleSubmit, control } = methods;
  
  const onSubmit = async(data) => {
    const requestObject = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    };

    const response = await fetch(`${API_URL}/users`, requestObject);
    console.log(response.status);
  }

  return (
    <Container maxWidth='md' disableGutters={false}>
      <Paper>
        <header>Hello! Welcome to the Loan Amortization App!</header>
        <p>In order to start, please create a new User.</p>

        <form onSubmit={handleSubmit(onSubmit)} className='align-left'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <FormTextField name='username' control={control} label="User Name" />
            </Grid>
            <Grid item>
              <Button variant='contained' color={'primary'} type='submit'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateUser;