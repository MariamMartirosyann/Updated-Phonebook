export interface IContactState {
  list: IContact[];
}

export interface IEmail{
    id:string | number,
    value:string | number,
}
export interface INumber{
  id:string | number,
  value: number,
}

export interface IContact {
  id: string;
  name: string;
  email: IEmail[];
  number: INumber[];
  photo:any
}
export interface IAddEditContact {
  id: string;
  name: string;
  email: IEmail[];
  number: INumber[];
  photo:any
}
export interface IFormData {
  name: string;
  email: IEmail[];
  number: INumber[];
  photo:any
}

export interface IState {
  contact: IContactState;
}

export interface IValue {
  value: string 
}