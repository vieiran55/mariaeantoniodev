import estilos from "./ListaItens.module.scss";
import estilosModoLista from "./ListaItensModoLista.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";
import classNames from "classnames";
import { IOpcoes } from "../../../interfaces/IOpcoes";
import { Button } from "@mui/material";

interface Props {
  _id: number;
  title: string;
  link: string;
  photo: string;
  status: string;
  price: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  gridCss: boolean;
  setGridCss: React.Dispatch<React.SetStateAction<boolean>>;
  listaCss: boolean;
  setListaCss: React.Dispatch<React.SetStateAction<boolean>>;
  repositorio: IOpcoes[];
  nomePresenteEscolhido: string;
  setNomePresenteEscolhido: React.Dispatch<React.SetStateAction<string>>;
  showPresenteEscolhido: boolean;
  setShowPresenteEscolhido: React.Dispatch<React.SetStateAction<boolean>>;
  idPresenteEscolhido: number;
  setIdPresenteEscolhido: React.Dispatch<React.SetStateAction<number>>;
}

export default function ListaItens(props: Props) {
  const {
    _id,
    title,
    link,
    photo,
    price,
    status,
    open,
    setOpen,
    gridCss,
    setGridCss,
    listaCss,
    setListaCss,
    repositorio,
    nomePresenteEscolhido,
    setNomePresenteEscolhido,
    showPresenteEscolhido,
    setShowPresenteEscolhido,
    idPresenteEscolhido,
    setIdPresenteEscolhido,
  } = props;
  const pix = "https://nubank.com.br/pagar/xw2h0/YToiVhZ4ZT";
  const [isShown, setIsShown] = useState(false);
  const handleOpen = () => setOpen(true);

  const classCorpo = classNames({
    [estilos[`corpo__${status}`]]: gridCss,
    [estilosModoLista[`corpo__${status}`]]: listaCss,
  });
  const classCorpoItem = classNames({
    [estilos.corpo__grid__item]: gridCss,
    [estilosModoLista.corpo__lista__item]: listaCss,
  });
  const classCorpoItemTitulo = classNames({
    [estilos.corpo__grid__item__titulo]: gridCss,
    [estilosModoLista.corpo__lista__item__titulo]: listaCss,
  });
  const classCorpoItemConteiner = classNames({
    [estilos.corpo__grid__item__conteiner]: gridCss,
    [estilosModoLista.corpo__lista__item__conteiner]: listaCss,
  });
  const classCorpoItemImagemPreco = classNames({
    [estilos.corpo__grid__item__imagemPreco]: gridCss,
    [estilosModoLista.corpo__lista__item__imagemPreco]: listaCss,
  });

  const classCorpoItemImagem = classNames({
    [estilos.corpo__grid__item__imagem]: gridCss,
    [estilosModoLista.corpo__lista__item__imagem]: listaCss,
  });
  const classCorpoItemPreco = classNames({
    [estilos.corpo__grid__item__preco]: gridCss,
    [estilosModoLista.corpo__lista__item__preco]: listaCss,
  });
  const classCorpoItemAcoes = classNames({
    [estilos.corpo__grid__item__acoes]: gridCss,
    [estilosModoLista.corpo__lista__item__acoes]: listaCss,
  });
  const classCorpoItemAcoesForm = classNames({
    [estilos.corpo__grid__item__acoes__link]: gridCss,
    [estilosModoLista.corpo__lista__item__acoes__link]: listaCss,
  });
  const classCorpoItemAcoesPix = classNames({
    [estilos.corpo__grid__item__acoes__pix]: gridCss,
    [estilosModoLista.corpo__lista__item__acoes__pix]: listaCss,
  });
  const classCorpoItemAcoesConfirmar = classNames({
    [estilos.corpo__grid__item__confirmar]: gridCss,
    [estilosModoLista.corpo__lista__item__confirmar]: listaCss,
  });
  const classCorpoItemIcon = classNames({
    [estilos.corpo__grid__item__icon]: gridCss,
    [estilosModoLista.corpo__lista__item__icon]: listaCss,
  });
  const classCorpoConteinerSelecao = classNames({
    [estilos.corpo__grid__conteinerSelecao]: gridCss,
    [estilosModoLista.corpo__lista__conteinerSelecao]: listaCss,
  });


  const handClick = () => {
    setNomePresenteEscolhido(title);
    setIdPresenteEscolhido(_id);
    setShowPresenteEscolhido(true);
    topo();
  };

  useEffect(() => {
    if (status === "disponivel") {
      setIsShown(true);
    }
  }, []);

  const topo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={classCorpo}>
      <span></span>
      <li className={classCorpoItem}>
        <BiHelpCircle className={classCorpoItemIcon} onClick={handleOpen} />
        <h1 className={classCorpoItemTitulo}>{title}</h1>
        <div className={classCorpoItemConteiner}>
          <div className={classCorpoItemImagemPreco}>
            <img className={classCorpoItemImagem} src={photo} alt={title} />
          </div>
          {isShown && (
            <div className={classCorpoItemAcoes}>
              <Link className={classCorpoItemAcoesForm} to={link}>
                Quero Comprar e entregar para os noivos
              </Link>
              <Link className={classCorpoItemAcoesPix} to={pix}>
                Quero Fazer o Pix do valor para que os noivos comprem
              </Link>
            </div>
          )}
          {/* {isShown && (
            <Link
              to={"https://form.respondi.app/LdirwZxI"}
              className={classCorpoItemAcoesConfirmar}
            >
              Vou dar esse presente
            </Link>
          )} */}
          {isShown && (
            <div className={classCorpoConteinerSelecao}>
              <h2 className={classCorpoItemPreco}>{`R$ ${price}`}</h2>
              <Button
                variant="contained"
                onClick={handClick}
                className={classCorpoItemAcoesConfirmar}
                sx={{marginTop: "10px", width: "95px"}}
              >
                Selecionar presente
              </Button>
            </div>
          )}
        </div>
      </li>
    </div>
  );
}
