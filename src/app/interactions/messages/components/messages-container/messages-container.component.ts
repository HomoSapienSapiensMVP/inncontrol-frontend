import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Messages } from '../../model/messages.entity';
import {MessageApiService} from "../../../../shared/services/message-api.service";
import { UsermessageEntity } from "../../model/usermessage.entity";
import { MessagesCardDialogComponent } from "../messages-card-dialog/messages-card-dialog.component";
import { MessagesNewMessageDialogComponent } from "../messages-new-message-dialog/messages-new-message-dialog.component";
import { UserApiServiceService } from "../../../../shared/services/user-api.service.service";
import { AuthenticationService } from "../../../../iam/services/authentication.service";
import {MessageResponse} from "../../../../shared/model/message/message.response";
@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.css']
})
export class MessagesContainerComponent implements OnInit {

  resetMessages: Messages;
  message: Messages;
  users: UsermessageEntity[] = [];
  loaded: boolean = false;
  unreads: number = 0;
  unread: boolean = false;
  allMessages: MessageResponse[] = []; // Lista para almacenar todos los mensajes
  paginatedMessages: MessageResponse[] = []; // Lista para almacenar los mensajes paginados
  pageSize: number = 10; // Tamaño de página (número de mensajes por página)
  currentPage: number = 0; // Página actual

  options: { title: string }[] = [
    { title: 'Sent' },
    { title: 'Unread' },
    { title: 'Reset' }
  ];

  constructor(
    private messagesApiService: MessageApiService,
    private dialog: MatDialog,
    private userApiService: UserApiServiceService,
    private iamStorage: AuthenticationService
  ) {
    this.message = new Messages();
    this.resetMessages = new Messages();
  }

  ngOnInit() {
    this.fetchUsers();
    this.getMessages();
  }

  fetchUsers() {
    this.userApiService.getAll().subscribe(
      (data: any) => {
        data.forEach((user: any) => {
          this.users.push(new UsermessageEntity(user.id, `${user.firstName}.${user.lastName}`));
        });
      },
      (error: any) => {
        console.log('Error getting users');
        console.error(error);
      }
    );
  }

  getMessages() {
    this.messagesApiService.getMessagesBySenderAndReceiver(1, 2).subscribe(
      (data: MessageResponse[]) => {
        this.allMessages = data;
        this.paginateMessages();
      },
      (error: any) => {
        console.log('Error getting messages');
      },
      () => {
        this.loaded = true;
        this.badgeControl();
      }
    );
  }

  paginateMessages() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedMessages = this.allMessages.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.allMessages.length) {
      this.currentPage++;
      this.paginateMessages();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateMessages();
    }
  }

  badgeControl() {
    this.unreads = this.message.getUnreadSize();
    this.unread = this.unreads <= 0;
  }

  recieveFilter(event: any) {
    console.log('Evento recibido del hijo:', event);
    this.message.messages = this.resetMessages.messages;
    if (event === 'Sent') {
      this.message.messages = this.message.getMessageBySenderId(1);
    } else if (event === 'Unread') {
      this.message.messages = this.message.getMessageByUnreadStatus();
    } else if (event === 'Reset') {
      this.message.messages = this.resetMessages.messages;
    }
  }

  searchFilter(event: any) {
    console.log('Evento recibido del hijo:', event);
  }

  openMessageDialog(messages: any) {
    if (messages) {
      let message = this.message.copyMessage(messages);

      const dialogRef = this.dialog.open(MessagesNewMessageDialogComponent, {
        data: { messages: message, users: this.users }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed', result);
          console.log('Messages:', this.message);
          this.message.addMessage(result);
          this.badgeControl();
        }
      });

    } else {
      console.log('Open CREATE Message Dialog');
      const dialogRef = this.dialog.open(MessagesNewMessageDialogComponent, {
        data: {
          messages: {
            id: this.message.makeIdValid(),
            subject: 'Message Subject',
            message: 'Message Body...',
            sender: 1,
            date: new Date(),
            receiver: 'Receiver',
            from: 1,
            to: 1
          }, users: this.users
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          this.message.addMessage(result);
          this.badgeControl();
        }
      });
    }
  }

  getData() {
    this.getMessages();
    console.log('Messages:', this.message);
  }

  deleteMessage($event: any) {
    console.log('Evento recibido del hijo:', $event);
    this.message.deleteMessage($event);
    this.badgeControl();
  }

  openDialog(messages: any): void {
    let message = this.message.getMessagesById(messages);
    console.log('Open Dialog:', message);
    const dialogRef = this.dialog.open(MessagesCardDialogComponent, {
      data: message
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === 'Delete') {
        this.deleteMessage(messages);
      } else if (result === 'Answer') {
        this.openMessageDialog(messages);
      }
    });
  }

  changeState($event: any) {
    console.log('Evento recibido del hijo:', $event);
    this.message.changeState($event, 'read');
    this.badgeControl();
  }
}
