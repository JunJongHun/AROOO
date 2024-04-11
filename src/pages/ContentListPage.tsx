import { useState } from 'react';
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

function ContentListPage() {
  const navigate = useNavigate();

  const [contentList, setContentList] = useState([
    { id: 2, title: 'another title', likes: 5 },
    { id: 3, title: 'more titles', likes: 10 },
    { id: 4, title: 'even more titles', likes: 2 },
    { id: 5, title: 'more titles', likes: 8 },
    { id: 6, title: 'even more titles', likes: 3 },
    { id: 7, title: 'additional titles', likes: 6 },
    { id: 8, title: 'extra titles', likes: 1 },
    { id: 9, title: 'bonus titles', likes: 4 },
    { id: 10, title: 'special titles', likes: 7 },
    { id: 11, title: 'unique titles', likes: 2 },
    { id: 12, title: 'different titles', likes: 9 },
    { id: 13, title: 'more different titles', likes: 5 },
    { id: 14, title: 'even more different titles', likes: 0 },
  ]);

  const handleMoveToDetail = (id: number) => {
    navigate(`/content/${id}`);
  };

  return (
    <Box flex={1}>
      <List>
        {contentList?.map((content) => (
          <ListItem
            background={'white'}
            padding={3}
            onClick={() => handleMoveToDetail(1)}
            _hover={{ cursor: 'pointer', background: 'gray.50' }}
          >
            <Text fontWeight={600} fontSize={'large'}>
              {content.title}
            </Text>
            <Flex alignItems={'center'}>
              <ListIcon as={FaHeart} color="black" />
              <Text>{content.likes}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
      <Divider marginY={4} />
    </Box>
  );
}

export default ContentListPage;
