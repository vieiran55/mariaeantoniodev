import Button from "@mui/material/Button";
import estilos from "./AtualizaPresenca.module.scss";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Input from "@mui/joy/Input";
import { ChangeEvent, useState } from "react";
import { server } from "../../../config/server";

export interface Opcoes {
  nome: string;
  qtd: number;
  pessoas: string[];
  confirmado: boolean;
}

interface Props {
  showFormPresAtualiza: boolean;
  setShowFormPresAtualiza: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  nome: string;
  qtd: number;
  pessoas: string[];
  confirmado: boolean;
}

export default function AtualizaPresenca(props: Props) {
  const {
    showFormPresAtualiza,
    setShowFormPresAtualiza,
    nome,
    qtd,
    pessoas,
    confirmado,
    id,
  } = props;

  const [nomeAtt, setNomeAtt] = useState(nome);
  const [qtdAtt, setQtdAtt] = useState(qtd);
  const [pessoasAtt, setPessoasAtt] = useState<string[]>(pessoas);
  const [confirmAtt, setConfirmAtt] = useState(confirmado);

  const atualizarDados = async (id: number, dados: Opcoes) => {
    try {
      const response = await axios.put(
        `https://cvtrsy.online/convidados/${id}`,
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
    atualizarDados((id), {
      nome: nomeAtt,
      qtd: qtdAtt,
      pessoas: pessoasAtt,
      confirmado: confirmAtt,
    });
    //código para enviar dados para o servidor
  };

  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomeAtt(event.target.value);
  };

  const handleQtdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(event.target.value);
    setQtdAtt(valor);
  };

  const handlePessoasChange = (event: ChangeEvent<{ value: unknown }>) => {
    const valor = event.target.value as string[];
    setPessoasAtt(valor);
  };

  const handleConfirmChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const valor = event.target.value === "true" ;
    setConfirmAtt(valor);
  };
  return (
    <div
      className={classNames({
        [estilos.formularioAtualiza__ativo]: showFormPresAtualiza,
        [estilos.formularioAtualiza__desativado]: !showFormPresAtualiza,
      })}
    >
      <form onSubmit={handleSubmit} className={estilos.formularioConteiner}>
        <AiOutlineCloseCircle
          className={estilos.formularioClose}
          onClick={() => setShowFormPresAtualiza(false)}
        />
        <h1 className={estilos.formularioTitulo}>ATUALIZAR LISTA DE CONVIDADOS</h1>
        <label className={estilos.formularioTitulos}>
          id
          <input
            className={estilos.formularioInputs}
            type="text"
            value={id}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Nome
          <input
            className={estilos.formularioInputs}
            type="text"
            value={nomeAtt}
            onChange={handleNomeChange}
          />
        </label>
        <label className={estilos.formularioTitulos}>
          Qtd
          <Input
            value={qtdAtt}
            type="number"
            defaultValue={qtdAtt}
            onChange={handleQtdChange}
            slotProps={{
              input: {
                min: 0,
                max: 1000000,
                step: 0.1,
              },
            }}
          />
          <label className={estilos.formularioTitulos}>
            Pessoas
            <input
              className={estilos.formularioInputs}
              value={pessoasAtt}
              type="text"
              onChange={handlePessoasChange}
            />
          </label>
          <label className={estilos.formularioTitulos}>
            Status de Confirmação
            <select
              className={estilos.formularioInputs}
              value={confirmAtt !== undefined ? confirmAtt.toString() : ""}
              onChange={handleConfirmChange}
            >
              <option value={"true"}>Confirmado</option>
              <option value="false">Não Confirmado</option>
            </select>
          </label>
        </label>
        <Button variant="contained" type="submit">
          Atualizar Presente
        </Button>
      </form>
    </div>
  );
}
