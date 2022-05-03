import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ProfileProps {
  showProfileData?: boolean
}


export function Profile ({ showProfileData = true }: ProfileProps) {

  const [user, setUser] = useState(null);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('@comandasgo'))
    setUser(user);
  },[])

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user?.user_metadata?.first_name}</Text>
          <Text color="gray.300" fontSize="small">{user?.email}</Text>
        </Box>
      )}

      <Avatar size="md" name={user?.user_metadata?.first_name} />
    </Flex>
  )
}