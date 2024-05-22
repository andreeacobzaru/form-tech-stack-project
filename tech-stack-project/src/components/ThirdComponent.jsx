import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeReducer } from '../formStateDataSlice';
import {  Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Form, DollarText } from './CustomFormComponents.jsx'

const ThirdComponent = (props) => {
  const initialValues = useSelector((state) => ({
    "covlim": state.formStateData.data.covlim
  }));

  const otherValues = useSelector((state) => ({
    "fee": state.formStateData.data.fee, 
    "rate": state.formStateData.data.rate, 
    "isminprem": state.formStateData.data.isminprem,
    "minprem": state.formStateData.data.minprem,
  }));

  const dispatch = useDispatch();

  const validateCovLim = value => {
    if (value == null || isNaN(value) || !(parseFloat(value) > 0)) {
      return 'This field must be a positive number';
    } else {
      dispatch(changeReducer({"covlim": value}));
    }
  }
  
  useEffect(() => {
    props.setOkayToMove(true);
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Form onSubmit={props.onSubmitFunc} initialValues={initialValues}> 
        <Stack spacing={2}>
          <DollarText field="covlim" label="Coverage Limit" required validate={validateCovLim} validateOnChange/>
          <Typography variant="subtitle1">Premium Amount:  {initialValues.covlim !== undefined? parseFloat(otherValues.fee) + (parseFloat(initialValues.covlim)*parseFloat(otherValues.rate)) : null}</Typography>
          {otherValues.isminprem? <p>(Minimum Premium: {otherValues.minprem})</p>: null }
        </Stack>
        <Box component="section" sx={{marginY: 2}}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" type="submit" onClick={() => props.setDirection("BACKWARD")}>Back</Button>
            <Button color="secondary" variant="contained" type='submit' onClick={() => props.setDirection("FINALSUBMIT")}>Submit</Button>
          </Grid>
        </Box>
      </Form>
    </Box>
  )
}

export default ThirdComponent