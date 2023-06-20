/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import estilos from "./Atencao.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  zIndex: "tooltip",
  textAlign: "center",
};

interface Props{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showLista: boolean;
  setShowLista: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Atencao(props: Props) {

  const {open, setOpen, showLista, setShowLista} = props;
  // const handleOpen = () => setOpen(false);
  const handleClose = () => {
    setOpen(false);
    setShowLista(true);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={estilos.caixa}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: 19 }}
          >
            Sejam bem vindos à nossa lista de presentes! 🎁
          </Typography>
          <Typography
            className={estilos.caixa__descricao}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <Typography variant="body1" className={estilos.caixa__descricao__parag} sx={{ mt: 2, mb:2 }}>
              Clicando em{" "}
              <a className={estilos.caixa__descricao__destaque}>
                "Quero comprar e entregar para os noivos"
              </a>{" "}
              você será direcionado para um site onde poderá comprar o presente
              e nos entregar pessoalmente💐
            </Typography>
            <Typography variant="body1" className={estilos.caixa__descricao__parag} sx={{ mt: 2, mb:2 }}>
              Caso queira nos presentear em dinheiro, basta clicar em{" "}
              <a className={estilos.caixa__descricao__destaque}>
                Quero fazer o pix para que os noivos comprem"
              </a>, copiar o código e em seguida deve abrir o aplicativo do seu
              banco e colar o código na opção <a className={estilos.caixa__descricao__destaque2}>Pix Copia e Cola.</a> Qualquer valor
              será muito bem utilizado 🥰
            </Typography>
            <Typography variant="body1" className={estilos.caixa__descricao__parag} sx={{ mt: 2, mb:2 }}>
              Caso já tenha escolhido o presente, clique em{" "}
              <a className={estilos.caixa__descricao__destaque}>
                "Vou dar esse presente"
              </a>{" "}
              e preencha os dados para que possamos retirar o presente da nossa
              lista 💞
            </Typography>
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
           Eu Entendi e Quero Ver a Lista
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
