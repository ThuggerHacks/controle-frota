import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { MainLayout } from "../layout/layout";

const Dashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [trip, setTrip] = useState([]);
    const [users, setUsers] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [entrada,setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);

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

    const getUsers = async () => {
        const data = await axios.get("/api/user");

        if (data?.data) {
            setUsers(data.data);
        }
    }
    const getTrip = async () => {
        const data = await axios.get("/api/trip");

        if (data?.data) {
            setTrip(data.data)
        }
    }

    const getExpenses = async () => {
        const data = await axios.get("/api/expenses");

        if (data?.data) {
            setDespesas(data.data);
        }
    }

    const calculateEntradaSaida = () => {
        let e = 0;
        let s = 0;
        trip?.map((item:any) => {
            if( item.departure == ""){
                e++
            }else{
                s++;
            }
        })

        setEntrada(e);
        setSaida(s);
    }

    useEffect(() => {
        (async () => {
            await getDrivers();
            await getVehicles();
            await getTrip();
            await getUsers();
            await getExpenses();
            calculateEntradaSaida();
        })();
    }, [drivers?.length > 0,trip?.length > 0])

    return (
        <MainLayout>
            <Navbar />
            <div className="container-fluid-custom mt-5">
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    {/* <span className="fa fa-truck text-primary" style={{fontSize:90}}></span> */}
                                    <h4 className="">Veiculos</h4>
                                    <small>{vehicles?.length}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <h4 className="">Motoristas</h4>
                                    <small>{drivers?.length}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <h4 className="">Despesas</h4>
                                    <small>{despesas?.length}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <h4 className="">Entradas</h4>
                                    <small>{entrada}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <h4 className="">Saidas</h4>
                                    <small>{saida}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mt-4 mt-4">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <h4 className="">Utilizadores</h4>
                                    <small>{users?.length}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}


export default Dashboard;