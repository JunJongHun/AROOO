// hooks/useContentList.js
import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { BASE_API_URL } from '../apis/constants';
import { Content } from '../types';

function useContentList(limit = 10) {
  const [contentList, setContentList] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<AxiosError | null>(null);
  const [skip, setSkip] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchContentList = useCallback(async () => {
    if (!hasNext) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_API_URL}/library/content?skip=${skip}&limit=${limit}`
      );
      const newContent = response.data;

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
}

export default useContentList;
