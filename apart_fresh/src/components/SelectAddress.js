import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../config/MyService';
import { Button, Card, FormControl, FormControlLabel,Radio, RadioGroup,} from '@mui/material'
export default function SelectAddress() {
  let [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();
    let [addr, setAddr] = useState('');
    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));
        if(user!==null){
        getUser(user.email)
        .then(res=>{
            if(res.data.user){
              console.log(res.data.user[0].address)
                setAddresses(res.data.user[0].address)
            }
        })}
        else{
            alert("Login required")
        }
    },[]);

    const handleAddress = () =>{
       localStorage.setItem('address',JSON.stringify(addr));
       navigate('/checkout');
    }
  return (
    <div>
        <h1>SelectAddress</h1>

    
         
          {addresses.length>0 ? addresses.map((adr,ind)=>{
                    return(

                             <Card>
                               <FormControl>
                               <RadioGroup>
                            <FormControlLabel value={JSON.stringify(adr)} control={<Radio/>}
                             onChange={(e)=>setAddr(JSON.parse(e.target.value))}
                             label={`${adr.address1}  ${adr.address2}-${adr.pincode}  ${adr.State}  ${adr.Country}`}
                             />
                          </RadioGroup>

                        </FormControl>
                        </Card>
                       )
                                }):<p>No Addresses found<br/>
                                <Button variant='contained' href='/addaddress'>Add address</Button></p>}
          
          
    
        <Button variant='contained' sx={{m:4}} onClick={()=>handleAddress()}>Next</Button>
        <Button variant='contained' href='/addaddress'>AddAddress</Button>
    </div>
  )
}
