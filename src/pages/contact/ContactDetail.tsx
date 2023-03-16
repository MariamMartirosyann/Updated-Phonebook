import { Grid, Typography } from "@mui/material";
import { IContact } from "../../app/intrefaces";


interface IContactDetailProps {
    data?: IContact;
  }
  
const ContactDetail = ({data}:IContactDetailProps) => {
  return (
    <Grid container spacing={5} mb={6}>
        <Grid item xs={6}>
        <Typography fontSize={14} fontWeight={"600"}>
          Contact Photo
        </Typography>
        <img src={data?.photo} alt="Contact" width={"100px"}/>
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={"600"}>
          Contact Name
        </Typography>
        <Typography fontSize={16}>{data?.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={"600"}>
          Id
        </Typography>
        <Typography fontSize={16}>{data?.id}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={"600"}>
          Number
        </Typography>
        <Typography fontSize={16}> {data?.number?.map((i)=>{return <li key={i.id}>{i.value}</li>})}</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography fontSize={14} fontWeight={"600"}>
          Email
        </Typography>
        <Typography fontSize={16}> {data?.email?.map((i)=>{return <li key={i.id}>{i.value}</li>})}</Typography>
      </Grid>
      
    </Grid>
  )
}

export default ContactDetail