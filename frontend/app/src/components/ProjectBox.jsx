import React from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/react';
import { 
  MdCheck,
  MdClear,
  MdOutlineHourglassTop
} from 'react-icons/md';

import ProjectsCheck from './ProjectsCheck';

const ProjectBox = ({ title, projects_users, optionProject, xpThreshold }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isXpSufficient = isXpGreaterThanX(optionProject, xpThreshold);

  function isXpGreaterThanX(projects, x) {
    let totalXp = 0;
    let i = 0;
    
    while (i < projects.length) {
      const match = projects_users.find(p => p.project.slug === projects[i].slug);
      
      if (match) {
        totalXp += projects[i].xp;
      }
      
      i++;
    }

    return totalXp > x;
  }

  return (
    <Box 
        border="2px" 
        borderColor={isXpSufficient ? 'green.400' : 'gray.500'} 
        position="relative"
        boxShadow="lg"
        borderRadius="md"
        m={4}
        p={4}
      >
        <Text 
          fontStyle="italic" 
          color={isXpSufficient ? 'green.400' : 'gray.500'} 
          fontSize="sm"
          position="absolute"
          top="-10px"
          left="15px"
          background={colorMode === "light" ? "#ffffff" : "#1a202c"}
          px={2}
        >
          {title}
        </Text>
        <ProjectsCheck 
          projects_users={projects_users}
          projects={optionProject}
        />
      </Box>
  );
};

export default ProjectBox;
