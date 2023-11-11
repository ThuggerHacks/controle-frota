import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { MainLayout } from '../layout/layout'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [email,setEmail]:any = useState("");
  const [password,setPassword]:any = useState("");
  const router = useRouter()

  const loginHandler = async() => {
    if(password.trim() == "" || email.trim() == "") {
      return toast.error("Por favor preencha todos os campos!");
    }else{
      const data = await axios.post("/api/user",{
        email,
        password,
        login:true
      });
      if(data?.data){
        localStorage.setItem("user",JSON.stringify(data.data));
        await router.push("/home");
      }else{
        return toast.error("Dados incorrectos!");
      }
    }
  }

  return (
    <MainLayout>
      <ToastContainer/>
      <div className='login-container'>
        <div className="card">
          <div className="card-header bg-primary">
            <h4 className='text-light'>LOGIN</h4>
          </div>
          <div className="card-content">
            <div className="card-body">
              <div>
                <div className="form-group">
                  <label htmlFor="email">Seu email</label> <br />
                  <input type="email" name="" id="email" placeholder="Seu email" className="form-control" onChange={evt => setEmail(evt.target.value)}/>
                </div> <br />
                <div className="form-group">
                  <label htmlFor="pass">Sua senha</label> <br />
                  <input type="password" name="" id="pass" placeholder="Sua senha" className="form-control" onChange={evt => setPassword(evt.target.value)}/>
                </div> <br />
                <button className="btn btn-primary" onClick={loginHandler}>Entrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
