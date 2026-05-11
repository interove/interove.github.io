export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

export interface Post extends PostMeta {
  content: string;
}

