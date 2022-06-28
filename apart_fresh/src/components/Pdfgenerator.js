import { Grid, Typography } from '@mui/material';
import React,{useState,useEffect} from 'react'
import { getOrd } from '../config/MyService';
import { URL } from '../config/url';
export default function Pdfgenerator({id}) {
  const [postdata, setPostdata] = useState([]);
  const [address, setAddress] = useState([]);
  let [order,setOrder]=useState({});
  let [user, setUser] = useState({});
  const [mainimage, setmainimage] = useState();
  useEffect(() => {
    console.log(id)
   if(id){
     setUser(JSON.parse(localStorage.getItem('user')));
    getOrd(id)
      .then((res) => {
        console.log(res.data.order)
        setOrder(res.data.order);
      
        setPostdata(res.data.order.product_id);
        setAddress(res.data.order.address);
        setmainimage(res.data.order.product_id.product_image);

      });
    }
  }, []);


  return (
    <div>
      <Typography>Invoice Details</Typography>

      <Grid container direction='row'>
        <Grid item md={6}>
          <img src={`${URL}user/${mainimage}`} alt="imag1"   width="400" height="300"/>
        </Grid>
        <Grid item md={6}>
        <h3 className="">{postdata.product_name}</h3>
                  <h5>
                    Total Price:
                      <h3 className="text-danger">
                        {" "}
                        $ {order.quantity * postdata.price}
                      </h3>
                   
                  </h5>
                  <h5 className="mt-2">
                    Quantity:{order.quantity}
                  </h5>        
                    <h5 className="mt-4">
                    Ordered By: <p className='d-inline text-primary'>{user.firstname} {user.lastname}<br/>
                {address.addressline1}<br/>
                   {address.addresslin2} - {address.pincode}<br/>
                    {address.State}, {address.Country}</p>
                  </h5>
        </Grid>
      </Grid>
    </div>
  )
}
