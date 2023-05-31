import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button, Snackbar } from "@material-ui/core"
import FormTextField from '@components/helper/forms/FormTextField';
import FormDropdown from '@components/helper/forms/FormDropdown';
import { API_URL } from '../../../data/settings';
import { useState } from 'react';
import SnackbarAlert from '@components/helper/alerts/SnackbarAlert';
import './CreateLoan.css'

const statusDropdownValues = [
  {
    label: "active",
    value: "active"
  },
  {
    label: "inactive",
    value: "inactive"
  }
];

const defaultValues = {
  amount: NaN,
  apr: '',
  term: '',
  status: statusDropdownValues[0].value,
  owner_id: ''
};

const rules = {
  moreThan0: {
    min: {
      value: 1,
      message: 'Value must be  greater than 0'
    }
  }
}

const CreateLoan = () => {
  const [receivedResponse, setReceivedResponse] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
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
        <div>Create a loan</div>

        <form onSubmit={handleSubmit(onSubmit)} className='align-left'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <FormTextField name='amount' control={control} label="Amount" required={true} type='number' rules={rules.moreThan0}/>
            </Grid>
            <Grid item>
              <FormTextField name='apr' control={control} label="APR" required={true} type='number' rules={rules.moreThan0}/>
            </Grid>
            <Grid item>
              <FormTextField name='term' control={control} label="term" required={true} type='number' rules={rules.moreThan0}/>
            </Grid>
            <Grid item>
              <FormDropdown name='status' control={control} label="Status" options={statusDropdownValues} required={true}/>
            </Grid>
            <Grid item>
              <FormTextField name='owner_id' control={control} label="This loan is for..." required={true}/>
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