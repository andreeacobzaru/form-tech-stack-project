import { useForm, useField } from 'informed';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';

// Building Form Component

export const Form = ({ children, ...props }) => {
  const { formController, render, userProps } = useForm(props);
  return render(
    <form {...userProps} onSubmit={formController.submitForm}>
    {children}
    </form>
  );
};
  
  // Building Input Components
  
export const DollarText = ({ label, ...props }) => {
  const { render, informed, ...rest } = useField({ fieldType: 'text', ...props });
  return render(
    <TextField
      {...informed}
      label={label}
      variant="standard"
      size="small"
      error={rest.fieldState.error !== undefined}
      helperText={rest.fieldState.error !== undefined? rest.fieldState.error : ''}
      InputProps={{
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  );
};

export const Text = ({ label, ...props }) => {
  const { render, informed, ...rest } = useField({ fieldType: 'text', ...props });
  return render(
    <TextField
      label={label}
      variant="standard"
      size="small"
      error={rest.fieldState.error !== undefined}
      helperText={rest.fieldState.error !== undefined? rest.fieldState.error : ''}
      {...informed}
    />
  );
};

export const CheckboxInformed = ({ label, ...props }) => {
  const { render, informed } = useField({ fieldType: 'checkbox', ...props });
  return render(
    <FormControlLabel control={<Checkbox {...informed} checked={informed.value}/>} label={label} />
  );
};