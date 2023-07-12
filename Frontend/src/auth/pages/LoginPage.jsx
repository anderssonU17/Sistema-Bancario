import React, { useState } from 'react';
import '../../assets/css/login.css'
import { login } from '../api/ApiLogin';
import Swal from 'sweetalert2';

export const LoginPage = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    const result = await login(userName, password);
    if (result){
      Swal.fire({
        icon: 'success', 
        title: 'Genial!', 
        text: 'Ha iniciado sesion correctamente', 
        confirmButtonText: 'Ok',
      }).then(r => {
        if(r.isConfirmed){
          window.location.href = "/dashboard";
        }else {
          window.location.href = "/dashboard";
        }
      });
    }
  };

  return (
    <>
   <link rel="stylesheet" href="" />
   <section>
     <div className="form-box">
       <div className="form-value">
         <form action="">
           <h2>Bancario</h2>
           <div className="inputbox">
             <ion-icon name="mail-outline" />
             <input 
             value={userName} onChange={({target: {value}}) => setUserName(value)} 
             type="email" 
             required=''
             id='email'
             />
             <label>UserName</label>
           </div>
           <div className="inputbox">
             <input 
             value={password} onChange={({target: {value}}) => setPassword(value)}
             type="password" 
             required='' 
             id='password'/>
             <label htmlFor="">Password</label>
           </div>
           <div className="forget">
             <label htmlFor="">
               <input type="checkbox" />
               Do you remember <a href="#">the BANK password</a>
             </label>
           </div>
           <button type='submit' onClick={(e) => iniciarSesion(e)}>
            Login
            </button>
         </form>
       </div>
     </div>
   </section>
 </>
  )
}
