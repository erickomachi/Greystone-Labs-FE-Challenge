import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button, Snackbar } from "@material-ui/core"
import FormDropdownSearch from '@components/helper/forms/FormDropdownSearch';
import { API_URL } from '../../../data/settings';
import { useState, useEffect } from 'react';
import SnackbarAlert from '@components/helper/alerts/SnackbarAlert';
import LoanTable from '@components/helper/table/LoanTable';
import './GetAllLoans.css'

const defaultValues = {
  user_id: ''
};

const defaultLoanValues = [{
  amount: 0,
  apr: 0,
  id: 0,
  owner_id: 0,
  status: 'inactive',
  term: 0
}];

const GetAllLoans = () => {
  const [receivedResponse, setReceivedResponse] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userIds, setUserIds] = useState([{label: 'loading...', value: ''}]);
  const [loanValues, setLoanValues] = useState(defaultLoanValues)
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, control, getValues } = methods;
  
  const onSubmit = async(data) => {
    if(isSuccess) {
      setIsSuccess(false)
    }
    else {
      console.log('sending data! ', data);
      const requestObject = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET',
      };
  
      const response = await fetch(`${API_URL}/users/${data.user_id}/loans`, requestObject);
      const responseData = await response.json()
      console.log('printing out response data: ', responseData)
      if (response.status !== 200) {
        setIsSuccess(false);
      }
      else {
        setIsSuccess(true);
        setLoanValues(responseData)
      }
      setReceivedResponse(true);
    }
  }

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => {
          return { label: user.username, value: user.id }
        })
        setUserIds(formattedData)
        console.log(userIds)
      })
    }, [userIds[0].value]
  )

  return (
    <Container maxWidth='md' disableGutters={false}>
      <Snackbar open={receivedResponse} autoHideDuration={2000} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} onClose={() => setReceivedResponse(false)}>
        <SnackbarAlert onClose={() => setReceivedResponse(false)} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
          {isSuccess ? `Fetched ${userIds[getValues().user_id-1].label}'s loans!` : `An error has occured!`}
        </SnackbarAlert>
      </Snackbar>
      <Paper>
        <div></div>

        <form onSubmit={handleSubmit(onSubmit)} className='align-left'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <FormDropdownSearch name='user_id' control={control} label="Select user's loan info" options={userIds} required={true} style={{minWidth:220}} key={userIds}/>
            </Grid>
            <Grid item>
              <Button variant='contained' color={'primary'} type='submit'>
                {!isSuccess ? `Get Info` : `Close Table`}
              </Button>
            </Grid>
          </Grid>
        </form>
        <br/>
        {isSuccess ? <LoanTable values={loanValues} userIds={userIds} userId={getValues().user_id}/> : null}
      </Paper>
    </Container>
  );
};

export default GetAllLoans;