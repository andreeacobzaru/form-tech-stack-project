import { navigate } from '@reach/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const EnterForm = () => {
  return (
    <Container maxWidth="sm">
      <Box component="section" sx={{marginY: 5}}>
        <Button variant="contained" onClick={() => navigate('/component-1')}>Fill out form</Button>
      </Box>
    </Container>
  )
}

export default EnterForm