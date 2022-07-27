import * as yup from 'yup';

export const FormValidations = yup.object({
    name: yup.string().required('Campo Obrigatório!'),
    amount: yup.number().required('Campo Obrigatório!'),
    date: yup.date().required('Campo Obrigatório!')      
});