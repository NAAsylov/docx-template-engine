import {TDocumentType} from "../IDocument";

export interface IUploadDocument {
  id: string;
  name: string;
  type: TDocumentType;
  file: {
    type: string;
    data: Uint8Array;
  };
  pdf: {
    type: string;
    data: Uint8Array;
  }
}
