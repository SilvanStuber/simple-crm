export class User {
  idUser: string;
  firstName: string;
  lastName: string;
  email:string;
  birthDate: number;
  street: string;
  zipCode: number; 
  city: string;

  constructor(obj?: any) {
    this.idUser = obj ? obj.idUser : '';
    this.firstName = obj ? obj.firstName : '';
    this.email = obj ? obj.email : '';
    this.lastName = obj ? obj.lastName : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
  }

  public toJSON() {
    return {
      idUser: this.idUser,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    };
  }
}
