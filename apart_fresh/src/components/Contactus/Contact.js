import React, { useState } from 'react'
import {Box, Button, Container, TextField} from '@mui/material';
import { sendmail } from '../../config/MyService';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
export default function Contact() {
    const [email,setEmail]=useState('');
    const [Phone,setPhone]=useState(0);
    const [Description,setDescription]=useState('');
    const navigate=useNavigate();    
    const handlesubmit=()=>{
        let data={email:email,Phone:Phone,Description:Description}
        sendmail(data)
        .then(res=>{
            if(res.data.status_code === 201){
                swal(res.data.msg,'', "success");;
                navigate('/dashboard')
            }
            else{
                swal(res.data.msg,'', "error");;
            }
        })
    }

  return (
    <div >
         <h1 style={{fontSize: '35px'}}>Contact us</h1>
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            m: 5,
            mb: 20,
            p: 3,
            ml:"23%",
            border: '2px solid black',
            backgroundColor: 'lightgrey',
            color: 'white',
            width:"50%"
        }}
        noValidate
        autoComplete="off"
        >
            <div>
                <TextField
                    required
                    type='email'
                    id="email"
                    label="Email"
                    placeholder='Enter Email'
                    onChange={e=>setEmail(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    required
                    type='number'
                    id="Phone"
                    label="Phone Number"
                    placeholder='Enter PHone numbe'
                    onChange={e=>setPhone(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    required
                    type='text'
                    id="Description"
                    label="Description"
                    placeholder='Enter DEscrption'
                    onChange={e=>setDescription(e.target.value)}
                />
            </div>
            <Button type='submit' variant='contained' sx={{mt: 4}} onClick={handlesubmit}>Submit</Button>
        </Box>
    </div>
  )
}
