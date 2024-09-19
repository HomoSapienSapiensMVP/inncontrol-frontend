/**
 * Alex Avila Asto - A.K.A (Ryzeon)
 * Project: inncontrol-frontend
 * 6/21/24 @ 07:58
 */
export class EmployeeResponse {
  constructor(
    public employeeId: number,
    public role: string,
    public salary: number,
    public initiationContract: string,
    public terminationContract: string,
    public profileId: number
  ) {
  }
}
