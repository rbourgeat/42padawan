import React from 'react';
import { Box, Progress, Text, Icon, Flex } from '@chakra-ui/react';
import { MdOutlineRocketLaunch } from "react-icons/md";

const ProgressBar = ({ level }) => {
  const percentage = (level % 1) * 100;

  return (
    <Box width="100%" maxWidth="400px" mx="auto">
      <Progress value={percentage} colorScheme="teal" size="lg" borderRadius="md" mt={2} />
      <Flex align="center" mt={2}>
        <Icon as={MdOutlineRocketLaunch} mr={2} />
        <Text fontSize="md"><strong>Level: </strong>{level.toFixed(2)} ({percentage.toFixed(0)}%)</Text>
      </Flex>
    </Box>
  );
};

export default ProgressBar;
