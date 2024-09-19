export class CreateTaskRequest {

  employeeEmail: string;
  title: string;
  description: string;
  dueDate: string;

  constructor(
    employeeEmail: string,
    title: string,
    description: string,
    dueDate: string,
  ) {
    this.employeeEmail = employeeEmail;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}
