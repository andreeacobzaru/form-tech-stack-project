import { gql } from '@apollo/client';

export const GET_FORM_DATA_BY_NAME = gql`
  query GetFormDataByName($name: String!) {
    formdataByName(name: $name) {
      id
      name
      fee
      rate
      minprem
      covlim
    }
  }
`;

export const ADD_FORM_DATA_MUTATION = gql`
  mutation AddFormData($name: String!, $fee: Decimal!, $rate: Decimal!, $covlim: Decimal!, $minprem: Decimal) {
    addFormData(name: $name, fee: $fee, rate: $rate, covlim: $covlim, minprem: $minprem) {
      formData {
        name
        fee
        rate
        covlim
        minprem
      }
    }
  }
`;

export const UPDATE_FORM_DATA_MUTATION = gql`
  mutation UpdateFormData($name: String!, $fee: Decimal!, $rate: Decimal!, $covlim: Decimal!, $minprem: Decimal) {
    updateFormData(name: $name, fee: $fee, rate: $rate, covlim: $covlim, minprem: $minprem) {
      formData {
        name
        fee
        rate
        covlim
        minprem
      }
    }
  }
`;
