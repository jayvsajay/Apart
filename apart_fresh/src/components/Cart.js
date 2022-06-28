import { Card, CardActions, CardContent,Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { TableContainer } from '@mui/material'
import {useNavigate} from 'react-router-dom';
import { getCart,incrementproduct,decrementproduct,deleteOrder } from '../config/MyService';
import { URL } from '../config/url';

export default function Cart() {
  let [products,setProducts] = useState([]);
  let [total, setTotal] = useState(0);
  let [gst, setGst] = useState(0);
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
      if(user){
          getCart(user.email)
          .then(res=>{
              if(res.data.err){
                  console.log(res.data.err);
              }
              else{
                  console.log(res.data.cart)
                  setProducts(res.data.cart);
                  const datatotal = res.data.cart.reduce((prev, cur)=>prev + cur.quantity * cur.product_id.price,0);
                  setTotal(datatotal);
                  localStorage.setItem('cart_total',datatotal);
                  setGst(datatotal * 0.05)
              }
          })
      }
      else{
          navigate('/login')
  }
},[]);
const increment = (id) =>{
  let data = {email:user.email,product_id:id};
  incrementproduct(data)
  .then(res=>{
      if(res.data.err){
          alert(res.data.err);
      }
      else{
          alert(res.data.msg);
      }
  })
}
const decrement = (id) =>{
  let data = {email:user.email,product_id:id};
  decrementproduct(data)
  .then(res=>{
      if(res.data.err){
          alert(res.data.err);
      }
      else{
          alert(res.data.msg);
      }
  })
}

const buyProducts = ()=>{
  navigate('/selectaddress');
}

const deleteCart = (id) =>{
  deleteOrder(id)
  .then(res=>{
      if(res.data.err){
          alert(res.data.err);
      }
      else{
          alert(res.data.msg);
      }
  })
}
  return (
    <div>
          {products.length>0?
        <Grid container direction='row' sx={{m:1,mt:10}}>
      
            <Grid item lg={8} md={6} xs={12}>
        <TableContainer component={Paper}>
        <Table sx={{minwidth:'650px'}}>
        <TableHead>
          <TableRow>
            <TableCell >Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell >Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {products.map(prd=>
                 <TableRow key={prd._id}>
                    <TableCell sx={{textAlign:'left'}}><Grid><Grid item md={4}>
                      <img src={`${URL}user/${prd.product_id.product_image}`} alt="imag1" width='100px' height='100px'/>
                    </Grid> <Grid item lg={5}><p >{prd.product_id.product_name}<br/>
                    Status: In stock</p></Grid></Grid></TableCell>
                    <TableCell sx={{p:3}}><Grid contianer direction='row'>
                        <Grid item ><Button variant='contained' onClick={()=>increment(prd.product_id)}>+</Button></Grid>
                        <Grid item ><p style={{pt:2}}>{prd.quantity}</p></Grid>
                        <Grid item ><Button variant='contained' onClick={()=>decrement(prd.product_id)}>-</Button></Grid></Grid></TableCell>
                    <TableCell sx={{p:3}}>{prd.product_id.price}</TableCell>
                    <TableCell sx={{p:3}}>{prd.quantity * prd.product_id.price}</TableCell>
                    <TableCell><Button variant='contained'  onClick={()=>deleteCart(prd._id)}>Delete</Button></TableCell>
                  </TableRow>)}
            </TableBody>
        </Table>
        </TableContainer>
        </Grid>
        <Grid md={4}>
            <Card component={Paper}>
              <h3>Review product</h3>
                <CardContent>
                  <Grid container direction='row' sx={{textAlign:"justify"}}>
                    <Grid item sm={5}>
             Total </Grid>
              <Grid item sm={5} >{total}</Grid>
              <Grid item sm={5}>Gst of 5% </Grid>
               <Grid item sm={5}>{gst}</Grid> 
               <Grid item sm={5}>Grandtotal </Grid>
               <Grid item sm={5} >   {total+gst}</Grid>
                </Grid></CardContent>
                <CardActions><Button variant='contained' sx={{ml:15}} onClick={buyProducts}>Proceed to buy</Button></CardActions>
            </Card>
        </Grid>
        </Grid>
        :"Your cart is Empty"}
    </div>
  )
}
