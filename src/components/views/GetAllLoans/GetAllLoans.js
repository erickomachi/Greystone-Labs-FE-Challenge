import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button, Snackbar } from "@material-ui/core"
import FormDropdownSearch from '@components/helper/forms/FormDropdownSearch';
import { API_URL } from '../../../data/settings';
import { useState, useEffect } from 'react';
import SnackbarAlert from '@components/helper/alerts/SnackbarAlert';
import LoanTable from '@components/helper/table/LoanTable';
import AmortizationTable from '@components/helper/table/AmortizationTable';

const defaultValues = {
  user_id: ''
};

const defaultLoanDetails = [{
  amount: 0,
  apr: 0,
  id: 0,
  owner_id: 0,
  status: 'inactive',
  term: 0
}];

const defaultAmortizedLoanDetails = [{
  month: 0,
  open_balance: 0,
  total_payment: 0,
  principal_payment: 0,
  interest_payment: 0,
  close_balance: 0
}];

const GetAllLoans = () => {
  const { handleSubmit, control, getValues } = useForm({ defaultValues: defaultValues });
  const [receivedResponse, setReceivedResponse] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userIds, setUserIds] = useState([{label: 'loading...', value: ''}]);
  const [loanDetails, setLoanDetails] = useState(defaultLoanDetails);
  const [selectedLoanDetails, setSelectedLoanDetails] = useState(defaultLoanDetails);
  const [amortizedLoanDetails, setAmortizedLoanDetails] = useState(defaultAmortizedLoanDetails);
  const [displayState, setDisplayState] = useState(1)
  
  const onSubmit = async(data) => {
    console.log(data)
    console.log("Beginning of onSubmit and value of displayState is: ", displayState)
    const response = await fetch(`${API_URL}/users/${data.user_id}/loans`);
    const responseData = await response.json()
    if (response.status !== 200) {
      setIsSuccess(false);
    }
    else {
      setIsSuccess(true);
      setLoanDetails(responseData);
      setDisplayState(2)
    }
    setReceivedResponse(true);

    console.log("End of onSubmit and value of displayState is: ", displayState)

  }

  // Callback function that child component LoanTable has
  const handleSelectedLoan = (selectedLoan) => {
    // buttonFunction.current = 2
    const { loan_id, self_owned } = selectedLoan;
    const formattedSelectedLoanDetails = {
      user_id: getValues().user_id,
      loan_id,
      self_owned: self_owned.split('with ')[1]
    }
    fetch(`${API_URL}/loans/${loan_id}?user_id=${getValues().user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setAmortizedLoanDetails(data)
      });
    setSelectedLoanDetails(formattedSelectedLoanDetails)
    setDisplayState(3)
  }

  // Grabs value from users GET endpoint
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => {
          return { label: user.username, value: user.id }
        })
        setUserIds(formattedData)
      })
    }, [userIds[0].value]
  )


  const determineButtonAction = () => {
    if (displayState === 1) {
      console.log('inside submit')
      // buttonFunction.current = 1
      return (               
        <Button variant='contained' color={'primary'} type='submit' key={displayState}>
          {`Get Info`}
        </Button>
      )
    }
    else if (displayState === 2) {
      console.log('inside close table')
      // buttonFunction.current = 0
      return (               
        <Button variant='contained' color={'primary'} onClick={() => setDisplayState(1)} key={displayState}>
          {`Close Table`}
        </Button>
      )
    }
    else if (displayState === 3) {
      console.log('inside amortized')
      // buttonFunction.current = 1
      return (               
        <Button variant='contained' color={'primary'} onClick={() => { setDisplayState(2)}} key={displayState}>
          {`Back to Loan Table`}
        </Button>
      )
    }
  }

  return (
    <Container maxWidth='lg' disableGutters={false}>
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
              <FormDropdownSearch name='user_id' control={control} label="Select user's loan info" options={userIds || undefined} required={true} style={{minWidth:220}} key={userIds}/>
            </Grid>
            <Grid item>
              {determineButtonAction()}
            </Grid>
          </Grid>
        </form>
        <br/>
        {displayState === 2 ? 
          <>
            <h3>Click on a row to view amortization details of the loan</h3>
            <LoanTable values={loanDetails} userIds={userIds} userId={getValues().user_id} handleSelectedLoan={handleSelectedLoan} key={userIds}/>
          </>
          : null}

          {displayState === 3 ? 
            <>
              <h3>Showing loan payment schedule. {selectedLoanDetails.self_owned ? `This loan is owned by ${selectedLoanDetails.self_owned}.` : ``}</h3>
              <AmortizationTable values={amortizedLoanDetails} key={amortizedLoanDetails}/>
            </>
          : null}
      </Paper>
    </Container>
  );
};

export default GetAllLoans;