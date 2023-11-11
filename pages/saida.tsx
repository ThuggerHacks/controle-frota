import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { MainLayout } from "../layout/layout";
import 'react-toastify/dist/ReactToastify.css';

const Saida = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [driver, setDriver] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [action, setAction] = useState("");
    const [departure, setDeparture] = useState("");
    const [entrance, setEntrance] = useState("");
    const [trip, setTrip] = useState([]);

    const getDrivers = async () => {
        const data = await axios.get("/api/driver");

        if (data?.data) {
            setDrivers(data.data);
        }
    }

    const getVehicles = async () => {
        const data = await axios.get("/api/vehicle");
        if (data?.data) {
            setVehicles(data.data);
        }
    }

    const addTrip = async () => {
        if (driver.trim() == "" || vehicle.trim() == "" || action.trim() == "") {
            return toast.error("Por favor preencha os campos!")
        } else {
            const obj = {
                driverId: +driver,
                vehicleId: +vehicle,
                coming: action == "true" ? true : false,
                departure: departure,
                arrival: entrance,
                status: false
            }

            const data = await axios.post("/api/trip", obj)
            if (data?.data) {
                await getTrip();
                setDeparture("");
                setEntrance("");
                return toast.success("Adicionado com sucesso!")
            } else {
                return toast.error("Houve um erro!")
            }
        }
    }

    const getTrip = async () => {
        const data = await axios.get("/api/trip");

        if (data?.data) {
            setTrip(data.data)
        }
    }

    const deleteTrip = async (id: number) => {
        const data = await axios.delete("/api/trip/?id=" + id);

        if (data?.data) {
            await getTrip();
        } else {
            return toast.error("Houve um erro!")
        }
    }

    const finish = async (id: number) => {
        const data = await axios.put("/api/trip/?id=" + id,
            {
                status: true
            });

        if (data?.data) {
            await getTrip();
        } else {
            return toast.error("Houve um erro!")
        }
    }

    useEffect(() => {
        (async () => {
            await getDrivers();
            await getVehicles();
            await getTrip();
        })();
    }, [drivers?.length > 0])

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
                            <th scope="col">Motorista</th>
                            <th scope="col">Veiculo</th>
                            <th scope="col">A&ccedil;&atilde;o</th>
                            <th scope="col">Partida</th>
                            <th scope="col">Chegada</th>
                            {/* <th scope="col">Terminado</th> */}
                            {/* <th scope="col"> Estado</th> */}
                            <th scope="col">Adicionado Em</th>
                            <th scope="col">#</th>
                            <th scope="col">#</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            trip?.map((item: any) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.driver.name}</td>
                                        <td>{item.vehicle.name}</td>
                                        <td>{item.coming == false ? "Saida" : "Chegada"}</td>
                                        <td>{item.departure != "" ? item.departure : "---"}</td>
                                        <td>{item.arrival != "" ? item.arrival : "---"}</td>
                                        {/* <td>{item.status ==true ?item.status:"---"}</td> */}
                                        <td>{item.createdAt.split(".")[0]}</td>
                                        <td>
                                            <span onClick={() => deleteTrip(item.id)} className="fa fa-trash text-danger"></span>
                                        </td>
                                        <td>
                                            {
                                                item.status == false ?
                                                    <button className="btn btn-success" onClick={() => finish(item.id)}>
                                                        Terminar
                                                    </button> : <button className="btn btn-primary" >
                                                        Terminado
                                                    </button>
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
                            <h5 className="modal-title">Nova A&ccedil;&atilde;o</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <select onChange={(evt: any) => setDriver(evt.target.value)} name="" className="form-control" id="">
                                    <option value="">Selecionar Motorista</option>
                                    {
                                        drivers?.map((item: any) => {
                                            return (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <div className="form-group">
                                    <select onChange={(evt: any) => setVehicle(evt.target.value)} name="" className="form-control" id="">
                                        <option value="">Selecionar Veiculo</option>
                                        {
                                            vehicles?.map((item: any) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div> <br />
                            <div className="form-group">
                                <div className="form-group">
                                    <select onChange={(evt: any) => setAction(evt.target.value)} name="" className="form-control" id="">
                                        <option  >Selecionar A&ccedil;&atilde;o</option>
                                        <option value="true">Entrada</option>
                                        <option value="false">Saida</option>
                                    </select>
                                </div>
                            </div>
                            {
                                action == "false" ?
                                    <>
                                        <br />
                                        <div className="form-group">
                                            <div className="form-group">
                                                <label htmlFor="partida">Horario de Partida</label>
                                                <input type="datetime-local" className="form-control" name="" id="" onChange={(evt: any) => setDeparture(evt.target.value)} />
                                            </div>
                                        </div>
                                    </> : ""
                            }

                            {
                                action == "true" ?
                                    <>
                                        <br />
                                        <div className="form-group">
                                            <div className="form-group">
                                                <label htmlFor="partida">Horario de Chegada</label>
                                                <input type="datetime-local" className="form-control" name="" id="" onChange={(evt: any) => setEntrance(evt.target.value)} />
                                            </div>
                                        </div>
                                    </> : ""
                            }
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={addTrip}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}


export default Saida;