import { Grid, IconButton, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useEffect } from "react";
import { addContact, selectContact, updateContact } from "../../app/store/ContactSlice";
import { IContact, IEmail, IFormData, INumber } from "../../app/intrefaces";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ButtonLoader from "../../shared/ButtonLoader";
import InputField from "../../shared/TextInput";
import { emailRegex, phoneNumberRegex, requiredRules } from "../../validators";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const emailDefaultValue: IEmail = {
  id: nanoid(),
  value: "",
};
const numberDefaultValue: INumber = {
  id: nanoid(),
  value: 0,
};

interface IAddEditContactProps {
  onSuccess: () => void;
  editData?: IContact;
}
const AddEditContact = ({ onSuccess, editData }: IAddEditContactProps) => {
  const { id } = useParams();
  const contactData = useSelector(selectContact)
  const selectedContact = contactData.find((item) => item.id === id);

  const dispatch = useDispatch();
  const methods = useForm<IFormData>({
    mode: "all",
    defaultValues: {
      name: "",
      email: [emailDefaultValue],
      number: [numberDefaultValue],
    },
  });

  const { control,reset, handleSubmit } = methods;

  const emailFieldValue = useFieldArray({
    control,
    name: "email",
  });

  const numberFieldValue = useFieldArray({
    control,
    name: "number",
  });

  const handleAddEmail = () => {
    emailFieldValue.append(emailDefaultValue);
  };

  const handleAddNumber = () => {
    numberFieldValue.append(numberDefaultValue);
  };

  const handleRemoveEmail = (index: any) => {
    emailFieldValue.remove(index);
  };

  const handleRemoveNumber = () => {
    numberFieldValue.remove();
  };

  const onSubmit =  (formData:IFormData) => {
    const newFormData = {
   
      name: formData.name,
      email: formData.email,
      number: formData.number,
    };
    // if (editData) {
    //   dispatch(updateContact(newFormData));
    //   toast.success("Contact Updated Successfully");
    // } else {
   
    // dispatch(addContact(newFormData));
    // toast.success("Contact Added Successfully");
    // }
    
    // onSuccess();
    console.log(methods.watch())
  };

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        email: editData.email,
        number: editData.number,
      });
    }
  }, [reset, selectedContact]);
  return (
    <Fragment>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <InputField name={"name"} label="Name" rules={requiredRules} />
            </Grid>

            {numberFieldValue.fields?.map((i, index) => {
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <InputField
                    name={`number.${index}.value`}
                    label="Number"
                    rules={{
                      ...requiredRules,
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Enter only + or numbers, minimum 9 symbols",
                      },
                    }}
                  />
                  <IconButton color="primary" onClick={handleAddNumber}>
                    <PlusIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={handleRemoveNumber}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              );
            })}

            {emailFieldValue.fields?.map((i, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <InputField
                    key={index}
                    name={`email.${index}.value`}
                    label="Email"
                    rules={{
                      ...requiredRules,
                      pattern: {
                        value: emailRegex,
                        message: "Invalid Email",
                      },
                    }}
                  />
                  <IconButton color="primary" onClick={handleAddEmail}>
                    <PlusIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={handleRemoveEmail}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              );
            })}

            <Grid item xs={12}>
              <ButtonLoader
                fullWidth
                onClick={handleSubmit(onSubmit)}
                isLoading={false}
                type="submit"
              >
                <Typography>Save</Typography>
              </ButtonLoader>
            </Grid>
          </Grid>
        </FormProvider>
      </form>
    </Fragment>
  );
};

export default AddEditContact;
