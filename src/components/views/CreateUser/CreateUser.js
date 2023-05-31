import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button } from "@material-ui/core"
import FormTextField from '@components/helper/forms/FormTextField';
import './CreateUser.css';

const defaultValue = {
  username: ''
};

const CreateUser = () => {
  const methods = useForm({ defaultValues: defaultValue });
  const { handleSubmit, control } = methods;
  
  const onSubmit = async(data) => {
    console.log(data);
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