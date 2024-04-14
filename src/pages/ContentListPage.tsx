import { Divider, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import ContentList from '../components/ContentList';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { getContentList } from '../apis/apis';
import { useCallback } from 'react';

function ContentListPage() {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
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

  return (
    <VStack>
      <ContentList contentList={data?.pages.flat() || []} />

      {hasNextPage && !isFetching && <Divider marginY={4} ref={observerRef} />}
    </VStack>
  );
}

export default ContentListPage;
