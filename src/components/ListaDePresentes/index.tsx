import estilos from "./ListaDePresentes.module.scss";
import ListaItens from "./ListaItens";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { IOpcoes } from "../../interfaces/IOpcoes";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
  gridCss: boolean;
  setGridCss: React.Dispatch<React.SetStateAction<boolean>>;
  listaCss: boolean;
  setListaCss: React.Dispatch<React.SetStateAction<boolean>>;
  showLista: boolean;
  setShowLista: React.Dispatch<React.SetStateAction<boolean>>;
  repositorio: IOpcoes[];
  nomePresenteEscolhido: string;
  setNomePresenteEscolhido: React.Dispatch<React.SetStateAction<string>>;
  showPresenteEscolhido: boolean;
  setShowPresenteEscolhido: React.Dispatch<React.SetStateAction<boolean>>;
  idPresenteEscolhido: number;
  setIdPresenteEscolhido: React.Dispatch<React.SetStateAction<number>>;
}

export default function ListaDePresentes(props: Props) {
  const {
    open,
    setOpen,
    busca,
    setBusca,
    gridCss,
    setGridCss,
    listaCss,
    setListaCss,
    showLista,
    setShowLista,
    repositorio,
    nomePresenteEscolhido,
    setNomePresenteEscolhido,
    showPresenteEscolhido,
    setShowPresenteEscolhido,
    idPresenteEscolhido,
    setIdPresenteEscolhido,
  } = props;

  const [showError, setShowError] = useState(false);
  const [lista, setLista] = useState<IOpcoes[]>([]);

  function testaBusca(title: string) {
    const regex = new RegExp(busca, "i");
    return regex.test(title);
  }

  useEffect(() => {
    const novaLista = repositorio.filter((item) => testaBusca(item.title));
    setLista(novaLista);
    if (novaLista.length > 0) {
      setShowLista(true);
      setShowError(false);
    } else {
      setShowError(true);
      setShowLista(false);
    }
  }, [busca, repositorio]);

  return (
    <>
      <div className={estilos.conteiner}>
        <div
          className={classNames({
            [estilos.corpo__grade]: gridCss,
            [estilos.corpo__lista]: listaCss,
          })}
        >
          {showLista &&
            lista
              .sort((a, b) => b.price - a.price)
              .map((item) => (
                <ListaItens
                  key={item._id}
                  {...item}
                  repositorio={[]}
                  open={open}
                  setOpen={setOpen}
                  gridCss={gridCss}
                  setGridCss={setGridCss}
                  listaCss={listaCss}
                  setListaCss={setListaCss}
                  nomePresenteEscolhido={nomePresenteEscolhido}
                  setNomePresenteEscolhido={setNomePresenteEscolhido}
                  showPresenteEscolhido={showPresenteEscolhido}
                  setShowPresenteEscolhido={setShowPresenteEscolhido}
                  idPresenteEscolhido={idPresenteEscolhido}
                  setIdPresenteEscolhido={setIdPresenteEscolhido}
                />
              ))}
          {showError && <div>Item não encontrado.</div>}
        </div>
      </div>
    </>
  );
}
