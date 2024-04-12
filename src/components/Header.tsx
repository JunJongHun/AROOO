import { Box, Flex, Image, Text } from '@chakra-ui/react';
import aroooPng from '../assets/arooo.png';

function Header() {
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Image boxSize={70} objectFit="cover" src={aroooPng} alt="arooo photo" />
      <Text fontSize="xxx-large" color="black" fontWeight={400}>
        AROOO
      </Text>
      <Box w={70} h={70} />
    </Flex>
  );
}

export default Header;
