import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { postContentLikeUp, Content, ContentDetail } from '../apis/contents';
import { QueryKeys } from '../queryClient';

const useOptimisticLikeUpdate = (contentId: string = '') => {
  if (!contentId) {
    throw new Error('contentId is required');
  }

  const queryClient = useQueryClient();

  const { mutate: optimisticLikeUpdate, isPending } = useMutation({
    mutationFn: postContentLikeUp,
    onMutate: async (variables) => {
      const contentId = variables as string;

      // Optimistic update
      const previousContentDetail = queryClient.getQueryData<ContentDetail>([
        QueryKeys.CONTENTS,
        QueryKeys.DETAIL,
        contentId,
      ]);

      if (!previousContentDetail) return;
      // 캐싱되어 있는 값 업데이트
      queryClient.setQueryData(
        [QueryKeys.CONTENTS, QueryKeys.DETAIL, contentId],
        () => ({
          ...previousContentDetail,
          likes: previousContentDetail?.likes + 1,
        })
      );

      return { previousContentDetail };
    },
    onSuccess: () => {
      // 성공 시, 쿼리키 ['contentList']에 해당하는 쿼리를 다시 불러옴 (콘텐츠 목록 좋아요 동기화 하기 위함)
      queryClient.setQueryData<InfiniteData<Content[], unknown>>(
        [QueryKeys.CONTENTS],
        (data) => {
          const pages = data?.pages || [];
          const changedPages = pages.map((page) => {
            return page.map((content) => {
              if (content.id === contentId) {
                return {
                  ...content,
                  likes: content.likes + 1,
                };
              }
              return content;
            });
          });

          return {
            pages: changedPages,
            pageParams: data?.pageParams || [],
          };
        }
      );
    },
    onError(_, __, context) {
      // Rollback
      const { previousContentDetail } = context as {
        previousContentDetail: ContentDetail;
      };

      queryClient.setQueryData(
        [QueryKeys.CONTENTS, QueryKeys.DETAIL, contentId],
        () => ({
          ...previousContentDetail,
        })
      );
    },
  });

  return { optimisticLikeUpdate, isPending };
};

export default useOptimisticLikeUpdate;
