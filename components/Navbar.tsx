import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const [password,setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const updatePassword = async() => {
        if(password != cPassword || password.trim().length < 4){
            return toast.error("As senhas devem ser iguais e nao vazias");
        }else{
            const jid: any = localStorage.getItem("user");
            const id = JSON.parse(jid)?.id;
            const data = await axios.put("/api/user/?id="+id,{
                password
            });

            if(data?.data){
                return toast.success("Senha atualizada com sucesso!");
            }else{
                return toast.error("Houve um erro ao atualizar a senha!");
            }
        }
    }

    return (
        <nav className="navbar bg-primary navbar-dark fixed-top">
            <ToastContainer/>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <span className="fa fa-truck"></span>&nbsp;
                    FROTAS
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="offcanvas bg-primary offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title text-light" id="offcanvasNavbarLabel">
                            <span className="fa fa-truck"></span>&nbsp;
                            FROTAS
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        />
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link href={"/home"} className="nav-link ">
                                    <span className="fa fa-home"></span>&nbsp;
                                    Home
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link href={"veiculo"} className="nav-link ">
                                    <span className="fa fa-truck"></span>&nbsp;
                                    Veiculos
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link href={"/motorista"} className="nav-link ">
                                    <span className="fa fa-id-card"></span>&nbsp;
                                    Motoristas
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link href={"/utilizador"} className="nav-link ">
                                    <span className="fa fa-users"></span>&nbsp;
                                    Utilizadores
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link href={"/saida"}  className="nav-link ">
                                    <span className="fa fa-arrows-to-eye"></span>&nbsp;
                                    Saidas/Entradas
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link href={"/despesa"} className="nav-link ">
                                    <span className="fa fa-money-bill"></span>&nbsp;
                                    Dispesas
                                </Link> 
                            </li>
                            <li className="nav-item" data-bs-target="#exampleModal11" data-bs-toggle="modal">
                                <Link href={"#"} className="nav-link ">
                                    <span className="fa fa-key"></span>&nbsp;
                                    Alterar Senha
                                </Link> 
                            </li>
                            <li className="nav-item">
                                <Link href={"/"} className="nav-link ">
                                    <span className="fa fa-right-from-bracket"></span>&nbsp;
                                    Sair
                                </Link> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*MODAL* */}
            <div className="modal fade"  id="exampleModal11">
                <div className="modal-dialog" style={{zIndex:999999}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Alterar senha</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <input type="password" name="" id="" className="form-control" placeholder="Nova senha" onChange={(evt: any) => setPassword(evt.target.value)} />
                            </div> <br />
                            <div className="form-group">
                                <input type="password" name="" id="" className="form-control" placeholder="Confirmar senha" onChange={(evt: any) => setCPassword(evt.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={updatePassword}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </nav>

    );
}

export default Navbar;