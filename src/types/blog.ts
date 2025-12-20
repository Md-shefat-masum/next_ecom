export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  category?: BlogCategory;
  tags?: BlogTag[];
  author?: BlogAuthor;
  views_count?: number;
  comments_count?: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  posts_count?: number;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  posts_count?: number;
}

export interface BlogAuthor {
  id: number;
  name: string;
  slug?: string;
  bio?: string;
  image?: string;
  posts_count?: number;
}

export interface BlogArchive {
  year: number;
  month: number;
  month_name: string;
  posts_count: number;
}

export interface BlogComment {
  id: number;
  post_id: number;
  user_id?: number;
  name: string;
  email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

