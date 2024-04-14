import {
  Flex,
  List,
  ListItem,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const SKELETON_COUNT = 10;
const SKELETON_LIST = Array.from({ length: SKELETON_COUNT });

const SkeletonContentList = () => {
  const [isDeffered, setIsDeffered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeffered(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!isDeffered) return null;

  return (
    <List w={'100%'}>
      {SKELETON_LIST.map((_, index) => (
        <ListItem key={index} padding={2}>
          <Skeleton h={8} />
          <Flex gap={2} marginTop={2}>
            <SkeletonCircle h={5} w={5} />
            <Skeleton w={8} />
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};

export default SkeletonContentList;
