
/**
 * Alex Avila Asto - A.K.A (Ryzeon)
 * Project: inncontrol-frontend
 * 6/21/24 @ 08:25
 */
export class ProfileResponse {
  constructor(
    public id: number,
    public names: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public userId: number
  ) {
  }
}
