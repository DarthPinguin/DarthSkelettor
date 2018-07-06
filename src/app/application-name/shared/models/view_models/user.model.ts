import { UserDto } from "../dto/user-dto.interface";

export class User {

  public static fromJson(obj: UserDto): User {
    if (!obj) { return null; }
    const user = new User();
    user.id = obj.id;
    user.name = obj.name;
    user.firstname = obj.firstname;
    user.title = obj.title;
    user.function = obj.function;
    user.fax = obj.fax;
    user.phone = obj.phone;
    user.mobile = obj.mobile;
    user.email = obj.email;
    user.language = obj.language;
    user.ynUcAcceptedSimpl = obj.ynUcAcceptedSimpl;
    return user;
  }

  public id: number;

  public name: string;

  public firstname: string;

  public title: string;

  public function: string;

  public fax: string;

  public phone: string;

  public mobile: string;

  public email: string;

  public language: string;

  public ynUcAcceptedSimpl: string;

  constructor() {
    // empty
  }

  public toDto(): UserDto {
    const dto = {} as UserDto;
    dto.id = this.id;
    dto.name = this.name;
    dto.firstname = this.firstname;
    dto.title = this.title;
    dto.function = this.function;
    dto.fax = this.fax;
    dto.phone = this.phone;
    dto.mobile = this.mobile;
    dto.email = this.email;
    dto.language = this.language;
    dto.ynUcAcceptedSimpl = this.ynUcAcceptedSimpl;
    return dto;
  }

}
