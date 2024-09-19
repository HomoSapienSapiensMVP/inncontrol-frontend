import {ContractInformationResource} from "./contract-information.resource";

/**
 * Alex Avila Asto - A.K.A (Ryzeon)
 * Project: inncontrol-frontend
 * 6/21/24 @ 07:38
 */
export class CreateEmployeeRequest {
  constructor(
    public lastName: string,
    public firstName: string,
    public phoneNumber: string,
    public email: string,
    public salary: number,
    public contractInformationResource: ContractInformationResource,
    public role: string
  ) {}
}
