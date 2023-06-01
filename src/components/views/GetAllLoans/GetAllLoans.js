import { useForm } from 'react-hook-form';
import { Container, Paper } from "@material-ui/core"
import { Grid, Button, Snackbar } from "@material-ui/core"
import FormDropdownSearch from '@components/helper/forms/FormDropdownSearch';
import { API_URL } from '../../../data/settings';
import { useState, useEffect } from 'react';
import SnackbarAlert from '@components/helper/alerts/SnackbarAlert';
import './GetAllLoans.css'

const defaultValues = {
  user_id: ''
};

const GetAllLoans = () => {
  const [receivedResponse, setReceivedResponse] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userIds, setUserIds] = useState([{label: 'loading...', value: ''}]);
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, control, getValues } = methods;
  
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

    // const response = await fetch(`${API_URL}/users/${data.user_id}/loans`, requestObject);
    // if (response.status !== 200) {
    //   setIsSuccess(false);
    // }
    // else {
    //   setIsSuccess(true);
    // }
    // setReceivedResponse(true);
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
          {isSuccess ? `Fetched ${userIds[getValues().user_id].label}'s loans!` : `An error has occured!`}
        </SnackbarAlert>
      </Snackbar>
      <Paper>
        <div>Get all loans for a specific user</div>

        <form onSubmit={handleSubmit(onSubmit)} className='align-left'>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <FormDropdownSearch name='user_id' control={control} label="Fetching loans from..." options={userIds} required={true} style={{minWidth:220}} key={userIds}/>
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

export default GetAllLoans;