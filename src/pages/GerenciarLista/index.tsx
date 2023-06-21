import Repositorio from "../../components/Repositorio";
import { IOpcoes } from "../../interfaces/IOpcoes";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import estilos from "./GerenciarLista.module.scss";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import NovoPresente from "./NovoPresente";
import DeletePresente from "./DeletePresente";
import AtualizaPresente from "./AtualizaPresente";
import { server } from "../../config/server";

interface Props {
  repositorio: IOpcoes[];
  setRepositorio: React.Dispatch<React.SetStateAction<IOpcoes[]>>;
}

export default function GerenciarLista(props: Props) {
  const { repositorio, setRepositorio } = props;

  const [tituloForm, setTituloForm] = useState("");
  const [linkForm, setLinkForm] = useState("");
  const [statusForm, setStatusForm] = useState("");
  const [precoForm, setPrecoForm] = useState(0);
  const [fotoForm, setFotoForm] = useState("");
  const [idForm, setIdForm] = useState(0);
  const [listaPresentes, setListaPresentes] = useState<IOpcoes[]>([]);

  function limitarTexto(texto: string, maxChars: number): string {
    if (texto?.length > maxChars) {
      texto = texto?.substring(0, maxChars) + "...";
    }
    return texto;
  }

  const [showForm, setShowForm] = useState(false);
  const [showFormDelete, setShowFormDelete] = useState(false);
  const [showFormAtualiza, setShowFormAtualiza] = useState(false);

  useEffect(() => {
    axios
      .get<IOpcoes[]>("https://cvtrsy.online/listadepresentes")
      .then((resposta) => {
        setListaPresentes(resposta.data);
        console.log(listaPresentes);
        console.log("estou em repositorio");
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <>
      {/* <Repositorio repositorio={repositorio} setRepositorio={setRepositorio} /> */}
      <div className={estilos.conteiner}>
        {showForm && (
          <NovoPresente showForm={showForm} setShowForm={setShowForm} />
        )}
        {showFormDelete && (
          <DeletePresente
            showFormDelete={showFormDelete}
            setShowFormDelete={setShowFormDelete}
            title={tituloForm}
            link={linkForm}
            photo={fotoForm}
            status={statusForm}
            id={idForm}
          />
        )}
        {showFormAtualiza && (
          <AtualizaPresente
            showFormAtualiza={showFormAtualiza}
            setShowFormAtualiza={setShowFormAtualiza}
            title={tituloForm}
            link={linkForm}
            photo={fotoForm}
            status={statusForm}
            id={idForm}
            price={precoForm}
          />
        )}
        <h1 className={estilos.titulo}>LISTA DE PRESENTES</h1>
        <div className={estilos.botaoAdicionar}>
          <Button variant="contained" onClick={() => setShowForm(true)}>
            Adicionar Presente
          </Button>
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
                <TableCell padding="none" sx={{ width: 100, maxWidth: 300 }}>
                  Titulo
                </TableCell>
                <TableCell padding="none" sx={{ width: 700 }}>
                  Link
                </TableCell>
                <TableCell padding="none" sx={{ width: 300 }}>
                  Foto
                </TableCell>
                <TableCell padding="none" sx={{ width: 130 }}>
                  Status
                </TableCell>
                <TableCell padding="none" sx={{ width: 130 }}>
                  Preço
                </TableCell>
                <TableCell padding="none" sx={{ width: 130 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaPresentes.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    padding="none"
                    sx={{ width: 100, whiteSpace: "normal" }}
                  >
                    {item._id}{" "}
                  </TableCell>
                  <TableCell
                    padding="none"
                    sx={{ width: 300, whiteSpace: "normal", wordBreak: "break-all" }}
                  >
                    {limitarTexto(item.title, 500)}
                  </TableCell>
                  <TableCell
                    padding="none"
                    sx={{ width: 300, whiteSpace: "normal", wordBreak: "break-all" }}
                  >
                    {limitarTexto(item.link, 500)}
                  </TableCell>
                  <TableCell
                    padding="none"
                    sx={{ width: 300, whiteSpace: "normal", wordBreak: "break-all" }}
                  >
                    {limitarTexto(item.photo, 50)}{" "}
                  </TableCell>
                  <TableCell
                    padding="none"
                    sx={{ width: 100, whiteSpace: "normal", wordBreak: "break-all" }}
                  >
                    {" "}
                    {item.status}
                  </TableCell>
                  <TableCell
                    padding="none"
                    sx={{ width: 100, whiteSpace: "normal", wordBreak: "break-all" }}
                  >
                    {" "}
                    {item.price}
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
                            setShowFormAtualiza(true);
                            setTituloForm(item.title);
                            setLinkForm(item.link);
                            setStatusForm(item.status);
                            setPrecoForm(item.price);
                            setFotoForm(item.photo);
                            setIdForm(item._id);
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
                            setShowFormDelete(true);
                            setTituloForm(item.title);
                            setLinkForm(item.link);
                            setStatusForm(item.status);
                            setPrecoForm(item.price);
                            setFotoForm(item.photo);
                            setIdForm(item._id);
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
