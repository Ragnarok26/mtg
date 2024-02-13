import { ChangeDetectorRef, Component } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'mtg-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  public stores: any = [];
  public first = 0;
  public rows = 10;
  public visibleStoreModal: boolean = false;
  public formGroup!: FormGroup;
  public sourceArticles: any = [];
  public targetArticles: any = [];
  public showArticles: boolean = false;
  public selectAllArticles: boolean = false;
  private selectedStore: any = null;

  constructor(private articleService: ArticleService,
    private storeService: StoreService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      branch: new FormControl<string | null>(null),
      address: new FormControl<string | null>(null)
    });
    this.load();
  }

  public async load() {
    try {
      this.stores = await this.storeService.getAll();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }

  public onRefresh() {
    this.load();
  }

  public async onAdd() {
    this.selectedStore = null;
    this.formGroup = new FormGroup({
      branch: new FormControl<string | null>(null),
      address: new FormControl<string | null>(null)
    });
    try {
      this.sourceArticles = await this.articleService.getAll();
      this.cdr.markForCheck();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
    this.targetArticles = [];
    this.visibleStoreModal = true;
  }

  public async onEdit(store: any) {
    this.selectedStore = store;
    this.formGroup = new FormGroup({
      branch: new FormControl<string | null>(store.branch),
      address: new FormControl<string | null>(store.address)
    });
    try {
      this.sourceArticles = await this.articleService.getAll();
      this.cdr.markForCheck();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
    this.targetArticles = store.articleStores;
    this.visibleStoreModal = true;
  }

  public async onDelete(store: any) {
    try {
      await this.storeService.delete(store.id);
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
    return this.stores ? this.first === this.stores.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.stores ? this.first === 0 : true;
  }

  showDialogMaximized(dialog: Dialog) {
    dialog.maximize();
  }

  public async SaveForm() {
    const data: any = {
      id: null,
      branch: this.formGroup!.get('branch')?.value,
      address: this.formGroup!.get('address')?.value,
      articleStores: []
    };
    if (this.selectedStore !== null) {
      data.articleStores = this.selectedStore.articleStores;
      data.id = this.selectedStore.id;
    }
    if (this.showArticles) {
      data.articleStores = [];
      this.targetArticles.forEach((element: any) => {
        const item: any = {
          articleCode: element.code,
          storeId: data.id,
          date: new Date()
        };
        data.articleStores.push(item);
      });
    }
    
    try {
      const response = this.selectedStore === null ? await this.storeService.add(data) : await this.storeService.update(data);
      await this.load();
      this.CloseForm();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }

  CloseForm() {
    this.selectedStore = null;
    this.formGroup.reset();
    this.sourceArticles = [];
    this.targetArticles = [];
    this.visibleStoreModal = false;
    this.selectAllArticles = false;
    this.showArticles = false;
  }
  
  onSelectAllArticlesChange(event: any) {
    this.targetArticles = event.checked ? [...this.sourceArticles] : [];
    this.selectAllArticles = event.checked;
    event.updateModel(this.targetArticles, event.originalEvent)
  }

  onChangeArticlesSelection(event: any) {
    const { originalEvent, value } = event
    if (value) this.selectAllArticles = value.length === this.sourceArticles.length;
  }
}
