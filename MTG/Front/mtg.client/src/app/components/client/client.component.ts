import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'mtg-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  public clients: any = [];
  public first = 0;
  public rows = 10;
  public visibleClientModal: boolean = false;
  public formGroup!: FormGroup;
  private selectedClient: any = null;

  constructor(private clientService: ClientService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null),
      username: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
      address: new FormControl<string | null>(null)
    });
    this.load();
  }

  public async load() {
    try {
      this.clients = await this.clientService.getAll();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }

  public onRefresh() {
    this.load();
  }

  public async onAdd() {
    this.selectedClient = null;
    this.formGroup = new FormGroup({
      name: new FormControl<string | null>(null),
      lastName: new FormControl<string | null>(null),
      username: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
      address: new FormControl<string | null>(null)
    });
    this.visibleClientModal = true;
  }

  public async onEdit(client: any) {
    this.selectedClient = client;
    this.formGroup = new FormGroup({
      name: new FormControl<string | null>(client.name),
      lastName: new FormControl<string | null>(client.lastName),
      username: new FormControl<string | null>(client.username),
      password: new FormControl<string | null>(client.password),
      address: new FormControl<string | null>(client.address)
    });
    this.visibleClientModal = true;
  }

  public async onDelete(client: any) {
    try {
      await this.clientService.delete(client.id);
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
    return this.clients ? this.first === this.clients.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.clients ? this.first === 0 : true;
  }

  showDialogMaximized(dialog: Dialog) {
    dialog.maximize();
  }

  public async SaveForm() {
    const data: any = {
      id: null,
      name: this.formGroup!.get('name')?.value,
      lastName: this.formGroup!.get('lastName')?.value,
      username: this.formGroup!.get('username')?.value,
      password: this.formGroup!.get('password')?.value,
      address: this.formGroup!.get('address')?.value,
      clientArticles: []
    };
    if (this.selectedClient !== null) {
      data.clientArticles = this.selectedClient.clientArticles;
      data.id = this.selectedClient.id;
    }
    try {
      const response = this.selectedClient === null ? await this.clientService.add(data) : await this.clientService.update(data);
      await this.load();
      this.CloseForm();
    } catch (ex) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An exception was occurred: ' + JSON.stringify(ex) });
    }
  }

  CloseForm() {
    this.selectedClient = null;
    this.formGroup.reset();
    this.visibleClientModal = false;
  }
}
