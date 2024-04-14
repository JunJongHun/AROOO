import { List } from '@chakra-ui/react';
import { Content } from '../types';
import ContentItem from './ContentItem';

type ContentListProps = {
  contentList: Content[];
};

function ContentList({ contentList }: ContentListProps) {
  return (
    <List w={'100%'}>
      {contentList?.map((content) => (
        <ContentItem key={content.id} content={content} />
      ))}
    </List>
  );
}

export default ContentList;
