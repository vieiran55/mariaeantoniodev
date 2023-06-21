import Button from "@mui/material/Button";
import estilos from "./DeletePresenca.module.scss";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { server } from "../../../config/server";

export interface Opcoes {
  nome: string;
  qtd: number;
  pessoas: string[];
  confirmado: boolean;
}

interface Props {
  showFormPresDelete: boolean;
  setShowFormPresDelete: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  nome: string;
  qtd: number;
  pessoas: string[];
  confirmado: boolean;
}

export default function DeletePresenca(props: Props) {
  const {
    showFormPresDelete,
    setShowFormPresDelete,
    nome,
    qtd,
    pessoas,
    confirmado,
    id,
  } = props;

  const deletarDados = async (id: number) => {
    try {
      const response = await axios.delete(
        `https://cvtrsy.online/convidados/${id}`
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

  const refresh = () => {
    window.location.reload();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submetei");
    console.log(id);
    event.preventDefault();
    deletarDados(id);
    // código para enviar dados para o servidor
  };

  return (
    <div
      className={classNames({
        [estilos.formularioDelete__ativo]: showFormPresDelete,
        [estilos.formularioDelete__desativado]: !showFormPresDelete,
      })}
    >
      <form onSubmit={handleSubmit} className={estilos.formularioConteiner}>
        <AiOutlineCloseCircle
          className={estilos.formularioClose}
          onClick={() => setShowFormPresDelete(false)}
        />
        <h1 className={estilos.formularioTitulo}>
          DESEJA REALMENTE DELETAR ESTE CONVIDADO?
        </h1>
        <label className={estilos.formularioTitulos}>
          Nome:
          <input
            className={estilos.formularioInputs}
            type="text"
            placeholder={nome}
          />
        </label>
        <Button variant="contained" type="submit">
          DELETAR PRESENTE
        </Button>
      </form>
    </div>
  );
}
