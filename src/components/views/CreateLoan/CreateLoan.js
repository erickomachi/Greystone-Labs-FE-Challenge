import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button, Snackbar } from "@material-ui/core"
import FormTextField from '@components/helper/forms/FormTextField';
import { API_URL } from '../../../data/settings';
import { useState } from 'react';
import SnackbarAlert from '@components/helper/alerts/SnackbarAlert';
import './CreateLoan.css'

const defaultValues = {
  amount: 0,
  apr: 0,
  term: 0,
  status: "",
  owner_id: 0
};

const CreateLoan = () => {
  const [receivedResponse, setReceivedResponse] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, control } = methods;
  
  const onSubmit = async(data) => {
    console.log(data)
    // const requestObject = {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // };

    // const response = await fetch(`${API_URL}/users`, requestObject);
    // if (response.status !== 200) {
    //   setIsSuccess(false);
    // }
    // else {
    //   setIsSuccess(true);
    // }
    // setReceivedResponse(true);
  }

  return (
    <Container maxWidth='md' disableGutters={false}>
      <Snackbar open={receivedResponse} autoHideDuration={2000} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} onClose={() => setReceivedResponse(false)}>
        <SnackbarAlert onClose={() => setReceivedResponse(false)} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
          {isSuccess ? `Loan created!` : `An error has occured!`}
        </SnackbarAlert>
      </Snackbar>
      <Paper>
        <p>Create a loan</p>

        <form onSubmit={handleSubmit(onSubmit)} className='align-left'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <FormTextField name='amount' control={control} label="Amount" />
            </Grid>
            <Grid item>
              <FormTextField name='apr' control={control} label="APR" />
            </Grid>
            <Grid item>
              <FormTextField name='term' control={control} label="term" />
            </Grid>
            <Grid item>
              <FormTextField name='status' control={control} label="Status" />
            </Grid>
            <Grid item>
              <FormTextField name='owner_id' control={control} label="This loan is for..." />
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

export default CreateLoan;