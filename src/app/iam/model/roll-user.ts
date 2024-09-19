export enum RoleUser {
  EMPLOYEE ,
  MANAGER ,
  NONE
}

export function getRoleUserFromValue(value: string): RoleUser {
  switch (value) {
    case "EMPLOYEE":
      return RoleUser.EMPLOYEE;
    case "MANAGER":
      return RoleUser.MANAGER;
    default:
      return RoleUser.NONE;
  }
}
