import { VStack } from '@chakra-ui/react';
import ContentList from '../components/ContentList';
import QueryErrorBoundary from '../components/QueryErrorBoundary';
import { Suspense } from 'react';
import SkeletonContentList from '../components/SkeletonContentList';
import Fallback from '../components/Fallback';

const ContentListPage = () => {
  return (
    <VStack>
      <QueryErrorBoundary FallbackComponent={Fallback}>
        <Suspense fallback={<SkeletonContentList />}>
          <ContentList />
        </Suspense>
      </QueryErrorBoundary>
    </VStack>
  );
};

export default ContentListPage;
