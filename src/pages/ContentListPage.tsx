import { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getContentList } from '../apis/apis';
import { Content } from '../types';

function ContentListPage() {
  const navigate = useNavigate();

  const [contentList, setContentList] = useState<Array<Content>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMoveToDetail = (id: string) => {
    navigate(`/content/${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    getContentList({ skip: 0, limit: 10 })
      .then((data) => {
        setContentList(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
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
      <Divider marginY={4} />
    </Flex>
  );
}

export default ContentListPage;
