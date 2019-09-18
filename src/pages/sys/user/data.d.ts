export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserParams {
  page: number;
  size: number;
}

export interface UserListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: User[];
  pagination: Partial<UserListPagination>;
}
