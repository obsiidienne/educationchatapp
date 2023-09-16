import React from 'react'
import { Heading } from '@chakra-ui/react'
import Form from './Components/Form'
import ListEtablissements from './Components/ListEtablissement'
import Container from './Components/Container'


const App = () => {
  return (
    <Container>
      <Heading as='h1' textAlign='center'>Etablissment Manager</Heading>
      <Form />
      <ListEtablissements />
		</Container>
	)
}

export default App