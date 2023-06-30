import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <>
  <link rel="stylesheet" href="Banco.css" />
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
    </>
  )
}

export default App
