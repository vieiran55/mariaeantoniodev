import Button from "@mui/material/Button";
import estilos from "./AtualizaPresente.module.scss";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "@mui/joy/Input";
import { ChangeEvent, useState } from "react";
import { server } from "../../../config/server";

export interface Opcoes {
  title: string;
  link: string;
  photo: string;
  status: string;
  price: number;
}

interface Props {
  showFormAtualiza: boolean;
  setShowFormAtualiza: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  title: string;
  link: string;
  photo: string;
  status: string;
  price: number;
}

export default function AtualizaPresente(props: Props) {
  const {
    showFormAtualiza,
    setShowFormAtualiza,
    title,
    link,
    photo,
    status,
    id,
    price,
  } = props;

  const [tituloAtt, setTituloAtt] = useState(title);
  const [linkAtt, setLinkAtt] = useState(link);
  const [statusAtt, setStatusAtt] = useState(status);
  const [precoAtt, setPrecoAtt] = useState<number>(price);
  const [fotoAtt, setFotoAtt] = useState(photo);

  const atualizarDados = async (id: number, dados: Opcoes) => {
    try {
      const response = await axios.put(
        `https://cvtrsy.online/listadepresentes/${id}`,
        dados
      );
      console.log(response.data);
      verificarSucesso();
      setTimeout(refresh, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const refresh = () => {
    window.location.reload();
  };

  const verificarSucesso = () => {
    Swal({
      icon: "success",
      title: "Sucesso!",
      text: "Seu cadastro foi realizado com sucesso!",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submetei");
    event.preventDefault();
    atualizarDados(id, {
      title: tituloAtt,
      link: linkAtt,
      photo: fotoAtt,
      status: statusAtt,
      price: precoAtt,
    });
    // código para enviar dados para o servidor
  };

  const handleTituloChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTituloAtt(event.target.value);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkAtt(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<{ value: unknown }>) => {
    setStatusAtt(event.target.value as string);
  };

  const handlePrecoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    if (valor.match(/\.00$/)) {
      // verifica se o valor termina com .00
      const numero = parseFloat(valor.replace(/\.00$/, ".01")); // altera para .01
      setPrecoAtt(numero);
    } else {
      const numero = parseFloat(
        valor.replace(/[^\d.,]/g, "").replace(",", ".")
      );
      setPrecoAtt(numero);
    }
  };

  const handleFotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFotoAtt(event.target.value);
  };

  return (
    <div
      className={classNames({
        [estilos.formularioAtualiza__ativo]: showFormAtualiza,
        [estilos.formularioAtualiza__desativado]: !showFormAtualiza,
      })}
    >
      <form onSubmit={handleSubmit} className={estilos.formularioConteiner}>
        <AiOutlineCloseCircle
          className={estilos.formularioClose}
          onClick={() => setShowFormAtualiza(false)}
        />
        <h1 className={estilos.formularioTitulo}>ATUALIZAR PRESENTES</h1>
        <label className={estilos.formularioTitulos}>
          Título:
          <input
            className={estilos.formularioInputs}
            type="text"
            value={tituloAtt}
            onChange={handleTituloChange}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Link:
          <input
            className={estilos.formularioInputs}
            value={linkAtt}
            type="text"
            onChange={handleLinkChange}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Status:
          <select
            className={estilos.formularioInputs}
            value={statusAtt}
            onChange={handleStatusChange}
          >
            <option value="disponivel">Disponível</option>
            <option value="indisponivel">Indisponível</option>
          </select>
        </label>
        <label className={estilos.formularioTitulos}>
          Preço:
          <Input
            value={precoAtt}
            type="number"
            defaultValue={precoAtt}
            onChange={handlePrecoChange}
            slotProps={{
              input: {
                min: 0,
                max: 1000000,
                step: 0.01,
              },
            }}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Foto:
          <input
            className={estilos.formularioInputs}
            value={fotoAtt}
            type="text"
            onChange={handleFotoChange}
          />
        </label>

        <Button variant="contained" type="submit">
          Atualizar Presente
        </Button>
      </form>
    </div>
  );
}
