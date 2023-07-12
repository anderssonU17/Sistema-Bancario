import React from 'react';
import '../../assets/css/login.css'

export const LoginPage = () => {


  return (
    <>
   <link rel="stylesheet" href="" />
   <section>
     <div className="form-box">
       <div className="form-value">
         <form action="">
           <h2>Bank Login</h2>
           <div className="inputbox">
             <ion-icon name="mail-outline" />
             <input type="email" required="" />
             <label htmlFor="">Bank Mail</label>
           </div>
           <div className="inputbox">
             <input type="password" required="" />
             <label htmlFor="">Password</label>
           </div>
           <div className="forget">
             <label htmlFor="">
               <input type="checkbox" />
               Do you remember <a href="#">the BANK password</a>
             </label>
           </div>
           <button>Login</button>
           <div className="register">
             <p>
               I don't have a BANK account <a href="#">Register</a>
             </p>
           </div>
         </form>
       </div>
     </div>
   </section>
 </>
  )
}
