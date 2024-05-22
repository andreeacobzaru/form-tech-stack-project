import { useEffect } from 'react';
import { Relevant } from 'informed';
import { useSelector, useDispatch } from 'react-redux';
import { changeReducer } from '../formStateDataSlice';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { Form, DollarText, Text, CheckboxInformed } from './CustomFormComponents.jsx'
import { validateRate } from '../validation.js';

const SecondComponent = (props) => {
  const initialValues = useSelector((state) => ({
    "rate": state.formStateData.data.rate, 
    "isminprem": state.formStateData.data.isminprem,
    "minprem": state.formStateData.data.minprem,
  }));

  const dispatch = useDispatch();

  const validateMinPrem = value => {
    if (value == null || isNaN(value) || !(parseFloat(value) > 0)) {
      return 'This field must be a positive number';
    } else {
      dispatch(changeReducer({"minprem": value}));
    }
  }

  useEffect(() => {
    props.setOkayToMove(true);
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Form onSubmit={props.onSubmitFunc} initialValues={initialValues}>
        <Stack spacing={2}>
          <Text field="rate" label="Rate" required validate={validateRate} validateOnChange/>
          <CheckboxInformed field="isminprem" label="Minimum Premium?" />
          <Relevant when={({ values }) => values.isminprem}>
            <DollarText field="minprem" label="Minimum Premium" required validate={validateMinPrem} validateOnChange/>
          </Relevant>
          <Typography variant="subtitle1">premium = standard fee + coverage limit * rate</Typography>
          <Relevant when={({ values }) => values.isminprem}>
            <Typography variant="subtitle1">
              (Minimum Premium: {initialValues.minprem? initialValues.minprem : ""})
            </Typography>
          </Relevant>
        </Stack>
        <Box component="section" sx={{marginY: 2}}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" type='submit' name='back' onClick={() => props.setDirection("BACKWARD")}>Back</Button>
            <Button variant="contained" type='submit' name='next' onClick={() => props.setDirection("FORWARD")}>Next</Button>
          </Grid>
        </Box>
      </Form>
    </Box>
  )
}

export default SecondComponent