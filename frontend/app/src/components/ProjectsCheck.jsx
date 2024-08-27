import React from 'react';
import { Icon, Flex, Link, Grid, GridItem } from '@chakra-ui/react';
import { 
  MdCheck,
  MdClear,
  MdOutlineHourglassTop
} from 'react-icons/md';

const ProjectsCheck = ({ projects_users, projects }) => {
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunkedProjects = chunkArray(projects, Math.ceil(projects.length / 2));

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={2} pl={4}>
      {chunkedProjects.map((chunk, chunkIndex) => (
        <GridItem key={chunkIndex}>
          <Grid templateRows={`repeat(${Math.ceil(chunk.length / 2)}, 1fr)`}>
            {chunk.map((project, index) => {
              const projectUser = projects_users.find(p => p.project.slug === project.slug);
              let color = 'gray.500';
              let icon = MdClear;

              if (projectUser) {
                if (projectUser.status === 'finished') {
                  color = 'green.400';
                  icon = MdCheck;
                } else if (projectUser.status === 'searching_a_group') {
                  color = 'gray.500';
                  icon = MdOutlineHourglassTop;
                }
              }

              return (
                <GridItem key={project.name} rowSpan={1}>
                  <Link href={`https://projects.intra.42.fr/projects/${project.slug}`} isExternal>
                    <Flex align="center" color={color} mb={2}>
                      <Icon as={icon} mr={2} />
                      {project.name}
                    </Flex>
                  </Link>
                </GridItem>
              );
            })}
          </Grid>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ProjectsCheck;
