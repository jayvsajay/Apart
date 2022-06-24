import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const navigate=useNavigate();
    const [cnumber,setcnumber]=useState(0);
    const carttotal=JSON.parse(localStorage.getItem('cart_total'))
    const checkout=()=>{
        let a=JSON.parse(localStorage.getItem('user'))
        console.log(a)
        navigate('/order')
    }
  return (
    <div>
        <Stack sx={{mt:20,ml:12,mr:10,textAlign:"justify"}}>
            <h2 >Checkout</h2>
            <TextField
            error={cnumber<=16}
            type="number"
            name="cnumber"
            required
            placeholder="Enter credit card number"
            onChange={(e)=>setcnumber(e.target.value)}/>
            <p>Order Total: ${carttotal}</p>
            <Button variant='contained' sx={{width:"120px"}} onClick={checkout}>Checkout</Button>
        </Stack>
    </div>
  )
}
