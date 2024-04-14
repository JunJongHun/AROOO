import { Divider, List } from '@chakra-ui/react';
import { getContentList } from '../apis/contents';
import ContentItem from './ContentItem';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '../queryClient';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const SKIP = 0;
const LIMIT = 10;

const ContentList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: [QueryKeys.CONTENTS],
      queryFn: ({ pageParam }) =>
        getContentList({ skip: pageParam, limit: LIMIT }),
      initialPageParam: SKIP,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.length < LIMIT ? undefined : lastPageParam + LIMIT;
      },
    });

  const observerRef = useInfiniteScroll(fetchNextPage, {
    rootMargin: '200px', // 미리 로딩할 거리
    threshold: 0, // 보이는 순간 로딩
  });

  return (
    <>
      <List w={'100%'}>
        {data?.pages.flat().map((content) => (
          <ContentItem key={content.id} content={content} />
        ))}
      </List>
      {hasNextPage && !isFetching && <Divider marginY={4} ref={observerRef} />}
    </>
  );
};

export default ContentList;
