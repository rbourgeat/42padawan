import React from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/react';

import ProjectsCheck from './ProjectsCheck';

const ProjectBox = ({ title, projects_users, optionProject, xpThreshold }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const projectsXP = getTotalXP(optionProject);
  const isXpSufficient = projectsXP > xpThreshold;

  function getTotalXP(projects) {
    let totalXp = 0;
    let i = 0;
    
    while (i < projects.length) {
      const match = projects_users.find(p => p.project.slug === projects[i].slug);
      
      if (match) {
        totalXp += projects[i].xp * (match.final_mark / 100);
      }
      
      i++;
    }

    return totalXp;
  }

  return (
    <Box 
        border="2px" 
        borderColor={isXpSufficient ? 'green.400' : 'gray.500'} 
        position="relative"
        boxShadow="md"
        borderRadius="md"
        m={4}
        p={4}
      >
        <Text 
          background={colorMode === "light" ? "#ffffff" : "#1a202c"}
          color={isXpSufficient ? 'green.400' : 'gray.500'}
          position="absolute"
          fontStyle="italic" 
          fontSize="sm"
          top="-10px"
          left="15px"
          px={2}
        >
          {title} (You have {projectsXP}XP)
        </Text>
        <ProjectsCheck 
          projects_users={projects_users}
          projects={optionProject}
        />
      </Box>
  );
};

export default ProjectBox;
