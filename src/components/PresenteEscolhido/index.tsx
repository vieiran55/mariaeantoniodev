import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import estilos from "./PresenteEscolhido.module.scss";
import { useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";

interface FormData {
  nome: string;
  telefone: number;
  email: string;
  presente: string;
}

export interface Opcoes {
  status: string;
}

interface Props {
  nomePresenteEscolhido: string;
  setNomePresenteEscolhido: React.Dispatch<React.SetStateAction<string>>;
  showPresenteEscolhido: boolean;
  setShowPresenteEscolhido: React.Dispatch<React.SetStateAction<boolean>>;
  idPresenteEscolhido: number;
  setIdPresenteEscolhido: React.Dispatch<React.SetStateAction<number>>;
}

export default function PresenteEscolhido(props: Props) {
  const {
    nomePresenteEscolhido,
    setNomePresenteEscolhido,
    showPresenteEscolhido,
    setShowPresenteEscolhido,
    idPresenteEscolhido,
    setIdPresenteEscolhido,
  } = props;

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: 0,
    email: "",
    presente: "",
  });

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [presente, setPresente] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log("Valores capturados:", titulo, link, status, preco, foto);
    event.preventDefault();

    // Verifica se algum campo está vazio
    // Verifica se algum campo está vazio
    if (nome.trim() === "" || telefone.trim() === "" || email.trim() === "") {
      setFormSubmitted(true);
      return;
    }
    // enviarDados({
    //   nome: nome,
    //   telefone: parseFloat(telefone),
    //   email: email,
    //   presente: nomePresenteEscolhido,
    // });
    // //código para enviar dados para o servidor
    // atualizarDados(idPresenteEscolhido, {
    //   status: "indisponivel",
    // });

    const destinatario = email; // Substitua pelo endereço de email desejado
    const assunto = "CONFIRMAÇÃO DE PRESENTE ESCOLHIDO";
    const corpo = `Olá ${nome} Obrigado por escolher ${nomePresenteEscolhido} `;

    axios
      .get("https://cvtrsy.online/enviar-email", {
        params: {
          destinatario,
          assunto,
          corpo,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Lógica adicional após o envio do email com sucesso
      })
      .catch((error) => {
        console.error("Erro ao enviar o email:", error);
        // Lógica de tratamento de erro
      });
  };

  const enviarEmail = (dados: FormData) => {
    const destinatario = email; // Substitua pelo endereço de email desejado
    const assunto = "CONFIRMAÇÃO DE PRESENTE ESCOLHIDO";
    const corpo = `Obrigado por escolher ${nomePresenteEscolhido}`;

    axios
      .get("https://cvtrsy.online/enviar-email", {
        params: {
          destinatario,
          assunto,
          corpo,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Lógica adicional após o envio do email com sucesso
      })
      .catch((error) => {
        console.error("Erro ao enviar o email:", error);
        // Lógica de tratamento de erro
      });
  };

  const enviarDados = async (dados: FormData) => {
    try {
      const response = await axios.post(
        "https://cvtrsy.online/escolhidos",
        dados
      );
      console.log(response.data);
      verificarSucesso();
      // setTimeout(refresh, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const verificarSucesso = () => {
    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: "Presente reservado com sucesso!",
    }).then(() => {
      navigate("/");
      setShowPresenteEscolhido(false);
    });
  };

  const refresh = () => {
    window.location.reload();
  };

  const atualizarDados = async (id: number, dados: Opcoes) => {
    try {
      const response = await axios.put(
        `https://cvtrsy.online/listadepresentes/${id}`,
        dados
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <form className={estilos.formulario} onSubmit={handleSubmit}>
        <div className={estilos.corpo__grid__item__acoes}>
          <Link className={estilos.corpo__grid__item__acoes__link} to={"link"}>
            Quero Comprar e entregar para os noivos
          </Link>
          <Link className={estilos.corpo__grid__item__acoes__pix} to={"pix"}>
            Quero Fazer o Pix do valor para que os noivos comprem
          </Link>
        </div>
        <div className={estilos.conteiner}>
          <AiOutlineClose
            className={estilos.close}
            onClick={() => setShowPresenteEscolhido(false)}
          />
          <h1 className={estilos.titulo}>
            INSIRA SEUS DADOS PARA CONFIRMAR A ESCOLHA DO PRESENTE
          </h1>
          <TextField
            label="Digite seu Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            fullWidth
            error={formSubmitted && nome.trim() === ""}
            helperText={
              formSubmitted && nome.trim() === "" ? "Digite seu nome" : ""
            }
            margin="normal"
          />
          <TextField
            label="Digite seu Telefone"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            fullWidth
            error={formSubmitted && telefone.trim() === ""}
            helperText={
              formSubmitted && telefone.trim() === ""
                ? "Digite seu telefone"
                : ""
            }
            margin="normal"
          />
          <TextField
            label="Digite seu Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            type="email"
            error={formSubmitted && email.trim() === ""}
            helperText={
              formSubmitted && email.trim() === "" ? "Digite seu email" : ""
            }
            margin="normal"
          />
          <TextField
            label="Presente escolhido"
            value={nomePresenteEscolhido}
            onChange={(event) => setPresente(event.target.value)}
            fullWidth
            margin="normal"
            disabled
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
          <Button variant="contained" type="submit">Enviar Email</Button>
        </div>
      </form>
    </>
  );
}
