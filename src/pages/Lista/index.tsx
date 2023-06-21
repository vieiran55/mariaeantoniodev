import Atencao from "../../components/Atencao";
import Buscador from "../../components/Buscador";
import ListaDePresentes from "../../components/ListaDePresentes";
import estilos from "./Lista.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineGridView } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsArrowUpCircleFill } from "react-icons/bs";
import Repositorio from "../../components/Repositorio";
import { IOpcoes } from "../../interfaces/IOpcoes";
import PresenteEscolhido from "../../components/PresenteEscolhido";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
  repositorio: IOpcoes[];
  setRepositorio: React.Dispatch<React.SetStateAction<IOpcoes[]>>;
  showPresenteEscolhido: boolean;
  setShowPresenteEscolhido: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Lista(props: Props) {
  const {
    open,
    setOpen,
    busca,
    setBusca,
    repositorio,
    setRepositorio,
    showPresenteEscolhido,
    setShowPresenteEscolhido,
  } = props;
  const [gridCss, setGridCss] = useState(true);
  const [listaCss, setListaCss] = useState(false);
  const [showLista, setShowLista] = useState(false);
  const [nomePresenteEscolhido, setNomePresenteEscolhido] = useState("");
  const [idPresenteEscolhido, setIdPresenteEscolhido] = useState(0);

  const navigate = useNavigate();
  const topo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handClickLista = () => {
    setGridCss(false);
    setListaCss(true);
  };
  const handClickGrid = () => {
    setGridCss(true);
    setListaCss(false);
  };
  const classIconGrid = classNames({
    [estilos.modoDeVizualizacao__iconGrid]: gridCss,
    [estilos.modoDeVizualizacao__iconList]: listaCss,
  });
  const classIconList = classNames({
    [estilos.modoDeVizualizacao__iconGrid]: listaCss,
    [estilos.modoDeVizualizacao__iconList]: gridCss,
  });

  return (
    <div className={estilos.corpo}>
      <Atencao
        showLista={showLista}
        setShowLista={setShowLista}
        open={open}
        setOpen={setOpen}
      />
      <h1 className={estilos.corpo__casal} onClick={() => navigate("/")}>
        Gabriela e Antonio
      </h1>
      {showPresenteEscolhido && (
        <PresenteEscolhido
          nomePresenteEscolhido={nomePresenteEscolhido}
          setNomePresenteEscolhido={setNomePresenteEscolhido}
          showPresenteEscolhido={showPresenteEscolhido}
          setShowPresenteEscolhido={setShowPresenteEscolhido}
          idPresenteEscolhido={idPresenteEscolhido}
          setIdPresenteEscolhido={setIdPresenteEscolhido}
        />
      )}
      {!showPresenteEscolhido && (
        <>
          <h2 className={estilos.corpo__titulo}>LISTA DE PRESENTES</h2>
          <div className={classNames({ [estilos.modoDeVizualizacao]: true })}>
            <Buscador busca={busca} setBusca={setBusca} />
            <MdOutlineGridView
              className={classIconGrid}
              onClick={handClickGrid}
            />
            <AiOutlineUnorderedList
              className={classIconList}
              onClick={handClickLista}
            />
          </div>
          <Repositorio
            repositorio={repositorio}
            setRepositorio={setRepositorio}
          />
          <ListaDePresentes
            open={open}
            setOpen={setOpen}
            busca={busca}
            setBusca={setBusca}
            gridCss={gridCss}
            setGridCss={setGridCss}
            listaCss={listaCss}
            setListaCss={setListaCss}
            showLista={showLista}
            setShowLista={setShowLista}
            repositorio={repositorio}
            nomePresenteEscolhido={nomePresenteEscolhido}
            setNomePresenteEscolhido={setNomePresenteEscolhido}
            showPresenteEscolhido={showPresenteEscolhido}
            setShowPresenteEscolhido={setShowPresenteEscolhido}
            idPresenteEscolhido={idPresenteEscolhido}
            setIdPresenteEscolhido={setIdPresenteEscolhido}
          />
          <button className={estilos.botoes__tipo__up} onClick={topo}>
            <BsArrowUpCircleFill />
            VOLTAR AO TOPO
          </button>
        </>
      )}
    </div>
  );
}
