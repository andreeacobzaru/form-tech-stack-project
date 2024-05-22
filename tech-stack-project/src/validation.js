export const validateGreater0 = value => {
  if (value == null || isNaN(value) || !(parseFloat(value) > 0)) {
    return "Field must be a positive number";
  }
}

export const validateRate = value => {
  if (value == null || isNaN(value) || (parseFloat(value) < 0 || parseFloat(value) > 1)) {
    return 'This field must be between 0 and 1';
  }
}