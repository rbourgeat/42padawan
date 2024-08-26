import React from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  IconButton,
  Heading,
  useColorMode,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Register = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

  	return (
		<Box p={8} maxWidth="400px" mx="auto">
			<img src="/icon-512x512.png" alt="Logo" style={{ position: 'absolute', top: 0, left: 0, width: '75px', marginLeft: '4px', marginTop: '4px' }} />
			<Flex justify="flex-end" align="center" mb={6} position="absolute" top={4} right={4} zIndex="999">
				<Button variant='ghost' colorScheme='teal' mr={2}>
					<Link to="/login">Login</Link>
				</Button>
				<IconButton
					onClick={toggleColorMode}
					isRound={true}
					variant='solid'
					colorScheme='teal'
					aria-label='Done'
					fontSize='20px'
					icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
				/>
			</Flex>
			<Heading textAlign="center" mb={6}>
				Register
			</Heading>
			<form onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<FormControl isRequired>
						<FormLabel>Username</FormLabel>
						<Input type="text" placeholder="Enter your username" />
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Email Address</FormLabel>
						<Input type="email" placeholder="Enter your email address" />
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Last Name</FormLabel>
						<Input type="text" placeholder="Enter your last name" />
					</FormControl>
					<FormControl isRequired>
						<FormLabel>First Name</FormLabel>
						<Input type="text" placeholder="Enter your first name" />
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Password</FormLabel>
						<Input type="password" placeholder="Enter your password" />
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Confirm Password</FormLabel>
						<Input type="password" placeholder="Enter your password again" />
					</FormControl>
					<Button type="submit" colorScheme="teal">
						Register
					</Button>
				</Stack>
				</form>
			<Flex justify="center" mt={4}>
				<Button variant="link" colorScheme="teal">
					<Link to="/login">
						Already have an account?
					</Link>
				</Button>
			</Flex>
		</Box>
  	);
};

export default Register;
