import {
  Box,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useContentList from '../hooks/useContentList';

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
    <Flex h={'100%'} direction={'column'}>
      <List flex={1}>
        {contentList?.map((content) => (
          <ListItem
            key={content?.id}
            background={'white'}
            padding={3}
            onClick={() => handleMoveToDetail(content?.id)}
            _hover={{ cursor: 'pointer', background: 'gray.50' }}
          >
            <Text fontWeight={600} fontSize={'large'}>
              {content?.title}
            </Text>
            <Flex alignItems={'center'}>
              <ListIcon as={FaHeart} color="black" />
              <Text>{content?.likes}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
      {hasNext && !isLoading && <Divider marginY={4} ref={observerRef} />}
    </Flex>
  );
}

export default ContentListPage;
