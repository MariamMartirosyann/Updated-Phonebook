import { nanoid } from "nanoid";
import { IContact } from "../../intrefaces";
import Photo from "../../../images/1.jpg"

export const defaultContactList :IContact[] = [
  {
    id: nanoid(),
    name: "John Doe",
    email: [{ id: nanoid(), value: "k@mail.ru" }],
    number: [{ id: nanoid(), value: 7899512 }],
    photo:Photo,
  },
  {
    id: nanoid(),
    name: "Johna Smitgh",
    email: [{ id: nanoid(), value: "Johna@mail.ru" }],
    number: [{ id: nanoid(), value: 8974123 }],
    photo:Photo,
  },
];
