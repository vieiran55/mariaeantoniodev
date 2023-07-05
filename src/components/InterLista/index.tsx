import estilos from "./InterLista.module.scss";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocument,
} from "react-icons/hi2";
import {BsFillClipboard2CheckFill, BsFillClipboard2Fill} from "react-icons/bs";

interface Props {
  showAlertList: boolean;
  setShowAlertList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InterLista(props: Props) {
  const { showAlertList, setShowAlertList } = props;
  const navigate = useNavigate();

  const handleClose = () => {
    setShowAlertList(false);
  };

  const [showPix, setShowPix] = useState(false);
  const [copiadoIcon, setCopiadoIcon] = useState(false);
  const show = true;

  const pix = "61996810919";

  const copiarPix = () => {
    navigator.clipboard
      .writeText(pix)
      .then(() => {
        console.log("Texto copiado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao copiar texto:", error);
      });
    setCopiadoIcon(true);
  };

  return (
    <div className={estilos.chamada}>
      <div className={estilos.chamada__conteiner}>
        <div className={estilos.chamada__close}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ width: "10px", height: "40px", backgroundColor: "red" }}
          >
            <AiOutlineClose className={estilos.chamada__close__icon} />
          </Button>
        </div>
        <div className={estilos.boxTexto}>
          {!showPix && (
            <div>
              <h1 className={estilos.boxTexto__titulo}>
                Algumas informaçõe sobre nossa lista de presentes!🎁
              </h1>
              Clicando em
              <a className={estilos.boxTexto__descricao__destaque}>
                LISTA DE PRESENTES
              </a>
              você será direcionado para um site onde poderá comprar o presente, mas caso queira nos presentear em
              dinheiro, basta clicar em
              <a className={estilos.boxTexto__descricao__destaque}>
                PRESENTEAR COM PIX
              </a>
              copiar o código e em seguida fazer o pix no seu aplicativo de
              banco. Qualquer valor será muito bem utilizado! 🥰
            </div>
          )}
          {showPix && (
            <div className={estilos.chamada__areaPix}>
              <h1 className={estilos.chamada__areaPix__titulo}>Dados do Pix</h1>
              <div className={estilos.chamada__areaPix__conteudo}>
                <div className={estilos.chamada__areaPix__textos}>
                  Maira Stefany Lopes de Sales Dourado
                </div>
                <div className={estilos.chamada__areaPix__textos}>
                  Caixa Econômica Federal - Poupança
                </div>
                <div className={estilos.chamada__areaPix__botoes}>
                  Pix: {pix}
                  <button
                    onClick={copiarPix}
                    className={estilos.chamada__botaoPix}
                  >
                    {!copiadoIcon && (
                      <div className={estilos.chamada__botaoPix__conteinerCopiar}>
                        Copiar
                        <BsFillClipboard2Fill className={estilos.chamada__botaoPix__iconCopiar} />
                      </div>
                    )}
                    {copiadoIcon && (
                      <div className={estilos.chamada__botaoPix__conteinerColar}>
                        Copiado!
                        <BsFillClipboard2CheckFill className={estilos.chamada__botaoPix__iconColar} />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={estilos.chamada__botoesConteiner}>
          <div className={estilos.chamada__botoes}>
            <Button variant="contained" onClick={() => setShowPix(true)}>
              Presentear com Pix
            </Button>
          </div>
          <div className={estilos.chamada__botoes}>
            <Button variant="contained">
              <Link to={"https://www.finalfeliz.de/maira-antonio23092023"}>
                Lista de Presentes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
