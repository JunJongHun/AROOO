import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24시간
      staleTime: 1000 * 60, // 1분
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const KEYS = ['CONTENTS', 'DETAIL'] as const;

type QueryKeys = (typeof KEYS)[number];

type QueryKeyObj = {
  [K in QueryKeys]: K;
};

export const QueryKeys: QueryKeyObj = {
  CONTENTS: 'CONTENTS',
  DETAIL: 'DETAIL',
};
