import { IUser } from "../models/IUser";
import { makeAutoObservable } from 'mobx';
import AuthService from "../services/AuthService";
import DocumentService from "../services/DocumentService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import {IDocument, TDocumentType} from "../models/IDocument";

export default class Store {
  user = {} as IUser;
  documents = [] as IDocument[];
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

  setIsLoading(is_loading: boolean) {
    this.is_loading = is_loading;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout(this.user.id);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }

  async refresh() {
    try {
      this.setIsLoading(true);
      const refresh_token = localStorage.getItem('refresh_token');

      if (!refresh_token) {
        console.error('Не авторизован!');
        return;
      }

      const response = await axios.post<AuthResponse>(
        `${API_URL}/refresh`,
        { refresh_token },
        { withCredentials: true });
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
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
      return await DocumentService.uploadFile(name, type, file);
    } catch (e) {
      alert((e as any).response?.data?.message);
    }
  }
}
