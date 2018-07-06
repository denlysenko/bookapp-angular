export interface BookFilter {
  searchQuery: string;
  sortValue: '' | 'views_desc' | 'createdAt_desc';
}

export interface BookFilterInput {
  field?: string;
  search?: string;
}
