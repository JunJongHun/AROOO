import { http, HttpResponse } from 'msw';
import { BASE_API_URL } from '../apis/constants';
import { list } from './data';

export const handlers = [
  // content list API
  http.get(`${BASE_API_URL}/library/content`, ({ request }) => {
    const { searchParams } = new URL(request.url);
    const skip = Number(searchParams.get('skip'));
    const limit = Number(searchParams.get('limit'));

    // 2초뒤 에러 반환
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Internal Server Error'));
      }, 2000);
    });

    if (skip === undefined && limit === undefined) {
      return HttpResponse.json(list);
    } else if (skip && limit === undefined) {
      return HttpResponse.json(list.slice(skip));
    } else if (skip === undefined && limit) {
      return HttpResponse.json(list.slice(0, limit));
    } else return HttpResponse.json(list.slice(skip, skip + limit));
  }),

  // content detail API
  http.get(`${BASE_API_URL}/library/content/:contentId`, ({ params }) => {
    const { contentId } = params;
    const content = list.find((item) => item.id === contentId);

    //2초뒤 에러 반환
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Internal Server Error'));
      }, 2000);
    });

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
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     reject(new Error('Internal Server Error'));
    //   }, 2000);
    // });

    content.likes += 1;
    return HttpResponse.json({ likes: content.likes });
  }),
];
