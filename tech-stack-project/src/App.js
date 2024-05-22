import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextReducer, prevReducer, submitReducer } from './formStateDataSlice';
import { Router, navigate } from "@reach/router";
import { ThemeProvider, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import { useMutation, useLazyQuery } from '@apollo/client'

import { GET_FORM_DATA_BY_NAME, ADD_FORM_DATA_MUTATION, UPDATE_FORM_DATA_MUTATION } from './gqlOperations';
import EnterForm from './components/EnterForm.jsx'
import FirstComponent from './components/FirstComponent.jsx'
import SecondComponent from './components/SecondComponent.jsx'
import ThirdComponent from './components/ThirdComponent.jsx'

import theme from './theme/theme'

function App() {

  const dispatch = useDispatch();

  const NUM_PAGES = 3

  const [pageNum, setPageNum] = useState(1);

  const [direction, setDirection] = useState('FORWARD');

  const [okayToMove, setOkayToMove] = useState(true);

  const handleNext = (values) => {
    dispatch(nextReducer(values));
    navigate('/component-' + (pageNum + 1));
    setPageNum((pageNum) => pageNum + 1);

    if (pageNum === NUM_PAGES && direction === 'FORWARD') {
      setOkayToMove(false);
    }
  }

  const handlePrev = (values) => {
    dispatch(prevReducer(values));
    navigate('/component-' + (pageNum - 1));
    setPageNum((pageNum) => pageNum - 1);

    if (pageNum === 1 && direction === 'BACKWARD') {
      setOkayToMove(false);
    }
  }

  const onSubmit = (values) => {
    if (direction === 'FORWARD' && okayToMove) {
      handleNext(values);
    }
    if (direction === 'BACKWARD' && okayToMove) {
      handlePrev(values);
    }
    if (direction === 'FINALSUBMIT') {
      handleFinalSubmit(values);
    }
  } 

  const [addFormData, {loadingAdd, errorAdd}] = useMutation(ADD_FORM_DATA_MUTATION);
  const [getFormDataByName, {loadingGet, errorGet}] = useLazyQuery(GET_FORM_DATA_BY_NAME);
  const [updateFormData, {loadingUpdate, errorUpdate}] = useMutation(UPDATE_FORM_DATA_MUTATION);

  const finalState = useSelector((state) => ({
    "formData": state.formStateData.data
  }))

  const checkIfDataExists = async () => {
    try {
      const { data } = await getFormDataByName({ variables: { 
        name: finalState.formData.name
      } });
      if (data && data.formdataByName != null) {
        return true;
      } else {
        return false; 
      }
    } catch {
      console.log("Error checking if data exists");
      return false;
    }
  }

  const handleFinalSubmit = async (values) => {
    dispatch(submitReducer(values));
    const dataExists = await checkIfDataExists(values.name);
    console.log("Data exists?", dataExists);
    if (dataExists) {
      try {
        await updateFormData({ variables: { 
          name: finalState.formData.name,
          fee: finalState.formData.fee,
          rate: finalState.formData.rate,
          covlim: finalState.formData.covlim,
          minprem: finalState.formData.isminprem? finalState.formData.minprem : -1
        } });
        // console.log("Data exists?", dataExists)
      } catch (error) {
        console.log("Caught error:", error);
      }
    } else {
      try {
        await addFormData({ variables: { 
          name: finalState.formData.name,
          fee: finalState.formData.fee,
          rate: finalState.formData.rate,
          covlim: finalState.formData.covlim,
          minprem: finalState.formData.minprem,
        } });
      } catch (error) {
        console.log("Caught error:", error);
      }
    }
    navigate("/thank-you-screen");
    setPageNum((pageNum) => pageNum + 1);
  }

  const handleReset = () => {
    setPageNum((pageNum) => 1);
    navigate("/");
    setDirection("FORWARD");
    window.location.reload();
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ paddingY: 2, paddingX: 6}}>
          <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          >
            <Typography variant="h6" component="div">
              Form
            </Typography>
            <Button color="secondary" variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </AppBar>
      </Box>
      <Container maxWidth="sm">
        <Box component="section" sx={{padding:5}}>
          <Stepper alternativeLabel activeStep={pageNum - 1}>
              {["Step 1", "Step 2", "Step 3"].map(function(step, index) {
                return (
                  <Step key={index}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                )
              })}
          </Stepper>
        </Box>
        <>
          <div className="page-component">
            <Router>
              <EnterForm path="/"></EnterForm>
              <FirstComponent path="/component-1" onSubmitFunc={onSubmit} setDirection={setDirection} setOkayToMove={setOkayToMove} />
              <SecondComponent path="/component-2" onSubmitFunc={onSubmit} setDirection={setDirection} setOkayToMove={setOkayToMove} />
              <ThirdComponent path="/component-3" onSubmitFunc={onSubmit} setDirection={setDirection} direction={direction} setOkayToMove={setOkayToMove} />
              <ThankYouScreen path="/thank-you-screen" />
              {(loadingAdd || loadingUpdate || loadingGet) && <p>Loading...</p>}
              {(errorAdd || errorUpdate || errorGet) && <p>Error: {errorAdd.message}</p>}
            </Router>
          </div>
        </> 
      </Container>
    </ThemeProvider>
  )
}

const ThankYouScreen = () => {
  return (
    <Typography>Thanks!</Typography>
  )
}

export default App;
