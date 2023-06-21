import axios from "axios";
import { useEffect, useState } from "react";
import { IPresencas } from "../../interfaces/IPresencas";
import estilos from "./GerenciarPresentesRecebidos.module.scss";
import {
  Button,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import { GoVerified } from "react-icons/go";
import { IEscolhidos } from "../../interfaces/IEscolhidos";
import { server } from "../../config/server";

export default function GerenciarPresentesRecebidos() {
  const [escolhidos, setEscolhidos] = useState<IEscolhidos[]>([]);

  useEffect(() => {
    axios
      .get<IEscolhidos[]>("https://cvtrsy.online/escolhidos")
      .then((resposta) => {
        setEscolhidos(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);
  return (
    <div className={estilos.conteiner}>
      <h1 className={estilos.titulo}>LISTA DE PRESENTES ESCOLHIDOS</h1>
      <TableContainer
        style={{ width: "100%", maxWidth: "800px", border: "1px solid #ddd" }}
      >
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
                Nome
              </TableCell>
              <TableCell padding="none" sx={{ width: 300 }}>
                Telefone
              </TableCell>
              <TableCell padding="none" sx={{ width: 300 }}>
                Email
              </TableCell>
              <TableCell padding="none" sx={{ width: 300 }}>
                Presente
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {escolhidos.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell padding="none">{item.nome} </TableCell>
                <TableCell padding="none"> {item.telefone}</TableCell>
                <TableCell padding="none">{item.email}</TableCell>
                <TableCell padding="none">{item.presente}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
