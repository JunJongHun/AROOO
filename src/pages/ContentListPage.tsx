import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import ContentList from '../components/ContentList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getContentList } from '../apis/apis';
import { useCallback } from 'react';

function ContentListPage() {
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
      queryKey: ['contentList'],
      queryFn: ({ pageParam }) => getContentList({ skip: pageParam, limit: 8 }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.length < 8 ? undefined : lastPageParam + 8;
      },
    });

  const observerRef = useInfiniteScroll(fetchNextPage, {
    rootMargin: '200px',
  });

  const handleMoveToDetail = useCallback(
    (id: string) => {
      navigate(`/content/${id}`);
    },
    [navigate]
  );

  // const handleMoveToDetail = (id: string) => {
  //   navigate(`/content/${id}`);
  // };

  if (isError) {
    return (
      <Box>
        <Text>Error</Text>
      </Box>
    );
  }

  return (
    <VStack>
      <ContentList
        contentList={data?.pages.flat() || []}
        handleMoveToDetail={handleMoveToDetail}
      />
      {hasNextPage && !isFetching && <Divider marginY={4} ref={observerRef} />}
    </VStack>
  );
}

export default ContentListPage;
