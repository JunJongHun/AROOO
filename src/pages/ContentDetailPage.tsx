import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getContentDetail } from '../apis/contents';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryClient';
import useOptimisticLikeUpdate from '../hooks/useOptimisticLikeUpdate';

const ContentDetailPage = () => {
  const { contentId } = useParams<{ contentId: string }>();

  const { data: contentDetail } = useQuery({
    queryKey: [QueryKeys.CONTENTS, QueryKeys.DETAIL, contentId],
    queryFn: () => getContentDetail(contentId),
  });

  const { optimisticLikeUpdate, isPending } =
    useOptimisticLikeUpdate(contentId);

  return (
    <Flex h={'100%'} flexDirection={'column'}>
      <Box>
        <Text fontSize={32}>{contentDetail?.title}</Text>
      </Box>
      <Box flex={1}>
        <Text whiteSpace="pre-wrap">{contentDetail?.content}</Text>
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
          onClick={() => !isPending && optimisticLikeUpdate(contentId)}
          _hover={{ cursor: 'pointer' }}
          aria-disabled={isPending}
        />
        <Text fontSize={24}>{contentDetail?.likes}</Text>
      </Flex>
    </Flex>
  );
};

export default ContentDetailPage;
