import { http, HttpResponse } from 'msw';
import { BASE_API_URL } from '../apis/constants';
import { list } from './data';

export const handlers = [
  // content list API
  http.get(`${BASE_API_URL}/library/content`, ({ request }) => {
    const { searchParams } = new URL(request.url);
    const skip = Number(searchParams.get('skip')) || 0;
    const limit = Number(searchParams.get('limit')) || 10;
    const filteredList = list.slice(skip, skip + limit);

    return HttpResponse.json(filteredList);
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

    //2초뒤 에러 반환
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Internal Server Error'));
      }, 2000);
    });

    // content.likes += 1;
    // return HttpResponse.json({ likes: content.likes });
  }),
];
