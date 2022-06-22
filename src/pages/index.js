import { useState, useEffect } from 'react'

import {
  Box,
  Flex,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast
} from '@chakra-ui/react'

import api from '../services/api'
import Header from '../components/Header'
import Head from 'next/head'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState(null)
  const [clients, setClients] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  useEffect(() => {
    api.get('/clients').then(({ data }) => {
      setClients(data)
    })
  }, [clients])

  const isValidFormData = () => {
    if (!name) {
      return toast({
        title: 'Fill in the name field!',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }

    if (!email) {
      return toast({
        title: 'Fill in the email field!',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }

    if (clients.some(client => client.email === email && client.id !== id)) {
      return toast({
        title: 'E-mail already registered!',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    }
  }

  const handleSubmitCreateSubmit = async e => {
    e.preventDefault()

    if (isValidFormData()) return

    try {
      setIsLoading(true)
      await api.post('/clients', { name, email })
      setName('')
      setEmail('')
      setIsFormOpen(!isFormOpen)
      toast({
        title: 'Registered successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      setIsLoading(false)
    } catch (error) {
      console.log('form error', error)
      setIsLoading(false)
    }
  }

  const handleDeleteClient = async (_id) => {
    try {
      await api.delete(`/clients/${_id}`)
      toast({
        title: 'Successfully deleted!',
        status: 'info',
        duration: 9000,
        isClosable: true
      })
    } catch (error) {
      console.log('delete error', error)
    }
  }

  const handleShowUpdateClient = (client) => {
    setId(client._id)
    setName(client.name)
    setEmail(client.email)
    setIsFormOpen(true)
  }

  const handleUpdateClient = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      await api.put(`clients/${id}`, { name, email })
      setName('')
      setEmail('')
      setIsFormOpen(!isFormOpen)
      toast({
        title: 'Updated successfully!',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('error update', error)
    }
  }

  return (
    <Box>
      <Head>
        <title>System Clients</title>
        <link rel="shortcut icon" href="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/undefined/external-user-interface-kiranshastry-gradient-kiranshastry.png" type="image/x-icon" />
      </Head>
      <Header />
      <Flex align="center" justify="center" height='100%' width='100%'>
        <Box
          width={[500, 800]}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          p={[10,20]}
          mt="25"
          overflow='auto'
        >
          <Flex justifyContent="flex-start">
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              colorScheme="cyan"
              color='white'
              borderRadius='100%'
            >
              {isFormOpen ? '-' : '+'}
            </Button>
          </Flex>
          {isFormOpen ? (
            <VStack as="form" onSubmit={id ? handleUpdateClient : handleSubmitCreateSubmit}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  placeholder="Write your name..."
                />
              </FormControl>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="Write your e-mail..."
                />
              </FormControl>
              <Button
                isLoading={isLoading}
                colorScheme='cyan'
                color='white'
                type="submit"
                mt={6}
              >
                {id ? 'Update' : 'New'}
              </Button>
            </VStack>
          ) : (
            null
          )}
          <Table variant="simple" overflow='auto' mt={6}>
            <Thead bg="white">
              <Tr>
                <Th textAlign='center' textColor="#0F1217">Name</Th>
                <Th textAlign='center' textColor="#0F1217">E-mail</Th>
                <Th textAlign='center' textColor="#0F1217">Functions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients?.map((client, i) => (
                <Tr key={i}>
                  <Td textAlign='center'>{client?.name}</Td>
                  <Td textAlign='center'>{client?.email}</Td>
                  <Td justifyContent="space-between" flexWrap='wrap'>
                    <Flex>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="yellow"
                        mr="2"
                        onClick={() => handleShowUpdateClient(client)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        mr="2"
                        onClick={() => handleDeleteClient(client._id)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}
