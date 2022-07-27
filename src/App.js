import { Header } from "./componets/header";

import {ChakraProvider} from "@chakra-ui/react"
import { Transactions } from "./componets/transactions";

import { useDisclosure } from "@chakra-ui/react";


function App() {
  //são os controladores do modal, como ele é aberto pelo header convém importar um nível acima.
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  return (
    // provedor de estilos do Chakra
    // chamada do componente de header e a tabela de transações
    <ChakraProvider>
      <Header onOpen={onOpen}/> 
      <Transactions isOpen={isOpen} onClose={onClose}/>
    </ChakraProvider>
  );
}

export default App;
