import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postContentLikeUp } from '../apis/apis';
import { ContentDetail } from '../types';

function useLikeUp(contentId: string) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postContentLikeUp,
    onMutate: async (variables) => {
      const contentId = variables as string;

      // Optimistic update
      const previousContentDetail = queryClient.getQueryData<ContentDetail>([
        'contentDetail',
        contentId,
      ]);

      if (!previousContentDetail) return;
      // 캐싱되어 있는 값 업데이트
      queryClient.setQueryData(['contentDetail', contentId], () => ({
        ...previousContentDetail,
        likes: previousContentDetail?.likes + 1,
      }));

      return { previousContentDetail };
    },
    onSuccess: () => {
      // 성공 시, 쿼리키 ['contentList']에 해당하는 쿼리를 다시 불러옴
      // queryClient.invalidateQueries({ queryKey: ['contentList'] });
      queryClient.setQueryData(['contentList'], (data) => {
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

        console.log(data);

        return {
          pages: changedPages,
          pageParams: data?.pageParams,
        };
      });
    },
    onError(_, __, context) {
      // Rollback
      const { previousContentDetail } = context as {
        previousContentDetail: ContentDetail;
      };

      queryClient.setQueryData(['contentDetail', contentId], () => ({
        ...previousContentDetail,
      }));
    },
  });

  return { mutate, isPending };
}

export default useLikeUp;
