import { Box, Divider, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function RootLayout() {
  return (
    <VStack maxW={440} minW={375} h={'100vh'} marginX={'auto'}>
      <Box w={'100%'} padding={2}>
        <Header />
      </Box>
      <Divider />
      <Box w={'100%'} h={'100vh'} padding={2}>
        <Outlet />
      </Box>
    </VStack>
  );
}

export default RootLayout;
