import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useCallback, useEffect, useState } from "react";
import { addContact, updateContact } from "../../app/store/ContactSlice";
import { IContact, IEmail, IFormData, INumber } from "../../app/intrefaces";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ButtonLoader from "../../shared/ButtonLoader";
import InputField from "../../shared/TextInput";
import { emailRule, phoneNumberRegex, requiredRules } from "../../validators";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const [image, setImage] = useState<FileList | null>(null);

  const methods = useForm<IFormData>({
    mode: "all",
    defaultValues: {
      name: "",
      email: [emailDefaultValue],
      number: [numberDefaultValue],
      photo: null,
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const emailFieldValue = useFieldArray({
    control,
    name: "email",
  });

  const numberFieldValue = useFieldArray({
    control,
    name: "number",
  });

  const handleAddEmail = () => {
    if (editData) {
      emailFieldValue.append({ id: Date.now(), value: "" });
    } else {
      emailFieldValue.append(emailDefaultValue);
    }
  };

  const handleAddNumber = () => {
    if (editData) {
      numberFieldValue.append({ id: Date.now(), value: 0 });
    } else {
      numberFieldValue.append(numberDefaultValue);
    }
  };

  const handleRemoveEmail = (index: any) => {
    emailFieldValue.remove(index);
  };

  const handleRemoveNumber = (index: any) => {
    numberFieldValue.remove(index);
  };
  const handleRemovePhoto = useCallback(() => {
    setImage(null);
    console.log("handleRemovePhoto");
  }, []);

  const onSubmit = (formData: IFormData) => {
    if (editData) {
      const newFormData = {
        id: editData.id,
        name: formData.name,
        email: formData.email,
        number: formData.number,
        photo: image,
      };
      dispatch(updateContact(newFormData));
      toast.success("Contact Updated Successfully");
    } else {
      const newFormData = {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        photo: image,
      };
      dispatch(addContact(newFormData));
      toast.success("Contact Added Successfully");
    }

    onSuccess();
  };

  const showRemoveEmail = methods.watch().email.length > 1;
  const showRemoveNumber = methods.watch().number.length > 1;

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        email: editData.email,
        number: editData.number,
        photo: editData.photo,
      });
    }
  }, [editData, reset]);

  useEffect(() => {
    handleRemovePhoto();
  }, [handleRemovePhoto]);
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <InputField
                name={"name"}
                label="Name"
                customError={errors?.name?.message}
                rules={requiredRules}
              />
            </Grid>

            {numberFieldValue.fields?.map((i, index) => {
              console.log(errors?.number?.[index]?.value?.message);
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
                    customError={errors?.number?.[index]?.value?.message}
                    rules={{
                      ...requiredRules,
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Enter only + or numbers, minimum 9 symbols",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddNumber}
                    style={{ marginLeft: "5px" }}
                  >
                    <PlusIcon />
                  </Button>

                  {showRemoveNumber ? (
                    <Button
                      variant="contained"
                      size="small"
                      style={{ marginLeft: "5px" }}
                      onClick={handleRemoveNumber}
                    >
                      <DeleteIcon />
                    </Button>
                  ) : null}
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
                    customError={errors?.email?.[index]?.value?.message}
                    rules={{ ...requiredRules, ...emailRule }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddEmail}
                    style={{ marginLeft: "5px" }}
                  >
                    <PlusIcon />
                  </Button>
                  {showRemoveEmail ? (
                    <Button
                      variant="contained"
                      size="small"
                      style={{ marginLeft: "5px" }}
                      onClick={handleRemoveEmail}
                    >
                      <DeleteIcon />
                    </Button>
                  ) : null}
                </Grid>
              );
            })}

            <Grid item xs={12} >
            <Box display="none">
                <input
                  name="Search"
                  type="file"
                  onChange={(e) => setImage(e.target.files)}
                />
                </Box>
              <Button
                variant="contained"
                size="large"
                style={{ marginLeft: "5px" }}
                onClick={handleRemovePhoto}
              >
                Add Photo
              </Button>
            </Grid>

            {!!editData?.photo ? (
              <Grid item xs={12}>
                <img src={editData?.photo} alt="contact" width={"100px"} />
              
              </Grid>
            ) : null}

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
