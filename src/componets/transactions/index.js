import { useEffect, useState } from "react";

import { api } from "../../services/api";

import { FormValidations } from "../../utils/formValidation";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    
  } from '@chakra-ui/react'

  import { DeleteIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useFormik } from "formik";

export function Transactions({isOpen, onClose}){
    //cria o estado para armazenar as informações das transações.
    const [transactions, setTransactions] = useState([])


    //faz a busca inicial de dados na api, nesse caso vai buscar os valores defaults definidos no server.
    useEffect(()=>  {
        api.get('transactions').then(response => setTransactions(response.data));

    }, [])

    function removeElement(id){
        api.delete(`transaction/${id}`).then(response => setTransactions(response.data)).catch(err=> alert(err))
        
    }

    //formik é uma biblioteca para gerenciar formulários, é definido os valores iniciais dos inputs
    //aceita um modelo de validação criado com o YUP e disponível na pasta /Utils.
    const formik = useFormik(
        {
          initialValues:{
            name: '',
            amount: '',
            date: '',
            type: 'expenses',
          },

          validationSchema: FormValidations,

          // faz a chamada da api passando os dados do formulário e 
          // atualiza o estado da tela através do retorno da api.
          onSubmit: async (values) => {
            await api.post('transaction', {
              name: values.name,
              amount: values.amount,
              date: values.date,
              type: values.type
            }).then(
              (response) => {
                setTransactions(response.data);
                onClose();
                formik.resetForm();
              }, err => {
                alert('Erro: ' + err)
              }
            )
          },
        }
      )
    
    return <>
        {/* Cria o modal passando os controladores que vinheram das props */}
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
            <ModalHeader>Add New Transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

            {/* Aqui o formulário do chakra UI integrando ao formik */}
            <FormControl onSubmit={formik.handleSubmit}>
                <FormLabel>Name for transaction</FormLabel>
                <Input 
                    type='text'
                    name='name' 
                    id='name'
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder={formik.touched.name && formik.errors.name ? formik.errors.name : 'eg.: Supermercado'}
                    err = {formik.touched.name && formik.errors.name}
                    
                />
                    
                <FormLabel>amount</FormLabel>
                <Input 
                    type='text'
                    name='amount' 
                    id='amount'
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                    placeholder={formik.touched.amount && formik.errors.amount ? formik.errors.amount : 'eg.: 0.0'}
                    err = {formik.touched.amount && formik.errors.amount}
                
                />
                <FormLabel>date</FormLabel>
                <Input 
                    type='date'
                    name='date' 
                    id='date'
                    
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    placeholder={formik.touched.date && formik.errors.date ? formik.errors.date : ''}
                    err = {formik.touched.date && formik.errors.date}
                />
                <FormLabel>Type</FormLabel>
                <Select defaultValue={formik.values.type} 
                    name='type' 
                    id='type'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                >
                    <option value='expenses'>Expenses</option>
                    <option value='income'>Income</option>
                </Select>

            </FormControl>
            </ModalBody>

            {/* Aqui é o rodapé do modal, contém os botões de enviar o formulário e fechar o modal */}
            <ModalFooter>
                <Button color='red.500' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button color='green.500' mr={3} type='submit' onClick={formik.submitForm}>
                Add
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

        {/* Cria a tabela para as informações das transações semelhante ao html e react puro :) */}
        <TableContainer alignContent='center'>
        <Table maxW={1000} margin='0 auto'>
                <Thead>
                    <Tr>
                        <Th>Transaction</Th>
                        <Th>Description</Th>
                        <Th>Amount</Th>
                        <Th>Date</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>

                    {/*Mapeia as informações que vinheram da api e foram armazenadas no estado transactions */}
                    {transactions.map(transaction => 
                        <Tr key={transaction.id}>
                            <Td>{transaction.type === 'income'? <ChevronUpIcon color='green.500' h={5} w={5}/>:<ChevronDownIcon color='red.500'/>}</Td>
                            <Td>{transaction.name}</Td>
                            <Td>{transaction.amount}</Td>
                            <Td>{transaction.date}</Td>
                            <Td><Button onClick={()=> removeElement(transaction.id)} colorScheme='red'><DeleteIcon color='white'/></Button></Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    </>
}