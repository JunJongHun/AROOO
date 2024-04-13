import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getContentDetail, postContentLikeUp } from '../apis/apis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ContentDetail } from '../types';

function ContentDetailPage() {
  const { contentId } = useParams<{ contentId: string }>();

  const { isError, data: contentDetail } = useQuery({
    queryKey: ['contentDetail', contentId],
    queryFn: () => getContentDetail(contentId || ''),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postContentLikeUp,
    onMutate: (variables) => {
      const contentId = variables as string;

      // Optimistic update
      const previousContentDetail = queryClient.getQueryData<ContentDetail>([
        'contentDetail',
        contentId,
      ]);

      if (!previousContentDetail) return;
      // 캐싱되어 있는 값 업데이트
      queryClient.setQueryData(['contentDetail', contentId], () => ({
        ...previousContentDetail,
        likes: previousContentDetail?.likes + 1,
      }));

      return { previousContentDetail };
    },
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries(['contentDetail', contentId]);
    },
    onError(_, __, context) {
      // Rollback
      const { previousContentDetail } = context as {
        previousContentDetail: ContentDetail;
      };

      queryClient.setQueryData(['contentDetail', contentId], () => ({
        ...previousContentDetail,
      }));
    },
  });

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
          onClick={() => !isPending && mutate(contentId || '')}
          _hover={{ cursor: 'pointer' }}
          aria-disabled={isPending}
        />
        <Text fontSize={24}>{contentDetail?.likes}</Text>
      </Flex>
    </Flex>
  );
}

export default ContentDetailPage;
