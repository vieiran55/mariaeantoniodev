import estilos from "./PresencasConfirmadas.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { IPresencas } from "../../interfaces/IPresencas";
import { GoVerified } from "react-icons/go";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function PresencasConfirmadas() {
  const [convidados, setConvidados] = useState<IPresencas[]>([]);
  useEffect(() => {
    axios
      .get<IPresencas[]>("https://cvtrsy.online/convidadosma")
      .then((resposta) => {
        setConvidados(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const navigate = useNavigate();

  const somaQtd = convidados.reduce(
    (acumulador, objeto) => acumulador + objeto.qtd,
    0
  );

  return (
    <>
      <div className={estilos.lista}>
        <h1 className={estilos.lista__titulo}>LISTA DE CONVIDADOS</h1>

        <div className={estilos.lista__corpo}>
          <h2 className={estilos.lista__confirmados}>
            Total de Confirmados: {somaQtd}
          </h2>
          <div className={estilos.lista__botoes}>
            <Button
              variant="contained"
              className={estilos.lista__botoes__botoes}
            >
              <Link to={"/"}>Pagina Inicial</Link>
            </Button>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
              className={estilos.lista__botoes__botoes}
            >
              Atualizar
            </Button>
          </div>
          <table className={estilos.tabela}>
            <thead>
              <tr className={estilos.tabela__head}>
                <th className={estilos.tabela__head}>Nome</th>
                <th className={estilos.tabela__head}>Pessoas</th>
                <th className={estilos.tabela__head}>Confir</th>
                <th className={estilos.tabela__head}>Qtd</th>
              </tr>
            </thead>
            <tbody>
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
                  <tr key={index} className={estilos.tabela__body}>
                    <td className={estilos.tabela__body}>{item.nome}</td>
                    <td className={estilos.tabela__body__pessoas}>
                      {item.pessoas.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </td>
                    <td className={estilos.tabela__body}>
                      {" "}
                      {item.confirmado && (
                        <GoVerified className={estilos.confirmado} />
                      )}
                    </td>
                    <td className={estilos.tabela__body}>{item.qtd}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
