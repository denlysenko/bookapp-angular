export interface BookFilter {
  searchQuery: string;
  sortValue: 'id_desc' | 'views_desc' | 'createdAt_desc';
}

export interface BookFilterInput {
  field?: string;
  search?: string;
}
