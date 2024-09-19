import {EmployeeApiService} from "../../../shared/services/employee-api.service";
describe('EmployeeApiService', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new EmployeeApiService()).toBeTruthy();
  });
});
