import { Component } from '@angular/core';
import {
  Message,
  User,
  SendMessageEvent,
} from '@progress/kendo-angular-conversational-ui';

@Component({
  selector: 'chat-component',
  template: `
        <div style="position: absolute; right:0;cursor: pointer;border: 1px solid grey; padding:5px; border-radius: 5px;background-color:white;" (click)="showHideChat()" *ngIf='!showChat'> Chat with the support</div> <br/>
        <div style="position: absolute; right:0;cursor: pointer;border:1px solid #e3e3e3; padding-left:5px; padding-right:5px;border-radius:5px; background-color:white;" (click)="showHideChat()" *ngIf='showChat'> X </div> <br/>
        <kendo-chat
            [messages]="messages"
            [user]="user"
            (sendMessage)="sendMessage($event)"
            [style.height.px]="250"
            *ngIf='showChat'>
        </kendo-chat>
    `,
})
export class ChatComponent {
  showChat: boolean = true;

  public user: User = { id: 1 };

  public bot: User = { id: 0 };

  public messages: Message[] = [
    {
      author: this.bot,
      text: 'Can not find what you are looking for? Ask your question here. Our support service will gladly help you.',
    },
    {
      author: this.user,
      text: 'Yes thank you.',
    },
  ];

  public sendMessage(e: SendMessageEvent): void {
    this.messages = [...this.messages, e.message];
  }

  showHideChat() {
    this.showChat = !this.showChat;
  }
}
