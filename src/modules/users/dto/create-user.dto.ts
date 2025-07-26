export class CreateUserDto {
  firstName: string | undefined;
  middleName?: string;
  lastName: string | undefined;
  secondLastName: string | undefined;
  studentCode?: string;
  email: string | undefined;
  password: string | undefined;
  facultyId: string | undefined;
  userRoleId: string | undefined;
  passwordResetId?: string;
}
