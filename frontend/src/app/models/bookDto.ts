export interface BookDto {
  id: number;
  title: string;
  description: string;
  publicationDate: string;
  pagesCount: number;
}

export interface NewBook {
  title: string;
  description: string;
  publicationDate: string;
  pagesCount: number;
}
