import React from 'react';
import { Box, Progress, Text } from '@chakra-ui/react';

const ProgressBar = ({ level }) => {
  const percentage = (level % 1) * 100;

  return (
    <Box width="100%" maxWidth="400px" mx="auto" mt="20px">
      <Text fontSize="lg" mb="4">
        Level: {level.toFixed(2)}
      </Text>
      <Progress value={percentage} colorScheme="teal" size="lg" borderRadius="md" />
      <Text fontSize="sm" mt="2">
        {percentage.toFixed(0)}%
      </Text>
    </Box>
  );
};

export default ProgressBar;
