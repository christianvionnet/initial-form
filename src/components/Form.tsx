import { useForm } from "react-hook-form";
import { useState, CSSProperties, useEffect } from "react";
import appFirebase from "../firebase/config";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import Dropdown from "react-dropdown";
import BounceLoader from "react-spinners/BounceLoader";
import "react-dropdown/style.css";
import LogoAIT from "../assets/icons/LogoAIT";
import DownloadCSV from "./DownloadCSV";
import { write as writeXLSX, utils } from "xlsx";

const db = getFirestore(appFirebase);
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

interface UserData {
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fa053c");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState("");
  const [dataList, setDataList] = useState<UserData[]>([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const options = [
    { value: "frontend", label: "Frontend Developer" },
    { value: "backend", label: "Backend Developer" },
    { value: "fullstack", label: "Fullstack Developer" },
    { value: "tester", label: "QA Tester" },
    { value: "uxui", label: "UX/UI Designer" },
    { value: "otro", label: "Otro" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const dataCollection = collection(db, "usuarios-suscripcion");
      const snapshot = await getDocs(dataCollection);
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          apellido: docData.apellido,
          email: docData.email,
          nombre: docData.nombre,
          rol: docData.rol,
        } as UserData;
      });
      console.log(data);
      setDataList(data);
      const ws = utils.json_to_sheet(data);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Sheet1");

      const wbout = new Blob(
        [writeXLSX(wb, { bookType: "xlsx", type: "array" })],
        {
          type: "application/octet-stream",
        }
      );

      const url = window.URL.createObjectURL(wbout);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xlsx");
      document.body.appendChild(link);
      link.click();
    };

    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setRole(event.value);
  };

  const onSubmit = async (data: any) => {
    if (role === "") {
      setError(true);
      return;
    }
    data = {
      ...data,
      rol: role,
    };
    setError(false);
    setLoading(true);
    try {
      const res = await addDoc(collection(db, "usuarios-suscripcion"), {
        ...data,
      });
      data = {
        ...data,
        nombre: "",
        apellido: "",
        email: "",
        rol: "",
      };
      setLoading(false);
      setSuccess(true);
      console.log({ res });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="middle-container">
      <h2 className="text-title">
        Falta muy poco para revolucionar el Mundo IT
      </h2>
      {loading ? (
        <div className="form-container">
          <BounceLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : success ? (
        <div className="form-container fade-in">
          <b>¡Gracias por suscribirte a Activando IT!</b>
          <p>Te estaremos enviando todas las novedades por correo</p>
          <LogoAIT width={150} />
        </div>
      ) : (
        <form
          className="form-container"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="input-container">
            <input
              type="text"
              placeholder="Nombre"
              {...register("nombre", {
                required: true,
                maxLength: 20,
              })}
            />
            <input
              type="text"
              placeholder="Apellido"
              {...register("apellido", {
                required: true,
                maxLength: 20,
              })}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: true,
                maxLength: 35,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
            />
            <Dropdown
              className="select-container"
              controlClassName="select-selected"
              menuClassName="select-background"
              arrowClassName="select-arrow-closed"
              options={options}
              onChange={handleChange}
              value={role}
              placeholder="¿Para qué rol postulas?"
            />
          </div>
          <div className="btn-container">
            {(errors.nombre?.type === "required" ||
              errors.apellido?.type === "required" ||
              errors.email?.type === "required" ||
              error) && (
              <p className="warning-message">
                Todos los campos son obligatorios
              </p>
            )}
            {errors.email?.type === "pattern" && (
              <p>El formato del correo no es válido</p>
            )}
            <button className="btn btn-primary" type="submit">
              SUSCRIBIRME
            </button>
            {/* Sólo habilitar para descargar el archivo CSV
            <DownloadCSV dataList={dataList} /> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
