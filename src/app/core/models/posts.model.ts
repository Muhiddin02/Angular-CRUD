export interface Post {
  id?: number;
  firstName: string;
  lastName: string;
  university: string;
  language: string;
  company: string;
  avatar: string;
}

export interface PostQueryParams{
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: string;
  firstName?: string,
  company?: string,
}
