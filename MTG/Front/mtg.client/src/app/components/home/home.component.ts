import { ChangeDetectorRef, Component } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'mtg-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService]
})
export class HomeComponent {
  public articles: any = [];
  public selectedArticles: any = [];
  public responsiveOptions: any[] | undefined;
  
  constructor(private articleService: ArticleService,
    private clientService: ClientService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.load();
  }

  public async load() {
    try {
      this.articles = await this.articleService.getAll();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }
  
  public async pay() {
    try {
      const token: any = localStorage.getItem('token');
      if (token !== null && token !== 'null') {
        const tokenDetail: any = JSON.parse(token);
        const payload: any = atob(tokenDetail.token.split('.')[1]);
        const decoded: any = JSON.parse(payload);
        const data: any = await this.clientService.getById(decoded.id);
        this.selectedArticles.forEach((element: any) => data.clientArticles.push({ clientId: decoded.id, articleCode: element.code, date: new Date() }));
        const response = await this.clientService.update(data);
      }
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }
  
  addToCart(article: any) {
    let filter = this.selectedArticles.find((element: any, index: number) => element.code === article.code);
    if (filter === undefined) {
      filter = [];
    }
    if (filter.length <= 0) {
      this.selectedArticles.push(article);
      let i = -1;
      this.articles.find((element: any, index: number) => {
        const condition = element.code === article.code;
        if (condition) {
          i = index;
        }
        return condition;
      });
      if (i > -1) {
        this.articles.splice(i, 1);
      }
    }
  }
}
