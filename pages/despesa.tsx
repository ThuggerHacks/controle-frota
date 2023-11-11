import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MainLayout } from "../layout/layout";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Despesa = () => {
    const [tipo, setTipo] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState(0.0);
    const [despesas, setDespesas] = useState([]);

    const addExpenses = async () => {
        if (tipo.trim() == "" || date.trim() == "" || price == 0.0) {
            return toast.error("Por favor preencha todos os campos!");
        } else {
            const data = await axios.post("/api/expenses", {
                type: tipo,
                price:parseFloat(price),
                date
            });

            if (data?.data) {
                await getExpenses();
                return toast.success("Inserido com sucesso!");
            } else {
                return toast.error("Houve um erro!");
            }
        }
    }

    const getExpenses = async () => {
        const data = await axios.get("/api/expenses");

        if (data?.data) {
            setDespesas(data.data);
        }
    }

    const deleteExpense = async(id:any) => {
        const data = await axios.delete("/api/expenses/?id="+id);

        if(data?.data){
            await getExpenses();
        }else{
            return toast.error("Houve um erro!");
        }
    }

    const terminate = async(id:number) => {
        const data = await axios.put("/api/expenses/?id="+id,{
            finished:true
        })

        if(data?.data){
            await getExpenses();
        }else{
            return toast.error("Houve um erro!");
        }
    }

    useEffect(() => {
        (async () => {
            await getExpenses()
        })();
    }, [despesas?.length > 0]);

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
                            <th scope="col">Tipo</th>
                            <th scope="col">Montante</th>
                            <th scope="col">Data</th>
                            <th scope="col">Estado</th>
                            <th scope="col">#</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            despesas?.map((item: any) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.type}</td>
                                        <td>{item.price} MT</td>
                                        <td>{item.date}</td>
                                        <td>{item.finished?"Terminado":"Nao terminado"}</td>
                                        <td>
                                            <span className="fa fa-trash text-danger" onClick={() => deleteExpense(item.id)}></span>
                                        </td>
                                        {
                                            !item.finished ?
                                                <td>
                                                    <button className="btn btn-success" onClick={() => terminate(item.id)}>
                                                        Terminar
                                                    </button></td> : <td>
                                                    <button className="btn btn-primary">
                                                        Terminado
                                                    </button>
                                                </td>

                                        }
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
                            <h5 className="modal-title">Nova despesa</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <input type="text" name="" id="" className="form-control" placeholder="Tipo de despesa" onChange={(evt: any) => setTipo(evt.target.value)} />
                            </div> <br />
                            <div className="form-group">
                                <input type="number" name="" id="" className="form-control" placeholder="Pre&ccedil;o" onChange={(evt: any) => setPrice(evt.target.value)} />
                            </div>
                            <br />
                            <div className="form-group">
                                <input type="datetime-local" name="" id="" className="form-control" placeholder="Data" onChange={(evt: any) => setDate(evt.target.value)} />
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
                            <button type="button" className="btn btn-primary" onClick={addExpenses}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}


export default Despesa;