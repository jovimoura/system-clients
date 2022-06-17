import { Heading, Flex, Box } from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="white"
    >
      <Flex align='center' mr={5}>
        <Heading display='flex' as='h1' size='2xl' color='#007486' fontWeight='extrabold' letterSpacing={'tighter'}>System <Box color='#00D0F0' fontStyle='italic'>Clients</Box></Heading>
      </Flex>
    </Flex>
  )
}

export default Header
