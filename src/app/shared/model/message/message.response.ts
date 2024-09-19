export class MessageResponse {
  constructor(
    public id: number,
    public sender_id: number,
    public receiver_id: number,
    public message: string,
    public created_at: string,
  ) {}
}
