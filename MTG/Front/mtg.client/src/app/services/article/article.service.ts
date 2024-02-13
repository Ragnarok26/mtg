import { Injectable } from '@angular/core';
import { DataService } from '../common/data.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private dataService: DataService) { }

  public async add(article: any) {
    return await this.dataService.postAsync<any, any>(`/api/article/`, article);
  }

  public async delete(code: string) {
    return await this.dataService.deleteAsync<any>(`/api/article/${code}`);
  }

  public async getAll() {
    return await this.dataService.getAsync<any[]>(`/api/article/`);
  }

  public async getById(code: string) {
    return await this.dataService.getAsync<any[]>(`/api/article/${code}`);
  }

  public async update(article: any) {
    return await this.dataService.putAsync<any, any>(`/api/article/`, article);
  }
}
