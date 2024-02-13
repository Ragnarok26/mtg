import { ChangeDetectorRef, Component } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'mtg-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers: [MessageService]
})
export class ArticleComponent {
  public articles: any = [];
  public first = 0;
  public rows = 10;
  public visibleArticleModal: boolean = false;
  public formGroup!: FormGroup;
  public image: string = '';
  public sourceStores: any = [];
  public targetStores: any = [];
  public showStores: boolean = false;
  public selectAllStores: boolean = false;
  private selectedArticle: any = null;

  constructor(private articleService: ArticleService,
              private storeService: StoreService,
              private messageService: MessageService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      code: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      price: new FormControl<string | null>(null),
      image: new FormControl<string | null>(null),
      stock: new FormControl<string | null>(null)
    });
    this.load();
  }

  public async load() {
    try {
      this.articles = await this.articleService.getAll();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }

  public onRefresh() {
    this.load();
  }

  public async onAdd() {
    this.selectedArticle = null;
    this.formGroup = new FormGroup({
      code: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      price: new FormControl<string | null>(null),
      image: new FormControl<string | null>(null),
      stock: new FormControl<string | null>(null)
    });
    try {
      this.sourceStores = await this.storeService.getAll();
      this.cdr.markForCheck();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
    this.targetStores = [];
    this.visibleArticleModal = true;
  }

  public async onEdit(article: any) {
    this.selectedArticle = article;
    this.formGroup = new FormGroup({
      code: new FormControl<string | null>(article.code),
      description: new FormControl<string | null>(article.description),
      price: new FormControl<string | null>(article.price),
      image: new FormControl<string | null>(article.image),
      stock: new FormControl<string | null>(article.stock)
    });
    this.image = btoa(String.fromCharCode(...new Uint8Array(article.image)));
    try {
      this.sourceStores = await this.storeService.getAll();
      this.cdr.markForCheck();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
    this.targetStores = article.articleStores;
    this.visibleArticleModal = true;
  }

  public async onDelete(article: any) {
    try {
      await this.articleService.delete(article.code);
      await this.load();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.articles ? this.first === this.articles.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.articles ? this.first === 0 : true;
  }

  showDialogMaximized(dialog: Dialog) {
    dialog.maximize();
  }

  public async SaveForm() {
    const data: any = {
      code: this.formGroup!.get('code')?.value,
      description: this.formGroup!.get('description')?.value,
      price: this.formGroup!.get('price')?.value,
      image: this.image,
      stock: this.formGroup!.get('stock')?.value,
      articleStores: [],
      clientArticles: []
    };
    if (this.selectedArticle !== null) {
      data.clientArticles = this.selectedArticle.clientArticles;
    }
    if (this.showStores) {
      data.clientArticles = [];
      this.targetStores.forEach((element: any) => {
        const item: any = {
          articleCode: data.code,
          storeId: element.id,
          date: new Date()
        };
        data.articleStores.push(item);
      });
    }
    try {
      const response = this.selectedArticle === null ? await this.articleService.add(data) : await this.articleService.update(data);
      await this.load();
      this.CloseForm();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }

  CloseForm() {
    this.selectedArticle = null;
    this.formGroup.reset();
    this.image = '';
    this.sourceStores = [];
    this.targetStores = [];
    this.visibleArticleModal = false;
    this.selectAllStores = false;
    this.showStores = false;
  }

  public async readSelectedImage(event: FileSelectEvent) {
    const imageBytes = await event.files[0].arrayBuffer();
    this.image = btoa(String.fromCharCode(...new Uint8Array(imageBytes)));
  }

  removeImage(fileUploader: FileUpload) {
    fileUploader.clear();
    this.image = '';
  }
  
  onSelectAllStoresChange(event: any) {
    this.targetStores = event.checked ? [...this.sourceStores] : [];
    this.selectAllStores = event.checked;
    event.updateModel(this.targetStores, event.originalEvent)
  }

  onChangeStoresSelection(event: any) {
    const { originalEvent, value } = event
    if (value) this.selectAllStores = value.length === this.sourceStores.length;
  }
}
