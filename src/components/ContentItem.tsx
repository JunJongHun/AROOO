import { Flex, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { Content } from '../types';
import { FaHeart } from 'react-icons/fa';

type ContentItemProps = {
  content: Content;
  handleMoveToDetail: (id: string) => void;
};

function ContentItem({ content, handleMoveToDetail }: ContentItemProps) {
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
}

export default ContentItem;
