import $api from "../http";
import { AxiosResponse } from 'axios';
import {IUploadDocument} from "../models/response/DocumentResponse";
import {IDocument, TDocumentType} from "../models/IDocument";

export default class DocumentService {
  static async getAllDocuments(): Promise<AxiosResponse<IDocument[]>> {
    return $api.get<IDocument[]>('/document/all');
  }

  static async uploadFile(name: string, type: TDocumentType, file: string | ArrayBuffer): Promise<AxiosResponse<IUploadDocument>>  {
    return $api.post<IUploadDocument>('/document/new', { name, type, file });
  }

  static async downloadFile(id: string, fio: string, count_day: number) {
    return $api.post('/document/download', { id, fio, count_day });
  }
}
