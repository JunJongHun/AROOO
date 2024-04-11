import { Divider, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function RootLayout() {
  return (
    <Flex
      maxW={440}
      minW={375}
      h={'100vh'}
      marginX={'auto'}
      flexDirection={'column'}
    >
      <Header />
      <Divider marginY={4} />
      <Outlet />
    </Flex>
  );
}

export default RootLayout;
