import styles from './styles.module.scss'

import { Button } from '@chakra-ui/react'

//Componente de header criado e estilizado com sass, contém um botão que abre o modal através da função onOpen.

export function Header({onOpen}){
    return <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <h1>
                Transactions
            </h1>
            <Button colorScheme='green' size='lg' onClick={onOpen}>Add Transaction</Button>
        </div>
    </header>
}