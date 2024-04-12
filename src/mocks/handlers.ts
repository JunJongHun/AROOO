import { http, HttpResponse } from 'msw';
import { BASE_API_URL } from '../apis/constants';
import { list } from './data';

export const handlers = [
  // content list API
  http.get(`${BASE_API_URL}/library/content`, () => {
    return HttpResponse.json(list);
  }),

  // content detail API
  http.get(`${BASE_API_URL}/library/content/:contentId`, ({ params }) => {
    const { contentId } = params;
    const content = list.find((item) => item.id === contentId);

    if (!content) {
      return HttpResponse.error();
    }

    return HttpResponse.json(content);
  }),

  // content like up API
  http.post(`${BASE_API_URL}/library/content/:contentId/like`, ({ params }) => {
    const { contentId } = params;
    const content = list.find((item) => item.id === contentId);

    if (!content) {
      return HttpResponse.error();
    }

    content.likes += 1;
    return HttpResponse.json({ likes: content.likes });
  }),
];
