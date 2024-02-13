import { Injectable } from '@angular/core';
import { DataService } from '../common/data.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private dataService: DataService) { }

  public async add(store: any) {
    return await this.dataService.postAsync<any, any>(`/api/store/`, store);
  }

  public async delete(id: string) {
    return await this.dataService.deleteAsync<any>(`/api/store/${id}`);
  }

  public async getAll() {
    return await this.dataService.getAsync<any[]>(`/api/store/`);
  }

  public async getById(id: string) {
    return await this.dataService.getAsync<any[]>(`/api/store/${id}`);
  }

  public async update(store: any) {
    return await this.dataService.putAsync<any, any>(`/api/store/`, store);
  }
}
