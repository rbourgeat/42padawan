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
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Switch,
  FormLabel,
  Link,
  IconButton,
  useColorMode,
  Grid,
  Progress
} from '@chakra-ui/react';
import { 
  MdEmail,
  MdLocationOn,
  MdMonetizationOn,
  MdDateRange,
  MdExplore,
  MdChecklistRtl,
  MdClear,
  MdCheck,
  MdAutoGraph
} from 'react-icons/md';
import { FaMoon, FaSun, FaExternalLinkAlt } from 'react-icons/fa';

import ProjectBox from './components/ProjectBox';
import ProgressBar from './components/ProgressBar';
import ProjectsCheck from './components/ProjectsCheck';

import projectData from './data/projects.json';

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
        return 'linear-gradient(160deg, #00babc 0%, #80D0C7 100%)';
      case 'event':
        return 'linear-gradient(160deg, #00babc 0%, #80D0C7 100%)';
      case 'conference':
        return 'linear-gradient(160deg, #00babc 0%, #80D0C7 100%)';
      case 'pedago':
        return 'linear-gradient(160deg, #ED8179 0%, #80D0C7 100%)';
      case 'workshop':
        return 'linear-gradient(160deg, #39D88F 0%, #80D0C7 100%)';
      case 'hackathon':
        return 'linear-gradient(160deg, #39D88F 0%, #80D0C7 100%)';
      case 'association':
        return 'linear-gradient(160deg, #a2b3e5 0%, #80D0C7 100%)';
      case 'extern':
        return 'linear-gradient(160deg, #c0c0c0 0%, #80D0C7 100%)';
      default:
        return 'linear-gradient(160deg, #c0c0c0 0%, #80D0C7 100%)';
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

  function getGroupProject() {
    let numberOfGroupProject = 0;
    
    Object.keys(projectData).forEach((key) => {
      const projects = projectData[key];
  
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].group) {
          numberOfGroupProject += 1;
        }
      }
    });

    return numberOfGroupProject;
  }

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
          boxShadow="lg"
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        />
      </Flex>
      <Heading textAlign="center" mb={6} bgGradient='linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' bgClip='text' >
        42padawan
      </Heading>
      <Flex direction="row" align="center" mt={8}>
        <Image
          borderRadius="full"
          boxSize="150px"
          src={profile.image.versions.large}
          alt={profile.usual_full_name}
          boxShadow="lg"
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
        <Tabs variant="unstyled">
          <TabList>
            <Tab>
              <Flex align="center" mr={2}>
                <Icon as={MdAutoGraph} mr={2} />
                Skills
              </Flex>
            </Tab>
            <Tab>
              <Flex align="center" mr={2}>
                <Icon as={MdDateRange} mr={2} />
                Your Events ({filteredEvents.length})
              </Flex>
            </Tab>
            <Tab>
              <Flex align="center">
                <Icon as={MdChecklistRtl} mr={2} />
                RNCP 7
              </Flex>
            </Tab>
            <Tab isDisabled>
              <Flex align="center">
                <Icon as={MdChecklistRtl} mr={2} />
                RNCP 6
              </Flex>
            </Tab>
          </TabList>
          <TabIndicator mt='-1.5px' height='2px' bgGradient='linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' borderRadius="md" />

          <TabPanels>
            <TabPanel>
              <Box p={5}>
                  {profile.cursus_users[profile.cursus_users.length - 1].skills.map(skill => (
                    <Box key={skill.id} p={1}>
                      <Text mb={2}><strong>{skill.name}</strong> <Text as="span" color="gray.500">({((skill.level / 20) * 100).toFixed(1)}%)</Text></Text>
                      <Progress 
                        value={(skill.level / 20) * 100}
                        size="lg" 
                        borderRadius="md"
                        sx={{
                          '& > div': {
                            bgGradient: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            boxShadow: 'lg',
                          }
                        }}
                      />
                    </Box>
                  ))}
              </Box>
            </TabPanel>

            <TabPanel>
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
                    shadow="lg"
                    borderRadius="md"
                    bgGradient={eventBackgroundColor(event.event.kind)}
                  >
                    <Link href={`https://profile.intra.42.fr/events/${event.event.id}`} isExternal>
                      <Heading size="sm" mb={2}>{event.event.name}</Heading>
                    </Link>
                    <Flex align="center" mb={2}>
                      <Icon as={MdLocationOn} mr={2} />
                      <Text fontSize="md">
                        <strong>Location:</strong> {event.event.location ? event.event.location : "Unknown"}
                      </Text>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel>
              <List spacing={2}>
                <Flex align="center" color="blue.400" fontWeight="bold">
                  <Link href="https://meta.intra.42.fr/articles/rncp-7-certificate">
                    Official Page Here
                  </Link>
                  <Icon as={FaExternalLinkAlt} ml={2} />
                </Flex>
                <Flex align="center" color="pink.400" fontWeight="bold">
                  <Link href="https://meta.intra.42.fr/articles/graduation-jury">
                    Next Jury Here
                  </Link>
                  <Icon as={FaExternalLinkAlt} ml={2} />
                </Flex>
                <Text>Pour les 2 options, il vous faut :</Text>
                <Grid pl={4}>
                  <Flex
                    align="center"
                    color={profile.projects_users.find(p => p.project.slug === "ft_transcendence").status == "finished" ? "green.400" : "gray.500"}
                    mb={2}
                  >
                    <Icon as={profile.projects_users.find(p => p.project.slug === "ft_transcendence")?.status == "finished" ? MdCheck : MdClear} mr={2} />
                    <Text>Completer le <strong>tronc commun</strong>.</Text>
                  </Flex>
                  <Flex
                    align="center"
                    color={getGroupProject() > 2 ? "green.400" : "gray.500"}
                    mb={2}
                  >
                    <Icon as={getGroupProject() > 2 ? MdCheck : MdClear} mr={2} />
                    <Text>Avoir validé <strong>deux projets de groupe après le tronc commun</strong>. (You have {getGroupProject()}/2)</Text>
                  </Flex>
                  <Flex
                    align="center"
                    color={profile.cursus_users[profile.cursus_users.length - 1].level > 21 ? "green.400" : "gray.500"}
                    mb={2}
                  >
                    <Icon as={profile.cursus_users[profile.cursus_users.length - 1].level > 21 ? MdCheck : MdClear} mr={2} />
                    <Text>Atteindre le level <strong>21</strong>. (You are level {profile.cursus_users[profile.cursus_users.length - 1].level})</Text>
                  </Flex>
                  <Flex
                    align="center"
                    color={filteredEvents.length > 15 ? "green.400" : "gray.500"}
                    mb={2}
                  >
                    <Icon as={filteredEvents.length > 15 ? MdCheck : MdClear} mr={2} />
                    <Text>Avoir participé à au moins <strong>15 évènements pédagogiques</strong> depuis le début de votre cursus (hors event de type extern et association). (You have {filteredEvents.length}/15)</Text>
                  </Flex>
                  <Flex
                    align="center"
                    color={numberOfInternship() > 2 ? "green.400" : "gray.500"}
                    mb={2}
                  >
                    <Icon as={numberOfInternship() > 2 ? MdCheck : MdClear} mr={2} />
                    <Text>Avoir au moins <strong>2 expériences professionnelles à temps plein</strong> dans votre cursus. (You have {numberOfInternship()}/2)</Text>
                  </Flex>
                </Grid>
                <Text>Valider <strong>un</strong> des projets de la catégorie <strong>""Suite""</strong> :</Text>
                <ProjectsCheck projects_users={profile.projects_users} projects={projectData.suiteProjects} />

                <Text m={4}><strong>Option 1:</strong> Système d'information et réseaux</Text>

                <ProjectBox 
                  title="Unix/Kernel - minimum 30000XP et minimum 2 projets."
                  optionProject={projectData.option1ProjectsUnix}
                  projects_users={profile.projects_users}
                  xpThreshold={30000}
                />

                <ProjectBox 
                  title="System administration - minimum 50000XP et 3 projets."
                  optionProject={projectData.option1ProjectsSys}
                  projects_users={profile.projects_users}
                  xpThreshold={50000}
                />

                <ProjectBox 
                  title="Security - minimum 50000XP et 3 projets."
                  optionProject={projectData.option1ProjectsSec}
                  projects_users={profile.projects_users}
                  xpThreshold={50000}
                />

                <Text m={4}><strong>Option 2:</strong> Architecture des bases de données et data</Text>
                
                <ProjectBox 
                  title="Web - Database - minimum 50000XP et minimum 2 projets."
                  optionProject={projectData.option2ProjectsWeb}
                  projects_users={profile.projects_users}
                  xpThreshold={50000}
                />

                <ProjectBox 
                  title="Artificial Intelligence - minimum 70000XP et minimum 3 projets."
                  optionProject={projectData.option2ProjectsAI}
                  projects_users={profile.projects_users}
                  xpThreshold={70000}
                />

              </List>
            </TabPanel>
            <TabPanel>
              {/* TODO: RNCP 6 */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Stack spacing={4} mt={4}>
        <Button onClick={() => setIsOpen(!isOpen)} boxShadow="lg" colorScheme='teal'>
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
