import estilos from "./Buscador.module.scss";
import {CiSearch} from "react-icons/ci";

interface Props {
  busca: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
}

export default function Buscador(props: Props) {
  const { busca, setBusca } = props;
  return (
    <div className={estilos.buscador}>
      <div className={estilos.buscador__icon__conteiner}>
        <CiSearch  className={estilos.buscador__icon__conteiner__icon}/>
      </div>
      <input
        className={estilos.buscador__input}
        value={busca}
        onChange={evento => setBusca(evento.target.value)}
        placeholder="Pesquisar..."
      />
      {/* aqui é o esquema dos favoritos */}
    </div>
  );
}
