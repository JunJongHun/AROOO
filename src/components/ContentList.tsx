import { List } from '@chakra-ui/react';
import { Content } from '../types';
import ContentItem from './ContentItem';

type ContentListProps = {
  contentList: Content[];
  handleMoveToDetail: (id: string) => void;
};

function ContentList({ contentList, handleMoveToDetail }: ContentListProps) {
  return (
    <List w={'100%'}>
      {contentList?.map((content) => (
        <ContentItem
          key={content.id}
          content={content}
          handleMoveToDetail={handleMoveToDetail}
        />
      ))}
    </List>
  );
}

export default ContentList;
