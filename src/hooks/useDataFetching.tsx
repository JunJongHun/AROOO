import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

type ReturnType<T> = {
  isLoading: boolean;
  res: T | null;
  isError: AxiosError | null;
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | string;

const useDataFetching = <T,>(
  url: string,
  data: Record<string, unknown> = {},
  method: HttpMethod = 'GET'
): ReturnType<T> => {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState<T | null>(null);
  const [isError, setIsError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config: AxiosRequestConfig = {
          method: method,
          url: url,
          data: data,
        };

        const response: AxiosResponse<T> = await axios(config);
        setRes(response.data);
      } catch (error) {
        setIsError(error as AxiosError);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url, method]); // TODO: data가 변경될 때도 요청을 해야할 경우가 있을 수 있음(리펙토링 필요)

  return { isLoading, res, isError };
};

export default useDataFetching;
