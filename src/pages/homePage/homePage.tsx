import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BasicModal from "../../shared/Modal/BasicModal";
import { IContact } from "../../app/intrefaces";
import AddEditContact from "../contact/AddEditContact";
import BasicTable from "../../shared/Table";
import {
  columns,
  removeContactWarningConfig,
} from "../../shared/Table/columns";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, selectContact } from "../../app/store/ContactSlice";
import ContactDetail from "../contact/ContactDetail";
import SharedDialog from "../../shared/Dialog";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import Filters from "./filters";
import InputField from "../../shared/TextInput";

const useStyles: any = makeStyles({
  main: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(#3f50b5, #9198e5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    width: "55%",
    height: "70%",
    background: "white",
    padding: "10px",
  },
  btn: {
    marginRight: "20px",
  },

  center: {
    width: "100%",
    textAlign: "center",
    marginBottom: "50px",
    marginTop: "10px",
  },
  end: {
    width: "90%",
    textAlign: "end",
    marginBottom: "50px",
  },
});

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const methods = useForm({});

  const contactData = useSelector(selectContact);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeContact, setActiveContact] = useState<IContact>();
  const [isWarningOpen, setWarningOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleClose = () => {
    setActiveContact(undefined);
  };

  const onFormSuccess = () => {
    setActiveContact(undefined);
    setOpenModal(false);
  };
  const handleEdit = (row: IContact) => {
    setActiveContact(row);
    setOpenModal(true);
  };

  const handleView = (row: IContact) => {
    setActiveContact(row);
    setViewModalOpen(true);
  };

  const handleOpenWarning = (row: IContact) => {
    setActiveContact(row);
    setWarningOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteContact(activeContact));
    toast.success("Contact deleted");
  };

  const filterData=(value:any) => contactData.filter((i:IContact) =>
  i.name.toLowerCase().includes(value)
);
  const handleDrawTable = !!filterData? filterData :contactData
   
  const getActions = (rowData: IContact) => {
    return [
      {
        label: "View",
        onClick: () => handleView(rowData),
      },

      {
        label: "Edit",
        onClick: () => handleEdit(rowData),
      },

      {
        label: "Delete",
        onClick: () => handleOpenWarning(rowData),
      },
    ];
  };

  return (
    <Box className={classes.main}>
      <Box component={Paper} className={classes.table} elevation={10}>
        <Box className={classes.center}>
          {" "}
          <Typography variant="h4" color="primary">
            Phone Book App
          </Typography>
        </Box>
        <Box mt={4} ml={10}>
          <FormProvider {...methods}>
            <Box mt={2} mb={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={3}>
                    <InputField name="search" label={"Search"} />
                  </Grid>

                  <Grid item xs={3}>
                    <ButtonGroup variant="contained">
                      <Button
                        //onClick={onChange}
                        color="primary"
                        variant="contained"
                      >
                        Apply
                      </Button>
                      <Button
                        //onClick={handleClear}
                        color="inherit"
                      >
                        Clear
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </FormProvider>
          <Divider />
        </Box>
        <Box className={classes.end}>
          <Button
            onClick={handleOpenModal}
            variant="outlined"
            endIcon={<AddIcon />}
            size="small"
          >
            Add Contact
          </Button>
        </Box>
        <BasicModal
          open={openModal}
          setOpen={setOpenModal}
          onClose={handleClose}
          title={`${activeContact ? "Edit" : "Add"} Contact`}
        >
          <AddEditContact onSuccess={onFormSuccess} editData={activeContact} />
        </BasicModal>

        <Box sx={{ width: "80%", justifyContent: "center", margin: "auto" }}>
          <BasicTable<IContact>
            data={contactData}
            columns={columns}
            getActions={getActions}
            filterOptions={{
              reset: methods.reset,
              watch: methods.watch,
            }}
          />

          <BasicModal
            open={isViewModalOpen}
            setOpen={setViewModalOpen}
            onClose={handleClose}
            title={`View Contact`}
          >
            <ContactDetail data={activeContact} />
          </BasicModal>

          <SharedDialog
            open={isWarningOpen}
            setOpen={setWarningOpen}
            onSuccess={handleDelete}
            textConfig={removeContactWarningConfig}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
