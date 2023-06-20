import axios from "axios";
import { useState, useEffect } from "react";
import { IPresencas } from "../../interfaces/IPresencas";
import estilos from "./GerenciarPresencas.module.scss";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GoVerified } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import NovoPresenca from "./NovoPresenca";
import DeletePresenca from "./DeletePresenca";
import AtualizaPresenca from "./AtualizaPresenca";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { server } from "../../config/server";

export default function GerecniarPresencas() {
  const [convidados, setConvidados] = useState<IPresencas[]>([]);
  const [showFormPres, setShowFormPres] = useState(false);
  const [showFormPresDelete, setShowFormPresDelete] = useState(false);
  const [showFormPresAtualiza, setShowFormPresAtualiza] = useState(false);
  const [nomeFormPres, setNomeFormPres] = useState("");
  const [qtdFormPres, setQtdFormPres] = useState(0);
  const [pessoasFormPres, setPessoasFormPres] = useState<string[]>([]);
  const [confirmadoFormPres, setConfirmadoFormPres] = useState(false);
  const [idFormPres, setIdFormPres] = useState(0);

  useEffect(() => {
    axios
      .get<IPresencas[]>("https://cvtrsy.online/convidados")
      .then((resposta) => {
        setConvidados(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  function limitarTexto(texto: string, maxChars: number): string {
    if (texto.length > maxChars) {
      texto = texto.substring(0, maxChars) + "...";
    }
    return texto;
  }

  const somaQtd = convidados.reduce(
    (acumulador, objeto) => acumulador + objeto.qtd,
    0
  );

  return (
    <>
      <div className={estilos.conteiner}>
        {showFormPres && (
          <NovoPresenca
            showFormPres={showFormPres}
            setShowFormPres={setShowFormPres}
          />
        )}
        {showFormPresDelete && (
          <DeletePresenca
            showFormPresDelete={showFormPresDelete}
            setShowFormPresDelete={setShowFormPresDelete}
            nome={nomeFormPres}
            qtd={qtdFormPres}
            pessoas={pessoasFormPres}
            confirmado={confirmadoFormPres}
            id={idFormPres}
          />
        )}
        {showFormPresAtualiza && (
          <AtualizaPresenca
            showFormPresAtualiza={showFormPresAtualiza}
            setShowFormPresAtualiza={setShowFormPresAtualiza}
            nome={nomeFormPres}
            qtd={qtdFormPres}
            pessoas={pessoasFormPres}
            confirmado={confirmadoFormPres}
            id={idFormPres}
          />
        )}
        <h1 className={estilos.titulo}>LISTA DE CONVIDADOS</h1>
        <div className={estilos.botaoAdicionar}>
          <Button variant="contained" onClick={() => setShowFormPres(true)}>
            Adicionar Convidado
          </Button>
          <h2>Quantidade Total: {somaQtd}</h2>
        </div>
        <TableContainer style={{ width: "100%", border: "1px solid #ddd" }}>
          <Table
            size="medium"
            stickyHeader
            padding="none"
            component={Paper}
            aria-label="Exemplo de tabela"
          >
            <TableHead style={{ border: "1px solid #ddd" }}>
              <TableRow>
                <TableCell padding="none" sx={{ width: 50 }}>
                  ID
                </TableCell>
                <TableCell padding="none" sx={{ width: 300 }}>
                  Nome
                </TableCell>
                <TableCell padding="none" sx={{ width: 300 }}>
                  Quantidade de Pessoas
                </TableCell>
                <TableCell padding="none" sx={{ width: 300 }}>
                  Pessoas
                </TableCell>
                <TableCell padding="none" sx={{ width: 130 }}>
                  Confirmado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {convidados
                .sort((a, b) => {
                  if (a.confirmado && !b.confirmado) {
                    return -1;
                  } else if (!a.confirmado && b.confirmado) {
                    return 1;
                  } else {
                    return 0;
                  }
                })
                .map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      padding="none"
                      sx={{ width: 200, whiteSpace: "normal" }}
                    >
                      {item._id}{" "}
                    </TableCell>
                    <TableCell
                      padding="none"
                      sx={{ width: 200, whiteSpace: "normal" }}
                    >
                      {limitarTexto(item.nome, 50)}{" "}
                    </TableCell>
                    <TableCell
                      padding="none"
                      sx={{ width: 200, whiteSpace: "normal" }}
                    >
                      {item.qtd}
                    </TableCell>
                    <TableCell
                      padding="none"
                      sx={{ width: 200, whiteSpace: "normal" }}
                    >
                      {item.pessoas.map((item, index) => (
                        <ol key={index}>
                          <li>-{item}</li>
                        </ol>
                      ))}
                    </TableCell>
                    <TableCell
                      padding="none"
                      sx={{ width: 200, whiteSpace: "normal" }}
                    >
                      {" "}
                      {item.confirmado && (
                        <GoVerified className={estilos.confirmado} />
                      )}
                    </TableCell>
                    <TableCell
                      padding="none"
                      sx={{ width: 200, whiteSpace: "normal" }}
                    >
                      {" "}
                      <Stack spacing={1} sx={{ width: 1, py: 1 }}>
                        <div className={estilos.botoesLista}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => {
                              setShowFormPresAtualiza(true);
                              setNomeFormPres(item.nome);
                              setQtdFormPres(item.qtd);
                              setPessoasFormPres(item.pessoas);
                              setConfirmadoFormPres(item.confirmado);
                              setIdFormPres(item._id);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DeleteIcon />}
                            // onClick={() => deletarDados(item._id)}
                            onClick={() => {
                              setShowFormPresDelete(true);
                              setNomeFormPres(item.nome);
                              setQtdFormPres(item.qtd);
                              setPessoasFormPres(item.pessoas);
                              setConfirmadoFormPres(item.confirmado);
                              setIdFormPres(item._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
