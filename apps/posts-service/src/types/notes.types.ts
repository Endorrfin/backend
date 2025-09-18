export interface NotesPageDto {
  title: string;
  slug: string;
  content?: string;
  template?: string;
  customCss?: string;
  customJs?: string;
  isPublished?: boolean;
  metadata?: Record<string, any>;
}

export interface UpdateNotesPageDto extends Partial<NotesPageDto> {
  id?: never;
  userId?: never;
}

export interface NotesPageResponse {
  id: string;
  userId: string;
  title: string;
  slug: string;
  content?: string;
  template?: string;
  customCss?: string;
  customJs?: string;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
