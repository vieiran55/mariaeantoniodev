import foto from "../../images/FotoPerfilClean.png";
import wave from "../../images/waveWhite.svg";
import estilos from "./Home1.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import fotoCasal1 from "../../images/mairaeantonio1.jpeg";
import fotoCasal2 from "../../images/mairaeantonio2.jpeg";
import fotoCasal3 from "../../images/mairaeantonio3.jpeg";
import fotoCasal4 from "../../images/mairaeantonio4.jpeg";
import fotoCasal5 from "../../images/mairaeantonio5.jpeg";
import { useInView } from "react-intersection-observer";
import NavBar from "../../components/NavBar";

export default function Home() {
  const navigate = useNavigate();
  const linkPresenca = "https://form.respondi.app/L86LWmDr";

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const [ref2, inView2] = useInView({
    threshold: 0,
  });

  return (
    <>
      <div className={estilos.central}>
        <div className={estilos.navbarhome}>
          <NavBar />
        </div>
        <div className={estilos.body}>
          <div className={estilos.entrada}>
            <div className={estilos.entrada__casalConteiner}>
              <div className={estilos.entrada__casal}>
                <h1 className={estilos.entrada__casal__titulo}>
                  Maira e Antônio
                </h1>
              </div>
              <div className={estilos.central__cartaoBotoesDesktop}>
                <div className={estilos.central__cartaoBotoesDesktop__confirma}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/presenca")}
                  >
                    Confirmar Presenca
                  </Button>
                </div>
                <div className={estilos.central__cartaoBotoesDesktop__Lista}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/lista")}
                  >
                    Lista de Presentes
                  </Button>
                </div>
              </div>
            </div>
            <div className={estilos.entrada__foto}>
              <img
                src={fotoCasal4}
                alt={fotoCasal4}
                className={estilos.entrada__foto__imagem}
              />
              <div className={estilos.entrada__cartaoInferior}>
                <h2 className={estilos.entrada__cartaoInferior__text}>
                  23|Set|23
                </h2>
              </div>
              <div className={estilos.entrada__flor4}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gold">
        <div
          id="sobre"
          ref={ref}
          className={`${inView ? estilos.sobre : estilos.sobre2}`}
        >
          <h2 className={estilos.sobre__titulo}>
            Sua presença é muito importante para nós!
          </h2>
          <div className={estilos.sobre__conteinerTextos}>
            <p className={estilos.sobre__texto}>
              Para uma melhor organização, solicitamos que confirme sua presença
              clicando no link abaixo até o dia
              <a className={estilos.sobre__destaque}> XX/XX/XX.</a>
            </p>
            <Button variant="contained" onClick={() => navigate("/presenca")}>
              Confirmar Presenca
            </Button>
            <p className={estilos.sobre__texto}>
              Nossa lista será controlada por uma equipe de assessores, contendo
              apenas os nomes das pessoas confirmadas. De acordo com as normas
              da portaria do buffet, somente os convidados presentes na lista
              terão acesso ao evento.
            </p>
            <p className={estilos.sobre__texto}>
              Ressaltamos a importância de confirmar sua presença, bem como a
              presença dos membros de sua família que irão acompanhá-lo no dia
              do evento, para que possamos ter um controle adequado. Caso não
              seja possível comparecer, compreendemos e esperamos que possamos
              marcar um encontro em breve.
            </p>
            <p className={estilos.sobre__texto}>
              Observação: A ausência de confirmação até a data estipulada
              implicará no entendimento de que não comparecerá e resultará na
              exclusão de seu nome da lista.
            </p>
            <p className={estilos.sobre__texto}>
              Além disso, criamos uma lista de presentes com muito amor e
              cuidado, contendo itens que nos ajudarão a iniciar nossa nova
              jornada juntos. Se desejar nos presentear, você pode acessar nossa
              lista de presentes no link abaixo:
            </p>
            <Button variant="contained">
              <Link to={"https://www.finalfeliz.de/maira-antonio23092023"}>
                Lista de Presentes
              </Link>
            </Button>
            <p className={estilos.sobre__textoFinal}>Com carinho,</p>
            <p className={estilos.sobre__textoFinal}>
              <a className={estilos.sobre__destaque}>MAIRA E ANTÔNIO</a>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gold">
        <div
          id="momentos"
          ref={ref2}
          className={`${inView2 ? estilos.galeria : estilos.galeria2}`}
        >
          <h1 className={estilos.galeria__titulo}>
            O amor é o laço que nos une para sempre.
          </h1>
          <div className={estilos.galeria__fotos}>
            <img
              src={fotoCasal2}
              alt={fotoCasal2}
              className={estilos.galeria__fotos__images}
            />
            <img
              src={fotoCasal3}
              alt={fotoCasal3}
              className={estilos.galeria__fotos__images}
            />
            <img
              src={fotoCasal1}
              alt={fotoCasal1}
              className={estilos.galeria__fotos__images}
            />
            <img
              src={fotoCasal5}
              alt={fotoCasal5}
              className={estilos.galeria__fotos__images}
            />
          </div>
        </div>
      </div>
    </>
  );
}
