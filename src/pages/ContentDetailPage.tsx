import { useEffect, useState } from 'react';
import { Box, Divider, Flex, Icon, Spinner, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import useDataFetching from '../hooks/useDataFetching';
import { ContentDetail } from '../types';
import { BASE_API_URL } from '../apis/constants';
import { postContentLikeUp } from '../apis/apis';

function ContentDetailPage() {
  const { contentId } = useParams<{ contentId: string }>();

  const {
    isLoading,
    isError,
    res: contentDetail,
  } = useDataFetching<ContentDetail>(
    `${BASE_API_URL}/library/content/${contentId}`
  );
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

  if (isLoading) {
    return (
      <Flex h={'100%'} justify={'center'} align={'center'}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex h={'100%'} flexDirection={'column'}>
      <Box>
        <Text fontSize={32}>{contentDetail?.title}</Text>
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
        <Text fontSize={24}>{likes}</Text>
      </Flex>
    </Flex>
  );
}

export default ContentDetailPage;
