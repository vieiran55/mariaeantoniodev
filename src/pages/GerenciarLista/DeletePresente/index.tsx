import Button from "@mui/material/Button";
import estilos from "./DeletePresente.module.scss";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { server } from "../../../config/server";

export interface Opcoes {
  title: string;
  link: string;
  photo: string;
  status: string;
  price: number;
}

interface Props {
  showFormDelete: boolean;
  setShowFormDelete: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  title: string;
  link: string;
  photo: string;
  status: string;
}

export default function DeletePresente(props: Props) {
  const { showFormDelete, setShowFormDelete, title, link, photo, status, id } =
    props;

  const deletarDados = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://cvtrsy.online/listadepresentes/${id}`
      );
      console.log(response.data);
      Swal({
        icon: "success",
        title: "Sucesso!",
        text: "Seu cadastro foi realizado com sucesso!",
      });
      setTimeout(refresh, 2000);
    } catch (error) {
      alert("Não encontrado");
      console.error(error);
    }
  };

  const refresh=()=>{
    window.location.reload();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submetei");
    event.preventDefault();
    deletarDados(id);
    // código para enviar dados para o servidor
  };

  return (
    <div
      className={classNames({
        [estilos.formularioDelete__ativo]: showFormDelete,
        [estilos.formularioDelete__desativado]: !showFormDelete,
      })}
    >
      <form onSubmit={handleSubmit} className={estilos.formularioConteiner}>
        <AiOutlineCloseCircle
          className={estilos.formularioClose}
          onClick={() => setShowFormDelete(false)}
        />
        <h1 className={estilos.formularioTitulo}>DESEJA REALMENTE DELETAR ESTE PRESENTE?</h1>
        <label className={estilos.formularioTitulos}>
          Título:
          <input
            className={estilos.formularioInputs}
            type="text"
            placeholder={title}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Link:
          <input
            className={estilos.formularioInputs}
            type="text"
            placeholder={link}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Status:
          <input
            className={estilos.formularioInputs}
            type="text"
            placeholder={status}
          />
        </label>
        <Button variant="contained" type="submit">
          DELETAR PRESENTE
        </Button>
      </form>
    </div>
  );
}
