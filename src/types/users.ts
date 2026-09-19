export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  }
  address:{
    street:string;
    city:string
  }
}

export interface CreateUserPayload {
  name: string;
  username: string;
  email: string;
    phone: string;
}