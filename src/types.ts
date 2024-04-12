// API types

export type Content = {
  id: string;
  title: string;
  likes: number;
};

export type ContentDetail = Content & {
  content: string;
};
