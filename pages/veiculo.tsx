import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { MainLayout } from "../layout/layout";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [matricula, setMatricula] = useState("");
    const [tipo, setTipo] = useState("");
    const [name, setName] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [estado, setEstado] = useState(true);

    const getVehicles = async () => {
        const data = await axios.get("/api/vehicle");
        if (data?.data) {
            setVehicles(data.data);
        }
    }

    const addVehicle = async () => {
        const jid: any = localStorage.getItem("user");
        const id = JSON.parse(jid)?.id;
        const obj = {
            code: matricula,
            name,
            type: tipo,
            authorId: id
        }

        const data = await axios.post("/api/vehicle", obj);
        if (data?.data) {
            await getVehicles();
            return toast.success("Inserido com sucesso!");
        } else {
            return toast.error("Houve um erro ao inserir!");
        }
    }

    const deleteVehicle = async(id:any) => {
        const data = await axios.delete("/api/vehicle/?id="+id);

        if(data?.data){
            await getVehicles();
        }else{
            return toast.error("Houve um erro, Verifique se o veiculo nao tem entradas/saidas antes de apagar!");
        }
    }

    const deactivate = async(status:any,id:any) => {
        const data = await axios.put("/api/vehicle/?id="+id,{status});

        if(data?.data){
            await getVehicles();
        }else{
            return toast.error("Houve um erro, Verifique se o veiculo nao tem entradas/saidas antes de apagar!");
        }
    }


    useEffect(() => {
        (async () => {
            await getVehicles();
        })();
    }, [vehicles?.length > 0])

    return (
        <MainLayout>
            <ToastContainer/>
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
                            <th scope="col">Matricula</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Adicionado Por</th>
                            <th scope="col">Adicionado Em</th>
                            <th scope="col">#</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            vehicles?.map((item:any) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.code}</td>
                                        <td>{item.type}</td>
                                        <td>{item.name}</td>
                                        <td>{item.status == true?"Activo":"Nao activo"}</td>
                                        <td>{item.author.name}</td>
                                        <td>{item.createdAt.split(".")[0]}</td>
                                        <td>
                                            <span onClick={() => deleteVehicle(item.id)} className="fa fa-trash text-danger"></span>
                                        </td>
                                        <td>
                                            {
                                                item.status == true?
                                                <button className="btn btn-danger" onClick={() => deactivate(false,item.id)}>Desactivar</button>:
                                                <button className="btn btn-success" onClick={() => deactivate(true,item.id)}>Activar</button>
                                            }
                                            
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
                            <h5 className="modal-title">Novo Veiculo</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Matricula" onChange={evt => setMatricula(evt.target.value)} />
                            </div> <br />
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Nome" onChange={evt => setName(evt.target.value)} />
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Tipo" onChange={evt => setTipo(evt.target.value)} />
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
                            <button type="button" className="btn btn-primary" onClick={addVehicle}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}


export default Dashboard;