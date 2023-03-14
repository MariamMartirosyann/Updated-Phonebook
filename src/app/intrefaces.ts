export interface IContactState {
  list: IContact[];
}

export interface IEmail{
    id:string,
    value:string | number,
}
export interface INumber{
  id:string,
  value: number,
}

export interface IContact {
  id: string;
  name: string;
  email: IEmail[];
  number: INumber[];
}
export interface IAddEditContact {
  id: string;
  name: string;
  email: IEmail[];
  number: INumber[];
}
export interface IFormData {
  name: string;
  email: IEmail[];
  number: INumber[];
}

export interface IState {
  contact: IContactState;
}

