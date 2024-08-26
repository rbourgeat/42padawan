import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Button,
  IconButton,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Login = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8000/login';
  };

  return (
    <Box p={8} maxWidth="400px" mx="auto">
      <Flex justify="flex-end" align="center" mb={6} position="absolute" top={4} right={4} zIndex="999">
        <IconButton
          onClick={toggleColorMode}
          isRound={true}
          variant='solid'
          colorScheme='teal'
          aria-label='Toggle theme'
          fontSize='20px'
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        />
      </Flex>
      <Heading textAlign="center" mb={6}>
        42padawan
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Button type="submit" colorScheme="teal">
            Login with 42
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
