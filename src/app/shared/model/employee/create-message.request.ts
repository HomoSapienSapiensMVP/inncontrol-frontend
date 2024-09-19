
export class CreateMessageRequest {
  constructor(
    public senderEmail: string,
    public receiverEmail: string,
    public content: string,
  ) {
  }
}
