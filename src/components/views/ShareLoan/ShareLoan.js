import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button, Snackbar } from "@material-ui/core"
import FormDropdownSearch from '@components/helper/forms/FormDropdownSearch';
import { API_URL } from '../../../data/settings';
import { useState, useEffect } from 'react';
import SnackbarAlert from '@components/helper/alerts/SnackbarAlert';

const defaultValues = {
  user_id: '',
  loan_id: '',
  owner_id: ''
};


const ShareLoan = () => {
  const [receivedResponse, setReceivedResponse] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ownerIds, setOwnerIds] = useState([{label: 'loading...', value: ''}]);
  const [loanValues, setLoanValues] = useState([{label: 'loading...', value: ''}]);
  const [userIds, setUserIds] = useState([{label: 'loading...', value: ''}]);
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, control, getValues, watch, reset } = methods;
  const watchOwnerId = watch('owner_id', defaultValues.owner_id);
  const watchLoanId = watch('loan_id', defaultValues.loan_id);
  
  const onSubmit = async(data) => {
    if(isSuccess) {
      setIsSuccess(false);
      reset();
    }
    else {
      const requestObject = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
      };
  
      const response = await fetch(`${API_URL}/loans/${data.loan_id}/share?owner_id=${data.owner_id}&user_id=${data.user_id}`, requestObject);
      const responseData = await response.json();
      if (!responseData.includes('success')) {
        setIsSuccess(false);
      }
      else {
        setIsSuccess(true);
      }
      setReceivedResponse(true);
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => {
          return { label: user.username, value: user.id }
        })
        setOwnerIds(formattedData)
      })
    }, [ownerIds[0].value]
  );

  useEffect(() => {
    if (watchOwnerId) {
      setLoanValues(undefined);
      setUserIds(undefined);
      fetch(`${API_URL}/users/${watchOwnerId}/loans`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data
            .filter((loanInfo) => loanInfo.owner_id === watchOwnerId)
            .map((loanInfo) => {
              return { label: `Loan ID: ${loanInfo.id} | $${loanInfo.amount} | term: ${loanInfo.term} | APR: ${loanInfo.apr} | ${loanInfo.status}`, value: loanInfo.id }
            });
          setLoanValues(formattedData);
          const removeSelf = ownerIds.filter((owner) => owner.value !== watchOwnerId);
          setUserIds(removeSelf);
        })
    }
  }, [watchOwnerId]);

  return (
    <Container maxWidth='md' disableGutters={false}>
      <Snackbar open={receivedResponse} autoHideDuration={2000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={() => setReceivedResponse(false)}>
        <SnackbarAlert onClose={() => setReceivedResponse(false)} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
          {isSuccess ? `Successfully shared ${ownerIds[getValues().owner_id-1].label}'s loan with ${ownerIds[getValues().user_id-1].label}!` : `An error has occured!`}
        </SnackbarAlert>
      </Snackbar>
      <Paper>
        <h3>Share a loan by filling out the required fields. The page will update as you fill out each field.</h3>

        <form onSubmit={handleSubmit(onSubmit)} className='align-left'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <FormDropdownSearch name='owner_id' control={control} label="Select a user" options={ownerIds} required={true} style={{ minWidth: 220 }} key={ownerIds} />
            </Grid>
            {watchOwnerId &&
              <Grid item>
                <FormDropdownSearch name='loan_id' control={control} label="Select a loan" options={loanValues} required={true} style={{ minWidth: 220 }} key={loanValues} />
              </Grid>}
            {watchLoanId &&
              <Grid item>
                <FormDropdownSearch name='user_id' control={control} label="Who to share with?" options={userIds} required={true} style={{ minWidth: 220 }} key={userIds} />
              </Grid>}
            {watchLoanId && 
            <Grid item>
              <Button variant='contained' color={'primary'} type='submit'>
                {!isSuccess ? `Submit` : `Reset Fields`}
              </Button>
            </Grid>}
          </Grid>
        </form>
        <br />
      </Paper>
    </Container>
  );
};

export default ShareLoan;