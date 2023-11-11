import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MainLayout } from "../layout/layout";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const User = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);

    const addUser = async () => {
        if (name.trim() == "" || email.trim() == "") {
            return toast.error("Por favor preencha todos os campos");
        } else {
            const data = await axios.post("/api/user", {
                email,
                name,
                password: "1234"
            });

            if (data?.data) {
                await getUsers();
                return toast.success("Inserido com sucesso, a senha padrao eh 1234, deve ser alterada pelo utilizador mais tarde por motivos de seguranca");
            } else {
                return toast.error("Houve um erro");
            }
        }
    }

    const getUsers = async () => {
        const data = await axios.get("/api/user");

        if (data?.data) {
            setUsers(data.data);
        }
    }

    const deleteUser = async(id:any) => {
        const data = await axios.delete("/api/user/?id="+id);

        if(data?.data){
            await getUsers();
        }else{
            return toast.error("Houve um erro");
        }
    }

    useEffect(() => {
        (async () => {
            await getUsers();
        })();
    }, [users?.length > 0]);
    return (
        <MainLayout>
            <ToastContainer />
            <Navbar />
            <div className="container-fluid-custom mt-5">
                <div>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <span className="fa fa-plus"></span>
                    </button>
                </div> <br />
                <table className="table table-bordered table-hover border-primary">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            {/* <th scope="col">Adicionado Por</th> */}
                            {/* <th scope="col">Adicionado Em</th> */}
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            users?.map((item: any) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        {/* <td>{item.author.name}</td> */}
                                        {/* <td>{item.createdAt.split(".")[0]}</td> */}
                                        <td>
                                            <span className="fa fa-trash text-danger" onClick={() => deleteUser(item.id)}></span>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>

            </div>
            {/*MODAL* */}
            <div className="modal fade" tabIndex={-1} id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Novo Utilizador</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Nome" onChange={(evt: any) => setName(evt.target.value)} />
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="email" name="" id="" className="form-control" placeholder="Email" onChange={(evt: any) => setEmail(evt.target.value)} />
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
                            <button type="button" className="btn btn-primary" onClick={addUser}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}


export default User;