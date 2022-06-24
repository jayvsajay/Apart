const transporter=require('./transportor')
function sendMail(body){
    let mailOptions = {
        from: 'sriaj711@gmail.com',
        to: body.email,
        subject: 'Welcome to Apart fresh',
        html: ``
      };
      transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log("mail not to be sent")
        } else {
          console.log('Email sent: ' + info.response);
          
        }
      })
}
// function sendMailtodmin(data){
//   let mailOptions = {
//     from:'sriaj711@gmail.com',
//     to: 'jayvsajay734@gmail.com',
//     subject: 'Welcome to Apart fresh',
//     html: `${data.Description}`
//   };
//   transporter.sendMail(mailOptions, (error, info)=>{
//     if (error) {
//         console.log("error ocurred")
//     } else {
//       console.log('Email sent: ' + info.response);
      
//     }
//   })
// }
module.exports=sendMail;