import { Injectable } from '@angular/core';
import { DataService } from '../common/data.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private dataService: DataService) { }

  public async add(client: any) {
    return await this.dataService.postAsync<any, any>(`/api/client/`, client);
  }

  public async delete(id: string) {
    return await this.dataService.deleteAsync<any>(`/api/client/${id}`);
  }

  public async getAll() {
    return await this.dataService.getAsync<any[]>(`/api/client/`);
  }

  public async getById(id: string) {
    return await this.dataService.getAsync<any[]>(`/api/client/${id}`);
  }

  public async login(client: any) {
    return await this.dataService.postAsync<any, any>(`/api/account/login/`, client);
  }

  public async update(client: any) {
    return await this.dataService.putAsync<any, any>(`/api/client/`, client);
  }
}
