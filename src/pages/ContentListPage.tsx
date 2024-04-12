import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useContentList from '../hooks/useContentList';
import ContentList from '../components/ContentList';

function ContentListPage() {
  const navigate = useNavigate();
  const { contentList, isLoading, isError, fetchContentList, hasNext } =
    useContentList();

  const observerRef = useInfiniteScroll(fetchContentList, {
    rootMargin: '200px',
  });

  const handleMoveToDetail = (id: string) => {
    navigate(`/content/${id}`);
  };

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
        contentList={contentList}
        handleMoveToDetail={handleMoveToDetail}
      />
      {hasNext && !isLoading && <Divider marginY={4} ref={observerRef} />}
    </VStack>
  );
}

export default ContentListPage;
