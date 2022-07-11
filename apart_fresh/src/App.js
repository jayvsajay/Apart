import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import {ErrorBoundary} from 'react-error-boundary'
import React ,{ Suspense ,lazy, useState}from 'react'
import ErrorFallback from './components/ErrorBoundaries';
const EditAddress=lazy(()=>import('../src/components/EditAddress'))
const Register=lazy(()=>import('../src/components/Register'));
const Login=lazy(()=>import('../src/components/Login'));
const Header1=lazy(()=>import('../src/components/Header/Header1'));
const Footer=lazy(()=>import('../src/components/Footer'))
const Dashboard=lazy(()=>import('../src/components/Dashboard/Dashboard'));
const Home=lazy(()=>import('../src/components/Home/Home'));
const About=lazy(()=>import('../src/components/Aboutus/About'));
const Contact=lazy(()=>import('../src/components/Contactus/Contact'));
const MyProfile=lazy(()=>import('../src/components/MyProfile'));
const MyAccoun=lazy(()=>import('../src/components/MyAccoun'));
const EditProfile=lazy(()=>import('../src/components/EditProfile'));
const AddAddress=lazy(()=>import('../src/components/AddAddress'));
const ChangePassword=lazy(()=>import('../src/components/ChangePassword'))
const Productreview=lazy(()=>import('../src/components/Productreview'))
const Cart= lazy(()=>import('../src/components/Cart'))
const Checkout=lazy(()=>import('../src/components/Checkout'));
const SelectAddress =lazy(()=>import('../src/components/SelectAddress'))
const Order =lazy(()=>import('../src/components/Order'))



function App() {
  const [state,setState]=useState(false)
  return (
    <div className="App">
         
      <div style={{minHeight: '88vh'}}>
        <ErrorBoundary  FallbackComponent={ErrorFallback}
    onReset={() => {
      setState(false)
    }}>
     <Router>
     <Suspense fallback={<div>Loading...</div>}>
        <Header1/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/MyAccoun' element={<MyAccoun/>}/>
            <Route path='/myprofile' element={<MyProfile/>}/>
            <Route path='/editprofile' element={<EditProfile/>}/>
            <Route path='/addaddress' element={<AddAddress/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>
            <Route path='/productreview' element={<Productreview/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path="/selectaddress" element={<SelectAddress/>}/>
            <Route path='/order' element={<Order/>}/>
            <Route path='editaddress' element={<EditAddress/>}/>
          </Routes>
          </Suspense>
        </Router>  
        </ErrorBoundary>
      </div>
      <Footer/>
    
    </div>
  );
}

export default App;
