export type TDocumentType = 'public' | 'private';

export interface IDocument {
  id: string;
  name: string;
  type: TDocumentType,
  file: {
    type: string;
    data: Uint8Array;
  };
  pdf: {
    type: string;
    data: Uint8Array;
  }
}
