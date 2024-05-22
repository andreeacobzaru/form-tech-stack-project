import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeReducer, nameChangeReducer, resetReducer} from '../formStateDataSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useLazyQuery } from '@apollo/client'

import { GET_FORM_DATA_BY_NAME } from '../gqlOperations';
import { Form, DollarText, Text } from './CustomFormComponents.jsx'

import { validateGreater0 } from '../validation.js';

const FirstComponent = (props) => {

  const [getFormDataByName, {loading, error}] = useLazyQuery(GET_FORM_DATA_BY_NAME);
  const [formKey, setFormKey] = useState(0);

  const dispatch = useDispatch();

  const initialValues = useSelector((state) => ({
    "name": state.formStateData.data.name, 
    "fee": state.formStateData.data.fee
  }));

  const getData = async (value) => {
    try {
      const { data } = await getFormDataByName({ variables: { 
        name: value
      } });
      if (data && data.formdataByName != null) {
        return data;
      } else {
        return null; 
      }
    } catch {
      console.log("Error checking if data exists");
      return null;
    }
  }

  const handleUpdateForm = async (value) => {
    const data = await getData(value);
    if (data != null) {
      try {
        dispatch(nameChangeReducer(data))
        setFormKey((prev) => (prev + 1)); // this rerenders the component
      } catch (error) {
        console.log("Caught error:", error);
      }
    } else if (data == null && true) {
      try {
        dispatch(resetReducer(value));
        setFormKey((prev) => (prev + 1)); // this rerenders the component
      } catch (error) {
        console.log("Caught error:", error);
      }
    }
  }

  const callQueryOnBlur = async () => {
    try {
      await handleUpdateForm(initialValues.name);
    } catch (error) {
      console.log("Caught error:", error);
    }
  }

  const validateName = value => {
    if (value == null) {
      return 'This field is required';
    } else {
      dispatch(changeReducer({ "name": value }));
    }
  }

  useEffect(() => {
    props.setDirection("FORWARD");
    props.setOkayToMove(true);
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Form key={formKey} onSubmit={props.onSubmitFunc} initialValues={initialValues}>
        <Stack spacing={2}>
          <Text field="name" label="Name" validateOnChange validate={validateName} onBlur={callQueryOnBlur}/>
          <DollarText field="fee" label="Fee" required validate={validateGreater0} validateOnChange/>
        </Stack>
        <Box component="section" sx={{marginY: 2}}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button variant="contained" type='next'>Next</Button>
          </Grid>
        </Box>
      </Form>
      {(loading) && <p>Loading...</p>}
      {(error) && <p>Error retrieving data: {error.message}</p>}
    </Box>
  )
}

export default FirstComponent