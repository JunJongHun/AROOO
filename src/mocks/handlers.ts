import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`url/test`, () => {
    return HttpResponse.json('hello world');
  }),
];
