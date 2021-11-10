import {useEffect, useState} from "react";

import api from "./api";

async function login() {
  console.log(await api.login("tim@example.com", "1234"))
}
async function signup() {
  console.log(await api.signup("tim@example.com", "1234"))
}

function App() {
  const [data, setData] = useState("No data :(");

  useEffect(() => {
    async function getData() {
      const data = await api.hello();
      console.log(data)
      setData(data.msg);
    }
    getData();
  }, []);

  return (
    <>
      <h1>MERN App!</h1>
      <p>Data from server: {data}</p>
      <button onClick={login}>Log In</button>
      <button onClick={signup}>Sign Up</button>
    </>
  );
}

export default App;
