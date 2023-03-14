import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Paper,
  Typography,
} from "@mui/material";
import BasicModal from "../shared/Modal/BasicModal";
import { IContact } from "../app/intrefaces";
import AddEditContact from "./contact/AddEditContact";
import BasicTable from "../shared/Table";
import { columns } from "../shared/Table/columns";
import { useSelector } from "react-redux";
import { selectContact } from "../app/store/ContactSlice";

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
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    height: "70%",
    background: "white",
    border: "2px solid #000",
    p: 4,
  },
  center: {
    width: "100%",
    textAlign: "center",
    marginBottom: "50px",
    marginTop:"10px"
  },
  end: {
    width: "90%",
    textAlign: "end",
    marginBottom: "50px",
    
  },
});

const Home = () => {
  const classes = useStyles();
 
  const contactData = useSelector(selectContact)
  console.log(contactData,"contactData")
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeContact, setActiveContact] = useState<IContact>();
  const [isWarningOpen, setWarningOpen] = useState(false);
  const handleOpenModal = () => setOpenModal(true);

  const handleClose = () => {
    setActiveContact(undefined);
  };

  const onFormSuccess = () => {
    setActiveContact(undefined);
    setOpenModal(false);
    // handleRefetch();
  };
  const handleEdit = (row: IContact) => {
    setActiveContact(row);
    setOpenModal(true);
  };

  const handleView = (row: IContact) => {
    setActiveContact(row);
    ///setViewDrawerOpen(true);
  };
  const handleOpenWarning = (row: IContact) => {
    setActiveContact(row);
    setWarningOpen(true);
  };
  const getActions = (rowData:IContact) => {
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
          <Typography variant="h4" color="primary">Phone Book App</Typography>
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
           // onChange={handleRefetch}
            getActions={getActions}
            // filterOptions={{
            //   reset: methods.reset,
            //   watch: methods.watch,
            // }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
