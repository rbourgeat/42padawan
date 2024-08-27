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
  Link,
  IconButton,
  useColorMode,
  Grid
} from '@chakra-ui/react';
import { 
  MdEmail,
  MdLocationOn,
  MdMonetizationOn,
  MdDateRange,
  MdExplore,
  MdChecklistRtl,
  MdArrowForward,
  MdClear,
  MdCheck
} from 'react-icons/md';
import { FaMoon, FaSun } from 'react-icons/fa';

import ProgressBar from './components/ProgressBar';
import ProjectsCheck from './components/ProjectsCheck';

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hideEvents, setHideEvents] = useState(false);
  const navigate = useNavigate();

  const suiteProjects = [
    { slug: '42cursus-42sh', name: '42sh' },
    { slug: 'bgp-at-doors-of-autonomous-systems-is-simple', name: 'BADASS' },
    { slug: '42cursus-doom-nukem', name: 'DoomNukem' },
    { slug: 'inception-of-things', name: 'Inception Of Things' },
    { slug: '42cursus-humangl', name: 'HumanGL' },
    { slug: '42cursus-kfs-2', name: 'kfs-2' },
    { slug: '42cursus-override', name: 'Override' },
    { slug: '42cursus-pestilence', name: 'Pestilence' },
    { slug: '42cursus-rt', name: 'RT' },
    { slug: '42cursus-total-perspective-vortex', name: 'Total perspective vortex' }
  ];

  const option1ProjectsUnix = [
    { slug: 'libasm', name: 'libasm' },
    { slug: '42cursus-zappy', name: 'zappy' },
    { slug: '42cursus-gbmu', name: 'gbmu' },
    { slug: '42cursus-ft_linux', name: 'ft_linux' },
    { slug: '42cursus-little-penguin-1', name: 'little penguin' },
    { slug: '42cursus-taskmaster', name: 'taskmaster' },
    { slug: '42cursus-strace', name: 'strace' },
    { slug: '42cursus-malloc', name: 'malloc' },
    { slug: '42cursus-matt-daemon', name: 'Matt Daemon' },
    { slug: 'nm', name: 'nm' },
    { slug: '42cursus-lem-ipc', name: 'lem_ipc' },
    { slug: '42cursus-kfs-1', name: 'KFS 1' },
    { slug: '42cursus-kfs-2', name: 'KFS 2' },
    { slug: '42cursus-kfs-3', name: 'KFS 3' },
    { slug: '42cursus-kfs-4', name: 'KFS 4' },
    { slug: '42cursus-kfs-5', name: 'KFS 5' },
    { slug: '42cursus-kfs-6', name: 'KFS 6' },
    { slug: '42cursus-kfs-7', name: 'KFS 7' },
    { slug: '42cursus-kfs-8', name: 'KFS 8' },
    { slug: '42cursus-kfs-9', name: 'KFS 9' },
    { slug: '42cursus-kfs-10', name: 'KFS 10' }
  ];

  const option1ProjectsSys = [
    { slug: '42cursus-cloud-1', name: 'cloud-1' },
    { slug: 'bgp-at-doors-of-autonomous-systems-is-simple', name: 'BADASS' },
    { slug: 'inception-of-things', name: 'Inception Of Things' },
    { slug: '42cursus-taskmaster', name: 'taskmaster' },
    { slug: '42cursus-ft_ping', name: 'ft_ping' },
    { slug: '42cursus-ft_traceroute', name: 'ft_traceroute' },
    { slug: '42cursus-ft_nmap', name: 'ft_nmap' },
    { slug: '', name: 'Active Discovery' },
    { slug: '', name: 'Automatic Directory' },
    { slug: '', name: 'Administrative Directory' },
    { slug: '', name: 'Accessible Directory' }
  ];

  const option1ProjectsSec = [
    { slug: 'ft_malcolm', name: 'ft_malcolm' },
    { slug: '42cursus-ft_ssl_md5', name: 'ft_ssl_md5' },
    { slug: '42cursus-darkly', name: 'Darkly' },
    { slug: '42cursus-snow-crash', name: 'Snowcrash' },
    { slug: '42cursus-rainfall', name: 'Rainfall' },
    { slug: '42cursus-override', name: 'Override' },
    { slug: '42cursus-boot2root', name: 'boot2root' },
    { slug: '42cursus-ft_shield', name: 'ft_shield' },
    { slug: '42cursus-woody-woodpacker', name: 'Woody Woodpacker' },
    { slug: '42cursus-famine', name: 'Famine' },
    { slug: '42cursus-pestilence', name: 'Pestilence' },
    { slug: 'cybersecurity', name: 'Piscine Cybersecurity' },
    { slug: 'unleashthebox', name: 'UnleashTheBox' },
    { slug: '', name: 'Active Connect' },
    { slug: '', name: 'MicroForensX' },
    { slug: '', name: 'ActiveTechTales' }
  ];

  const option2ProjectsWeb = [
    { slug: '42cursus-piscine-php-symfony', name: 'Piscine PHP Symphany' },
    { slug: 'piscine-django', name: 'Piscine python Django' },
    { slug: '42cursus-piscine-ruby-on-rails', name: 'Piscine Ruby on Rails' },
    { slug: '42cursus-camagru', name: 'Camagru' },
    { slug: '42cursus-matcha', name: 'Matcha' },
    { slug: '42cursus-hypertube', name: 'Hypertube' },
    { slug: '42cursus-red-tetris', name: 'Red Tetris' },
    { slug: '42cursus-darkly', name: 'Darkly' },
    { slug: '42cursus-h42n42', name: 'h42n42' },
    { slug: 'tokenizer', name: 'Tokenizer' },
  ];

  const option2ProjectsAI = [
    { slug: '', name: 'Piscine Machine Learning' },
    { slug: '42cursus-ft_linear_regression', name: 'Linear regression' },
    { slug: '42cursus-dslr', name: 'DSLR' },
    { slug: '42cursus-multilayer-perceptron', name: 'Multi layer perceptron' },
    { slug: '42cursus-gomoku', name: 'Gomoku' },
    { slug: '42cursus-total-perspective-vortex', name: 'Total perspective vortex' },
    { slug: '42cursus-expert-system', name: 'Expert system' },
    { slug: '42cursus-krpsim', name: 'Krpsim' },
    { slug: 'matrix', name: 'Matrix' },
    { slug: 'ready-set-boole', name: 'Ready set boole' },
    { slug: 'leaffliction', name: 'Leaffliction' },
    { slug: 'piscine-data-science', name: 'Piscine Data Science' },
    { slug: 'python-for-data-science', name: 'Piscine Python for Data Science' },
  ];

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

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/logout', { withCredentials: true });

      window.location.replace('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error);
    }
  };

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

  const numberOfInternship = () => {
    let n = 0;
  
    const projects = [
      "internship-i",
      "internship-ii",
      "42cursus-startup-internship",
      "apprentissage-1-an",
      "fr-apprentissage-rncp-7-1-an",
      "fr-apprentissage-rncp-7-2-ans",
      "fr-apprentissage-rncp-6-1-an",
      "fr-apprentissage-rncp-6-2-ans",
      "42cursus-apprentissage-2-ans-1ere-annee",
      "apprentissage-2-ans-2eme-annee"
    ];
  
    const statuses = projects.map(slug => {
      const projectUser = profile.projects_users.find(p => p.project.slug === slug);
      return projectUser ? projectUser.status : null;
    });
  
    n += statuses.filter(status => status === "finished").length;

    return n;
  };  

  return (
    <Box p={8}>
      <Flex justify="flex-end" align="center" mb={6} position="absolute" top={4} right={4} zIndex="999">
        <Button variant='ghost' colorScheme='teal' mr={2} onClick={handleLogout}>
          Logout
				</Button>
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
              <ProgressBar level={profile.cursus_users[profile.cursus_users.length - 1].level} />
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={MdEmail} mr={2} />
              <Text fontSize="md"><strong>Mail:</strong> {profile.email}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={MdDateRange} mr={2} />
              <Text fontSize="md"><strong>Promotion:</strong> {profile.pool_month} {profile.pool_year}</Text>
            </Flex>
            <Flex align="center" mb={2}>
              <Icon as={MdExplore} mr={2} />
              <Text fontSize="md"><strong>Location:</strong> {profile.location ? profile.location : "At Home"}</Text>
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
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Flex align="center">
                  <Icon as={MdChecklistRtl} mr={2} />
                  RNCP 7
                </Flex>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <List spacing={2}>
                <Link color='blue.400' fontWeight="bold" href='https://meta.intra.42.fr/articles/rncp-7-certificate'>
                  <Flex align="center">
                    Official Page Here
                    <Icon as={MdArrowForward} ml={2} />
                  </Flex>
                </Link>
                <Link color='pink.400' fontWeight="bold" href='https://meta.intra.42.fr/articles/graduation-jury'>
                  <Flex align="center">
                    Next Jury Here
                    <Icon as={MdArrowForward} ml={2} />
                  </Flex>
                </Link>
                <Text>Pour les 2 options, il vous faut :</Text>
                <Grid pl={4}>
                  <Flex align="center" color={profile.projects_users.find(p => p.project.slug === "ft_transcendence").status == "finished" ? "green.400" : "gray.500" } mb={2}>
                    <Icon as={profile.projects_users.find(p => p.project.slug === "ft_transcendence")?.status == "finished" ? MdCheck : MdClear } mr={2} />
                    <Text>Completer le <strong>tronc commun</strong>.</Text>
                  </Flex>
                  <Flex align="center" mb={2}>
                    <Text>Avoir validé <strong>deux projets de groupe après le tronc commun.</strong></Text>
                  </Flex>
                  <Flex align="center" color={profile.cursus_users[profile.cursus_users.length - 1].level > 21 ? "green.400" : "gray.500" } mb={2}>
                    <Icon as={profile.cursus_users[profile.cursus_users.length - 1].level > 21 ? MdCheck : MdClear } mr={2} />
                    <Text>Atteindre le level <strong>21</strong>. (Your Level: {profile.cursus_users[profile.cursus_users.length - 1].level})</Text>
                  </Flex>
                  <Flex align="center" color={filteredEvents.length > 15 ? "green.400" : "gray.500" } mb={2}>
                    <Icon as={filteredEvents.length > 15 ? MdCheck : MdClear } mr={2} />
                    <Text>Avoir participé à au moins <strong>15 évènements pédagogiques</strong> depuis le début de votre cursus (hors event de type extern et association).</Text>
                  </Flex>
                  <Flex align="center" color={numberOfInternship() > 2 ? "green.400" : "gray.500" } mb={2}>
                  <Icon as={numberOfInternship() > 2 ? MdCheck : MdClear } mr={2} />
                    <Text>Avoir au moins <strong>2 expériences professionnelles à temps plein</strong> dans votre cursus.</Text>
                  </Flex>
                </Grid>
                <Text>Valider <strong>un</strong> des projets de la catégorie <strong>""Suite""</strong> :</Text>
                <ProjectsCheck projects_users={profile.projects_users} projects={suiteProjects} />
                <Text><strong>Option 1:</strong> Système d'information et réseaux</Text>
                <Text fontStyle="italic" color='gray.500' fontSize="sm">
                  Unix/Kernel - minimum 30000XP et minimum 2 projets.
                </Text>
                <ProjectsCheck projects_users={profile.projects_users} projects={option1ProjectsUnix} />
                <Text fontStyle="italic" color='gray.500' fontSize="sm">
                  System administration - minimum 50000XP et 3 projets.
                </Text>
                <ProjectsCheck projects_users={profile.projects_users} projects={option1ProjectsSys} />
                <Text fontStyle="italic" color='gray.500' fontSize="sm">
                  Security - minimum 50000XP et 3 projets.
                </Text>
                <ProjectsCheck projects_users={profile.projects_users} projects={option1ProjectsSec} />
                <Text><strong>Option 2:</strong> Architecture des bases de données et data</Text>
                <Text fontStyle="italic" color='gray.500' fontSize="sm">
                  Web - Database - minimum 50000XP et minimum 2 projets.
                </Text>
                <ProjectsCheck projects_users={profile.projects_users} projects={option2ProjectsWeb} />
                <Text fontStyle="italic" color='gray.500' fontSize="sm">
                  Artificial Intelligence - minimum 70000XP et minimum 3 projets.
                </Text>
                <ProjectsCheck projects_users={profile.projects_users} projects={option2ProjectsAI} />
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Stack spacing={4} mt={4}>
        <Button onClick={() => setIsOpen(!isOpen)} colorScheme='teal'>
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
