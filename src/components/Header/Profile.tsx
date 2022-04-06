import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Alex Paris</Text>
          <Text color="gray.300" fontSize="small">
            alex_paris28@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Alex Paris" />
    </Flex>
  );
}
