import {
  Flex,
  List,
  ListItem,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';

function SkeletonContentList() {
  return (
    <List>
      {Array.from({ length: 10 }).map((_, index) => (
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
}

export default SkeletonContentList;
