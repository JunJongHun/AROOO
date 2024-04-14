import { Box, Flex, Image, Text } from '@chakra-ui/react';
import aroooPng from '../assets/arooo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleMoveToHome = () => {
    navigate('/');
  };

  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Image
        boxSize={70}
        objectFit="cover"
        src={aroooPng}
        alt="arooo icon"
        onClick={handleMoveToHome}
      />
      <Text fontSize="xxx-large" color="black" fontWeight={400}>
        AROOO
      </Text>
      <Box w={70} h={70} />
    </Flex>
  );
};

export default Header;
