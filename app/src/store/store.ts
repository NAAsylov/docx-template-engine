import { IUser } from "../models/IUser";
import { makeAutoObservable } from 'mobx';
import AuthService from "../services/AuthService";
import DocumentService from "../services/DocumentService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import {IDocument, TDocumentType} from "../models/IDocument";
import {getCookie, removeJWT, setJWT} from "../helpers/cookie-helper";

export default class Store {
  user = {} as IUser;
  documents = [] as IDocument[];
  current_document: IDocument | undefined = undefined;
  is_auth = false;
  is_loading = false;

  constructor() {
    // @ts-ignore
    window['store'] = this;
    makeAutoObservable(this);
  }

  setAuth(is_auth: boolean) {
    this.is_auth = is_auth;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setDocuments(documents: IDocument[]) {
    this.documents = documents;
  }

  setCurrentDocument(id: string) {
    this.current_document = this.documents.find((document) => document.id === id);
  }

  setIsLoading(is_loading: boolean) {
    this.is_loading = is_loading;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      setJWT(response.data.access_token, response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      setJWT(response.data.access_token, response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout(this.user.id);
      removeJWT();
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async refresh() {
    try {
      this.setIsLoading(true);
      const refresh_token = getCookie('refresh_token');

      if (!refresh_token) {
        console.error('Не авторизован!');
        return;
      }

      const response = await axios.post<AuthResponse>(
        `${API_URL}/refresh`,
        { refresh_token },
        { withCredentials: true });
      setJWT(response.data.access_token, response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert((e as any).response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async getAllDocuments() {
    try {
      const response = await DocumentService.getAllDocuments();
      this.setDocuments(response.data);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async uploadFile(name: string, type: TDocumentType, file: string | ArrayBuffer) {
    try {
      const response = await DocumentService.uploadFile(name, type, file);

      this.setDocuments([...this.documents, response.data]);

      return response;
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async downloadFile(id: string, fio: string, count_day: number) {
    try {
      const response = await DocumentService.downloadFile(id, fio, count_day);

      return response;
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }
}
