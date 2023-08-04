export type TDocumentType = 'public' | 'private';

export interface IDocument {
  id: string;
  name: string;
  type: TDocumentType
}
