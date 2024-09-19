import {Message} from "./message.entity";

export class Messages {

  messages: Message[]


  constructor() {
  //   create empty array
    this.messages = [];
  }

  changeState(messageId: number, state: string) {
    this.messages?.forEach((message) => {
      if (message.id === messageId) {
        message.state = state;
      }
    });
  }

  deleteMessage(messageId: number) {

    const deletedMesage: any = [];
    this.messages?.forEach((message) => {
      if (message.id === messageId) {

      } else {
        deletedMesage.push(message);
      }
    });

    this.messages = deletedMesage;


  }

  getMessagesById(messageId: number) {
    let messager: any;
    this.messages?.forEach((message) => {
      if (message.id === messageId) {
        messager = message;
      }
    });

    return messager;
  }

  copyMessage(messageId: number) {
    let messager: any;

    this.messages?.forEach((message) => {
      if (message.id === messageId) {
        // Crear una copia profunda del mensaje
        messager = JSON.parse(JSON.stringify(message));
        messager.id = this.makeIdValid();
      }
    });

    console.log('Messagerr:', messager);

    return messager;
  }

  makeIdValid() {
    const ids = new Set(this.messages?.map(message => message.id));
    let id = 1;
    while (ids.has(id)) {
      id++;
    }
    console.log('ID:', id);
    return id;
  }


  getMessages() {
    return this.messages;
  }

  getMessageByUnreadStatus() {
    let unreadMessages: any = [];
    unreadMessages = this.messages.filter((message) => message.state === "unread");

    this.messages.forEach((message) => {
      if (message.state === "read") {
        unreadMessages.push(message);
      }
    })


    this.messages = unreadMessages;

    return this.messages;
  }

  getUnreadSize() {
    let unreadMessages: any;
    unreadMessages = this.messages.filter((message) => message.state === "unread");
    return unreadMessages.length;
  }


  setSenderReciever(userid: string, name: string) {
    this.messages.forEach((message: any) => {

      if (message.from.toString() === userid.toString()) {
        message.sender = name;

      } else if (message.to.toString() === userid.toString()) {
        message.receiver = name;

      }
    });
    return this;
  }

  getMessageBySenderId(userId: number) {
    const sentMessages: any = [];
    this.messages?.forEach((message) => {
      if (message.from === userId) {
        sentMessages.push(message);

      } else if (sentMessages.length === 0) {
        console.log('No messages found');
      }
    });

    this.messages = sentMessages;

    return this.messages;
  }

  addMessage(result: Message) {
    // console.log('Result:', result);
    // console.log('Messages:', this.messages);
    this.messages.push(result);
    // console.log('Messages:', this.messages);
    return this.messages;
  }
}
