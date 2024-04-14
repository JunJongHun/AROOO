import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getContentDetail } from '../apis/contents';
import { useQuery } from '@tanstack/react-query';
import useLikeUp from '../hooks/useLikeUp';
import { QueryKeys } from '../queryClient';

const ContentDetailPage = () => {
  const { contentId } = useParams<{ contentId: string }>();

  const { data: contentDetail } = useQuery({
    queryKey: [QueryKeys.CONTENTS, QueryKeys.DETAIL, contentId],
    queryFn: () => getContentDetail(contentId),
  });

  const { mutate, isPending } = useLikeUp(contentId);

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
          onClick={() => !isPending && mutate(contentId)}
          _hover={{ cursor: 'pointer' }}
          aria-disabled={isPending}
        />
        <Text fontSize={24}>{contentDetail?.likes}</Text>
      </Flex>
    </Flex>
  );
};

export default ContentDetailPage;
