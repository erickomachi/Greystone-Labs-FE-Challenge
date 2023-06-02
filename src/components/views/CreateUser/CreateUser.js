import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button, Snackbar } from "@material-ui/core"
import FormTextField from '@components/helper/forms/FormTextField';
import { API_URL } from '../../../data/settings';
import { useState } from 'react';
import SnackbarAlert from '@components/helper/alerts/SnackbarAlert';

const defaultValue = {
  username: ''
};

const CreateUser = () => {
  const [receivedResponse, setReceivedResponse] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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
    if (response.status !== 200) {
      setIsSuccess(false);
    }
    else {
      setIsSuccess(true);
    }
    setReceivedResponse(true);
  }

  return (
    <Container maxWidth='md' disableGutters={false}>
      <Snackbar open={receivedResponse} autoHideDuration={2000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={() => setReceivedResponse(false)}>
        <SnackbarAlert onClose={() => setReceivedResponse(false)} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
          {isSuccess ? `User created!` : `An error has occured!`}
        </SnackbarAlert>
      </Snackbar>
      <Paper>
        <h3>Create a user by providing a user name and clicking submit.</h3>

        <form onSubmit={handleSubmit(onSubmit)} className='align-left'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <FormTextField name='username' control={control} label="User Name" required={true}/>
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