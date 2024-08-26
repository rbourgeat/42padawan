import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  Collapse,
  Button,
  Flex,
  Image,
  Icon,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Switch,
  FormLabel,
  Link
} from '@chakra-ui/react';
import { MdEmail, MdLocationOn, MdMonetizationOn, MdDateRange } from 'react-icons/md';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hideEvents, setHideEvents] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/profile', { withCredentials: true });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
        if (error) {
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (profile) {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/events/${profile.id}`, { withCredentials: true });
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events data:', error);
        }
      };

      fetchEvents();
    }
  }, [profile]);

  if (error) {
    return (
      <Box p={8}>
        <Alert status="error">
          <AlertIcon />
          Error fetching user data.
        </Alert>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        p={8}
        textAlign="center"
      >
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Flex>
    );
  }

  const renderValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return value;
  };

  const filteredEvents = events.filter(event => {
    if (hideEvents && (event.event.kind === 'association' || event.event.kind === 'extern' || event.event.kind === 'other')) return false;
    return true;
  });

  const eventBackgroundColor = (kind) => {
    switch (kind) {
      case 'meet_up':
        return '#00babc';
      case 'event':
        return '#00babc';
      case 'conference':
        return '#00babc';
      case 'pedago':
        return '#ED8179';
      case 'workshop':
        return '#39D88F';
      case 'hackathon':
        return '#39D88F';
      case 'association':
        return '#a2b3e5';
      case 'extern':
        return '#c0c0c0';
      default:
        return '#c0c0c0';
    }
  };

  return (
    <Box p={8}>
      <Heading>Profile Information</Heading>
      <Flex direction="row" align="center" mt={8}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src={profile.image.versions.large}
          alt={profile.usual_full_name}
          mr={6}
        />
        <Box>
          <Flex align="center">
            <Heading size="lg" mr={4}>{profile.usual_full_name}</Heading>
            <Text fontSize="lg" color="gray.600">({profile.login})</Text>
          </Flex>
          <Box color="gray.500">
            <Flex align="center" mb={2}>
              <Icon as={MdEmail} mr={2} />
              <Text fontSize="md"><strong>Mail:</strong> {profile.email}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={MdDateRange} mr={2} />
              <Text fontSize="md"><strong>Promotion:</strong> {profile.pool_month} {profile.pool_year}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={MdLocationOn} mr={2} />
              <Text fontSize="md"><strong>Location:</strong> {profile.location}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={MdMonetizationOn} mr={2} />
              <Text fontSize="md"><strong>Wallet:</strong> {profile.wallet}</Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Box mt={8}>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Flex align="center" mb={2}>
                  <Icon as={MdDateRange} mr={2} />
                  Your Events ({filteredEvents.length})
                </Flex>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex>
                <Switch
                  id="hide-events"
                  isChecked={hideEvents}
                  onChange={(e) => setHideEvents(e.target.checked)}
                />
                <FormLabel htmlFor="hide-events" mb={2} ml={3}>
                  Hide Associations, Externs and Others
                </FormLabel>
              </Flex>
              <List spacing={3} mt={4}>
                {filteredEvents.map((event) => (
                  <ListItem 
                    key={event.event_id}
                    p={4}
                    shadow="md"
                    backgroundColor={eventBackgroundColor(event.event.kind)}
                  >
                    <Link href={`https://profile.intra.42.fr/events/${event.event.id}`} isExternal>
                      <Heading size="sm" mb={2}>{event.event.name}</Heading>
                    </Link>
                    <Flex align="center" mb={2}>
                      <Icon as={MdLocationOn} mr={2} />
                      <Text fontSize="md"><strong>Location:</strong> {event.event.location ? event.event.location : "Unknown"}</Text>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Stack spacing={4} mt={4}>
        <Button onClick={() => setIsOpen(!isOpen)} colorScheme="blue">
          {isOpen ? 'Hide Debug' : 'Show Debug'}
        </Button>
        <Collapse in={isOpen}>
          {Object.entries(profile).map(([key, value]) => (
            <Box key={key} p={4} shadow="md" borderWidth="1px" mb={2}>
              <Heading size="sm" mb={2}>{key}</Heading>
              <Text whiteSpace="pre-wrap">{renderValue(value)}</Text> {/* Render value using renderValue function */}
            </Box>
          ))}
        </Collapse>
      </Stack>
    </Box>
  );
};

export default Home;
