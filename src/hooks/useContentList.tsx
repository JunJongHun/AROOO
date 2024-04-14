// hooks/useContentList.js
import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Content } from '../apis/contents';
import { getContentList } from '../apis/contents';

const useContentList = (limit = 10) => {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<AxiosError | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchContentList = useCallback(async () => {
    if (!hasNext) return;

    setIsLoading(true);
    try {
      const response = await getContentList({ skip, limit });
      const newContent = response;

      if (newContent.length < limit) {
        setHasNext(false);
      }

      setContentList((prev) => [...prev, ...newContent]);
      setSkip((prev) => prev + limit);
    } catch (error) {
      setIsError(error as AxiosError);
    } finally {
      setIsLoading(false);
    }
  }, [skip, limit, hasNext]);

  return { contentList, isLoading, isError, fetchContentList, hasNext };
};

export default useContentList;
