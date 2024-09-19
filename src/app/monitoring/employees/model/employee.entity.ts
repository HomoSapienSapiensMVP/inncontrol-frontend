export class EmployeeEntity {

  profileId: number;
  personName: string;
  serviceHours: string;
  tasks: number;
  role: string;
  profileImage: string;

  constructor(profileId: number, personName: string, serviceHours: string, tasks: number, role: string, image: string) {
    this.profileId = profileId;
    this.personName = personName;
    this.serviceHours = serviceHours;
    this.tasks = tasks;
    this.role = role;
    this.profileImage = image;
  }

  getRole() {
    return this.role;
  }

}
