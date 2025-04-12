export class UserEntity{
  id: number;
  name: string;
  email: string;
  password: string;
  type_user: string;
  phone: string;
  image: string;
  constructor(id: number = 0, name: string = "", email: string = "", password: string = "", type_user: string = "", phone: string = "") {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type_user = type_user;
    this.phone = phone;
    this.image = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png";
  }
}
