import { Button, Card, CardContent, Container } from '@mui/material';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { getOrder } from '../config/MyService';
import Pdfgenerator from './Pdfgenerator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { URL } from '../config/url';

export default function Order() {
  const [order_details,setOrder_details]=useState([]);
  const [timeout,setTime]=useState(0)
  const navigate=useNavigate()

  useEffect(()=>{
    let user=JSON.parse(localStorage.getItem('user'))
    if(user){
    getOrder(user.email)
    .then(res=>{
      if(res.data.err){
        swal(res.data.err)
      }
      else{
        console.log(res.data.order)
        setOrder_details(res.data.order)
      }
    })}
    else{
      navigate('/login')
    }
  },[])
  const generatePdf = (id) => {
    sessionStorage.setItem('order_id',id);
    setTime(id)
    const input = document.getElementById('pdf');
    input.style.display = 'block';
   setTimeout(()=>{ html2canvas(input,{useCORS:true}).then(canvas => {
        const pdf = new jsPDF();
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        const img = canvas.toDataURL(
            "/images/1.jpg"
        );
        pdf.addImage(img, "JPG", 0, 0, width, height);
        pdf.save("download.pdf");
    })
    input.style.display = 'none';
setTime(0)},2000);
};
  return (
    <div>
        <h1>Order module</h1>
        <Container>
        {order_details.length >= 1 ?
                        order_details.map(prd=>
                        <Card key={prd._id} style={{textAlign:'left'}}>
                            <CardContent>
                            <h5>Order No: {prd._id}</h5>
                            <CardContent>                            
                            Placed on: {moment(prd.created_at).format('DD-MM-YYYY')} 
                            <p className='text-success d-inline'> ${prd.quantity * prd.product_id.price}</p>
                            </CardContent>
                            <hr/>
                        <img src={`${URL}user/${prd.product_id.product_image}`} alt="imag1"
                        width='150px' height='100px' />                      
                           <hr/>
                            <Button variant="contained" active onClick={()=>generatePdf(prd._id)}>Download invoice as pdf</Button>
                            </CardContent>
                        </Card>):
                  <h4 className='m-4'>No orders placed</h4>}
                        </Container>
                   
                <div style={{display:'none'}} id='pdf'>
                   {timeout.length>0 && <Pdfgenerator  id={timeout}/>}                  
                </div>
        
    </div>
  )
}
