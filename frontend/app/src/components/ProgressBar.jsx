import React, { useEffect, useState } from 'react';
import { Box, Progress, Text, Icon, Flex } from '@chakra-ui/react';
import { MdOutlineRocketLaunch } from "react-icons/md";

const ProgressBar = ({ level }) => {
  const percentage = (level % 1) * 100;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < percentage) {
        setProgress(progress + 1);
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [progress, percentage]);

  return (
    <Box width="100%" maxWidth="400px" mx="auto">
      <Progress 
        value={progress}
        size="lg"
        borderRadius="md"
        mt={2}
        sx={{
          '& > div': {
            bgGradient: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
            boxShadow: 'lg',
          }
        }}
      />
      <Flex align="center" mt={2}>
        <Icon as={MdOutlineRocketLaunch} mr={2} />
        <Text fontSize="md"><strong>Level: </strong>{level.toFixed(2)}</Text>
      </Flex>
    </Box>
  );
};

export default ProgressBar;
