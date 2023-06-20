import axios from "axios";
import { useEffect, useState } from "react";
import estilos from "./Presenca.module.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface FormValues {
  nome: string;
  qtd: number;
  pessoas: string[];
}

interface Convidado {
  _id: string;
  nome: string;
  qtd: number;
  pessoas: string[];
  confirmado: boolean;
  quantidadePessoasSelecionadas: number;
}

export default function Presenca() {
  const [convidados, setConvidados] = useState<Convidado[]>([]);
  const [nomeSelecionado, setNomeSelecionado] = useState("");
  const [convidadoSelecionado, setConvidadoSelecionado] =
    useState<Convidado | null>(null);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const [qtdPessoasAdicionais, setQtdPessoasAdicionais] = useState<number>(0);
  const [nomesPessoasAdicionais, setNomesPessoasAdicionais] = useState<
    string[]
  >([]);
  const [convidadoIdSelecionado, setConvidadoIdSelecionado] = useState("");
  const [confirmarPresenca, setConfirmarPresenca] = useState(false);
  const [campoVazio, setCampoVazio] = useState(true);
  const isNaoSelecionado = qtdPessoasAdicionais === 0;
  const isConfirmado = convidadoSelecionado?.confirmado || false;
  const [nomePessoaSelecionado, setNomePessoaSelecionado] =
    useState<string>("");

  useEffect(() => {
    axios
      .get<Convidado[]>("https://cvtrsy.online/convidados")
      .then((resposta) => {
        setConvidados(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const handleConfirmation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (convidadoIdSelecionado && convidadoSelecionado) {
      const updatedConvidado = {
        nome: convidadoSelecionado.nome,
        qtd: nomesPessoasAdicionais.length + 1,
        confirmado: true,
        pessoas: [convidadoSelecionado.pessoas[0], ...nomesPessoasAdicionais],
      };

      axios
        .put(
          `https://cvtrsy.online/convidados/${convidadoIdSelecionado}`,
          updatedConvidado
        )
        .then((response) => {
          verificarSucesso();
          console.log("Presença confirmada:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao confirmar presença:", error);
        });
    }
  };

  const navigate = useNavigate();

  const refresh = () => {
    navigate("/");
  };

  const verificarSucesso = () => {
    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: "Sua presença foi confirmada com sucesso!",
    }).then(() => {
      navigate("/");
    });
  };

  const handleNameSelect = (event: SelectChangeEvent<string>) => {
    const selectedName = event.target.value;
    setNomeSelecionado(selectedName);

    const selectedGuest =
      convidados.find((convidado) => convidado.nome === selectedName) || null;
    setConvidadoSelecionado(selectedGuest);

    if (selectedGuest) {
      setConvidadoIdSelecionado(selectedGuest._id);
      setMostrarOpcoes(true);
      setNomePessoaSelecionado(selectedGuest.pessoas[0]);
    } else {
      setConvidadoIdSelecionado("");
      setMostrarOpcoes(false);
      setNomePessoaSelecionado("");
    }
  };
  const handleChangeNome = (index: number, value: string) => {
    const nomesAtualizados = [...nomesPessoasAdicionais];
    nomesAtualizados[index] = value;
    setNomesPessoasAdicionais(nomesAtualizados);

    verificarCamposVazios();
    const algumCampoVazio = nomesAtualizados.some((nome) => nome === "");
    setCampoVazio(algumCampoVazio);
  };

  const handleChangeQtdPessoasAdicionais = (
    event: SelectChangeEvent<number>
  ) => {
    const selectedValue = Number(event.target.value);
    setQtdPessoasAdicionais(selectedValue);
    setNomesPessoasAdicionais(
      nomesPessoasAdicionais.slice(0, selectedValue - 1)
    );
  };

  const verificarCamposVazios = () => {
    const algumCampoVazio = nomesPessoasAdicionais.some((nome) => nome === "");
    setCampoVazio(algumCampoVazio);
  };

  return (
    <form onSubmit={handleConfirmation} className={estilos.formulario}>
      <h1 className={estilos.formulario__titulo}>Lista de Convidados</h1>
      <FormControl sx={{ width: "300px", margin: "10px" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Selecione seu nome
        </InputLabel>
        <Select
          label="Selecione seu nome"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth-label"
          value={nomeSelecionado}
          onChange={handleNameSelect}
        >
          <MenuItem value="">Selecione...</MenuItem>

          {
            // Itera sobre a lista de convidados
            convidados
              // Ordena os convidados de acordo com a função de comparação
              .sort((a, b) => {
                // Verifica se o nome do convidado 'a' contém um sobrenome
                const aSobrenome = a.nome.includes(" ");
                // Verifica se o nome do convidado 'b' contém um sobrenome
                const bSobrenome = b.nome.includes(" ");
                // Verifica se o convidado 'a' tem sobrenome e o convidado 'b' não tem sobrenome
                if (aSobrenome && !bSobrenome) {
                  // Retorna um valor negativo para que o convidado 'a' seja classificado antes do convidado 'b'
                  return -1;
                  // Verifica se o convidado 'a' não tem sobrenome e o convidado 'b' tem sobrenome
                } else if (!aSobrenome && bSobrenome) {
                  // Retorna um valor positivo para que o convidado 'a' seja classificado depois do convidado 'b'
                  return 1;
                  // Caso contrário, ambos os convidados têm sobrenome ou não têm sobrenome
                } else {
                  // Compara os nomes dos convidados alfabeticamente usando a função localeCompare
                  return a.nome.localeCompare(b.nome);
                }
              })
              // Mapeia cada convidado para um MenuItem
              .map((convidado) => (
                <MenuItem key={convidado._id} value={convidado.nome}>
                  {convidado.nome}
                </MenuItem>
              ))
          }
        </Select>
      </FormControl>
      {mostrarOpcoes && convidadoSelecionado && !isConfirmado && (
        <div className={estilos.formulario__opcoes}>
          <h2 className={estilos.formulario__textos}>
            Olá {nomePessoaSelecionado}, precisamos saber quantas pessoas de sua
            familia irão com você ao evento.
          </h2>
          <FormControl sx={{ width: "300px", margin: "10px" }}>
            <InputLabel id="outlined-select-currency">
              Além de você, quantas pessoas irão?
            </InputLabel>
            <Select
              id="outlined-select-currency"
              labelId="outlined-select-currency"
              label="Além de você, quantas pessoas irão?"
              sx={{ width: "300px", margin: "10px" }}
              value={qtdPessoasAdicionais}
              onChange={handleChangeQtdPessoasAdicionais}
            >
              <MenuItem value={0}>Apenas Eu</MenuItem>
              <MenuItem value={2}>1 pessoa</MenuItem>
              <MenuItem value={3}>2 pessoas</MenuItem>
              <MenuItem value={4}>3 pessoas</MenuItem>
            </Select>
          </FormControl>
          {qtdPessoasAdicionais > 0 && (
            <div className={estilos.formulario__opcoes}>
              <TextField
                id="nome-pessoa-1"
                label="Nome da 1ª pessoa"
                value={convidadoSelecionado?.pessoas[0] || ""}
                disabled
                sx={{ width: "300px", margin: "10px" }}
              />
              {[...Array(qtdPessoasAdicionais - 1)].map((_, index) => (
                <TextField
                  key={index}
                  id={`nome-pessoa-${index + 2}`}
                  label={`Nome da ${index + 2}ª pessoa`}
                  value={nomesPessoasAdicionais[index] || ""}
                  onChange={(event) =>
                    handleChangeNome(index, event.target.value)
                  }
                  sx={{ width: "300px", margin: "10px" }}
                  required
                />
              ))}
            </div>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "10px" }}
            disabled={campoVazio && !isNaoSelecionado}
          >
            Confirmar Presença
          </Button>
        </div>
      )}

      {isConfirmado && (
        <div className={estilos.presenca}>
          <p>Olá {nomePessoaSelecionado}, sua presença já está confirmada!</p>
          <Button
            variant="contained"
            sx={{ margin: "50px" }}
            onClick={() => navigate("/")}
          >
            Voltar a Pagina Inicial
          </Button>
        </div>
      )}
    </form>
  );
}
