export class CreateUserDto {
  firstName!: string;
  middleName?: string;
  lastName!: string;
  secondLastName!: string;
  studentCode?: string;
  email!: string;
  password!: string;
  facultyId!: string;
  passwordResetId?: string;
  roles!: string;
}
