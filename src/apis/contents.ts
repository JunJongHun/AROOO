import axios from 'axios';
import { BASE_API_URL } from './config';

export const getContentList = async (params: {
  skip?: number;
  limit?: number;
}) => {
  try {
    const url = `${BASE_API_URL}/library/content`;
    const response = await axios.get<Content[]>(url, { params });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getContentDetail = async (contentId: string = '') => {
  if (!contentId) {
    return Promise.reject(new Error('contentId is required'));
  }

  try {
    const url = `${BASE_API_URL}/library/content/${contentId}`;
    const response = await axios.get<ContentDetail>(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postContentLikeUp = async (contentId: string = '') => {
  if (!contentId) {
    return Promise.reject(new Error('contentId is required'));
  }

  try {
    const url = `${BASE_API_URL}/library/content/${contentId}/like`;
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export type Content = {
  id: string;
  title: string;
  likes: number;
};

export type ContentDetail = Content & {
  content: string;
};
