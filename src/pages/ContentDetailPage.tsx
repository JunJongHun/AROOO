import { useEffect, useState } from 'react';
import { Box, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getContentDetail, postContentLikeUp } from '../apis/apis';

function ContentDetailPage() {
  const { contentId } = useParams<{ contentId: string }>();

  const [contentDetail, setContentDetail] = useState<{
    id: string;
    title: string;
    likes: number;
    content: string;
  }>({
    id: '',
    title: '',
    likes: 0,
    content: '',
  });

  const handleLikeUp = () => {
    setContentDetail((prev) => ({
      ...prev,
      likes: prev.likes + 1,
    }));

    postContentLikeUp(contentId || '').then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    getContentDetail(contentId || '').then((data) => {
      setContentDetail(data);
    });
  }, [contentId]);

  return (
    <Flex h={'100%'} flexDirection={'column'}>
      <Box>
        <Text fontSize={32}>{contentDetail.title}</Text>
      </Box>
      <Box flex={1}>
        <Text
          dangerouslySetInnerHTML={{ __html: contentDetail?.content || '' }}
        ></Text>
      </Box>
      <Divider marginY={4} />
      <Flex
        position={'sticky'}
        bottom={0}
        bg={'white'}
        gap={1}
        padding={4}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Icon
          w={6}
          h={6}
          as={FiHeart}
          onClick={handleLikeUp}
          _hover={{ cursor: 'pointer' }}
        />
        <Text fontSize={24}>{contentDetail?.likes}</Text>
      </Flex>
    </Flex>
  );
}

export default ContentDetailPage;
