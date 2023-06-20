import Button from "@mui/material/Button";
import React, { useState, ChangeEvent } from "react";
import estilos from "./NovoPresenca.module.scss";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "@mui/joy/Input";
import { server } from "../../../config/server";

export interface Opcoes {
  nome: string;
  qtd: number;
  pessoas: string[];
  confirmado: boolean;
}

interface Props {
  showFormPres: boolean;
  setShowFormPres: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NovoPresenca(props: Props) {
  const { showFormPres, setShowFormPres } = props;

  const enviarDados = async (dados: Opcoes) => {
    try {
      const response = await axios.post(
        "https://cvtrsy.online/convidados",
        dados
      );
      console.log(response.data);
      verificarSucesso();
      setTimeout(refresh, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const [nome, setNome] = useState("");
  const [qtd, setQtd] = useState(0);
  const [pessoas, setPessoas] = useState<string[]>([]);
  const [confirm, setConfirm] = useState(false);

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
    // console.log("Valores capturados:", titulo, link, status, preco, foto);
    event.preventDefault();
    enviarDados({
      nome: nome,
      qtd: qtd,
      pessoas: pessoas,
      confirmado: confirm,
    });
    // código para enviar dados para o servidor
  };

  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleQtdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(event.target.value);
    setQtd(valor);
  };
  const handlePessoasChange = (event: ChangeEvent<{ value: unknown }>) => {
    const valor = event.target.value as string[];
    setPessoas(valor);
  };

  const handleConfirmChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const valor = event.target.value === "true";
    setConfirm(valor);
  };

  return (
    <div
      className={classNames({
        [estilos.formulario__ativo]: showFormPres,
        [estilos.formulario__desativado]: !showFormPres,
      })}
    >
      <form onSubmit={handleSubmit} className={estilos.formularioConteiner}>
        <AiOutlineCloseCircle
          className={estilos.formularioClose}
          onClick={() => setShowFormPres(false)}
        />
        <h1 className={estilos.formularioTitulo}>ADICIONAR NOVO CONVIDADO</h1>
        <label className={estilos.formularioTitulos}>
          Nome:
          <input
            className={estilos.formularioInputs}
            type="text"
            value={nome}
            onChange={handleNomeChange}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Qtd
          <Input
            value={qtd}
            type="number"
            onChange={handleQtdChange}
            slotProps={{
              input: {
                min: 0,
                max: 1000000,
                step: 0.1,
              },
            }}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Pessoas
          <input
            className={estilos.formularioInputs}
            value={pessoas}
            type="text"
            onChange={handlePessoasChange}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Status de Confirmação
          <select
            className={estilos.formularioInputs}
            value={confirm !== undefined ? confirm.toString() : ""}
            onChange={handleConfirmChange}
          >
            <option value={"true"}>Confirmado</option>
            <option value="false">Não Confirmado</option>
          </select>
        </label>
        <Button variant="contained" type="submit">
          Adiconar
        </Button>
      </form>
    </div>
  );
}
