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
import { Content } from '../types';
import useDataFetching from '../hooks/useDataFetching';
import { BASE_API_URL } from '../apis/constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';

function ContentListPage() {
  const ref = useRef(null);
  const navigate = useNavigate();
  // const {
  //   isLoading,
  //   isError,
  //   res: contentList,
  // } = useDataFetching<Content[]>(`${BASE_API_URL}/library/content`);
  const [isLoading, setIsLoading] = useState(false);
  const [contentList, setContentList] = useState<Content[]>([]);
  const [isError, setIsError] = useState<AxiosError | null>(null);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);

  const fetchContentList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Content[]>(
        `${BASE_API_URL}/library/content?skip=${skip}&limit=${limit}`
      );

      if (response.data.length === 0) {
        console.log('no more data');
        ref.current = null;
        return;
      }

      setContentList((pre) => [...pre, ...response.data]);
      setSkip(skip + limit);
    } catch (error) {
      setIsError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  }, [skip, contentList]);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading) {
          fetchContentList();
        }
      });
    },
    [fetchContentList, isLoading]
  );

  const handleMoveToDetail = (id: string) => {
    navigate(`/content/${id}`);
  };

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback]);

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
      <Divider marginY={4} ref={ref} />
    </Flex>
  );
}

export default ContentListPage;
