import Button from "@mui/material/Button";
import React, { useState, ChangeEvent } from "react";
import estilos from "./NovoPresente.module.scss";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "@mui/joy/Input";
import { server } from "../../../config/server";

export interface Opcoes {
  title: string;
  link: string;
  photo: string;
  status: string;
  price: number;
}

interface Props {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NovoPresente(props: Props) {
  const { showForm, setShowForm } = props;

  
  const enviarDados = async (dados: Opcoes) => {
    try {
      const response = await axios.post(
        "https://cvtrsy.online/listadepresentes",
        dados
      );
      console.log(response.data);
      verificarSucesso();
      // setTimeout(refresh, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("disponivel");
  const [preco, setPreco] = useState<number>(0);
  const [foto, setFoto] = useState("");

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
    console.log("Valores capturados:", titulo, link, status, preco, foto);
    event.preventDefault();
    enviarDados({
      title: titulo,
      link: link,
      photo: foto,
      status: status,
      price: preco,
    });
    // código para enviar dados para o servidor
  };

  const handleTituloChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
  };

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const handlePrecoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value;
    const numero = parseFloat(valor.replace(/[^\d.,]/g, "").replace(",", "."));
    setPreco(numero);
  };

  const handleFotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFoto(event.target.value);
  };

  return (
    <div
      className={classNames({
        [estilos.formulario__ativo]: showForm,
        [estilos.formulario__desativado]: !showForm,
      })}
    >
      <form onSubmit={handleSubmit} className={estilos.formularioConteiner}>
        <AiOutlineCloseCircle
          className={estilos.formularioClose}
          onClick={() => setShowForm(false)}
        />
        <h1 className={estilos.formularioTitulo}>ADICIONAR NOVO PRESENTE</h1>
        <label htmlFor="preco">Preço:</label>

        <label className={estilos.formularioTitulos}>
          Título:
          <input
            className={estilos.formularioInputs}
            type="text"
            value={titulo}
            onChange={handleTituloChange}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Link:
          <input
            className={estilos.formularioInputs}
            type="text"
            value={link}
            onChange={handleLinkChange}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Status:
          <select
            className={estilos.formularioInputs}
            value={status}
            onChange={handleStatusChange}
          >
            <option value="disponivel">Disponível</option>
            <option value="indisponivel">Indisponível</option>
          </select>
        </label>
        <label className={estilos.formularioTitulos}>
          Preço:
          <Input
            value={preco}
            onChange={handlePrecoChange}
            type="number"
            defaultValue={preco}
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
            type="file"
            value={foto}
            onChange={handleFotoChange}
          />
        </label>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
}
