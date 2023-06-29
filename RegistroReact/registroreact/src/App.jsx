import './App.css'

function App() {

  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
  <title>Registration Bank</title>
  <section className="form-register">
    <h4>Registration Bank</h4>
    <input
      className="controls"
      type="text"
      name="Name"
      id="Name"
      placeholder="First Name"
    />
    <input
      className="controls"
      type="text"
      name="Name"
      id="Name"
      placeholder="Last Name"
    />
    <input
      className="controls"
      type="E-mail"
      name="E-mail"
      id="E-mail"
      placeholder="E-mail"
    />
    <input
      className="controls"
      type="City"
      name="City"
      id="correo"
      placeholder="City"
    />
    <input
      className="controls"
      type="Country"
      name="Country"
      id="Country"
      placeholder="Country"
    />
    <input
      className="controls"
      type="Zip code"
      name="Zip code"
      id="Zip code"
      placeholder="Zip code"
    />
    <p>
      I agree with Terms <a href="#">and Conditions</a>
    </p>
    <input className="botons" type="submit" defaultValue="Registrar" />
    <p>
      <a href="#">¿I already have an account?</a>
    </p>
  </section>
</>
  )
}

export default App
