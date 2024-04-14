import { Flex, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from '../apis/contents';

type ContentItemProps = {
  content: Content;
};

const ContentItem = memo(({ content }: ContentItemProps) => {
  const navigate = useNavigate();

  const handleMoveToDetail = (id: string) => {
    navigate(`/content/${id}`);
  };

  return (
    <ListItem
      padding={3}
      onClick={() => handleMoveToDetail(content?.id)}
      _hover={{ cursor: 'pointer', background: 'gray.100' }}
    >
      <Text fontWeight={600} fontSize={'large'}>
        {content?.title}
      </Text>
      <Flex alignItems={'center'}>
        <ListIcon as={FaHeart} color="black" />
        <Text>{content?.likes}</Text>
      </Flex>
    </ListItem>
  );
});

export default ContentItem;
