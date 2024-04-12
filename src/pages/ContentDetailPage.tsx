import { useEffect, useState } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getContentDetail, postContentLikeUp } from '../apis/apis';
import { useQuery } from '@tanstack/react-query';

function ContentDetailPage() {
  const { contentId } = useParams<{ contentId: string }>();

  const { isError, data: contentDetail } = useQuery({
    queryKey: ['content', contentId],
    queryFn: () => getContentDetail(contentId || ''),
  });
  const [likes, setLikes] = useState<number>(0);

  const handleLikeUp = async () => {
    try {
      setLikes((pre) => pre + 1);
      await postContentLikeUp(contentId || '');
    } catch (error) {
      setLikes((pre) => pre - 1);
    }
  };

  useEffect(() => {
    contentDetail && setLikes(contentDetail.likes);
  }, [contentDetail]);

  if (isError) {
    return (
      <Box>
        <Text>Error</Text>
      </Box>
    );
  }

  return (
    <Flex h={'100%'} flexDirection={'column'}>
      <Box>
        <Text fontSize={32}>{contentDetail?.title}</Text>
      </Box>
      <Box flex={1}>
        <Text>{contentDetail?.content}</Text>
      </Box>
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
        <Text fontSize={24}>{likes}</Text>
      </Flex>
    </Flex>
  );
}

export default ContentDetailPage;
