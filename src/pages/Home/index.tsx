import foto from "../../images/FotoPerfilClean.png";
import wave from "../../images/waveWhite.svg";
import estilos from "./Home1.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import fotoCasal from "../../images/casalPorDoSol.png";
import fotoCasal1 from "../../images/casa1.png";
import fotoCasal2 from "../../images/casal2.png";
import fotoCasal3 from "../../images/casal3.png";
import fotoCasal4 from "../../images/casal4.png";
import { useInView } from "react-intersection-observer";

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
        <div className={estilos.central__cartaoBotoes}>
          <div className={estilos.central__cartaoBotoes__confirma}>
            <Button variant="contained" onClick={() => navigate("/presenca")}>
              Confirmar Presenca
            </Button>
          </div>
          <div className={estilos.central__cartaoBotoes__Lista}>
            <Button variant="contained" onClick={() => navigate("/lista")}>
              Lista de Presentes
            </Button>
          </div>
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
                src={fotoCasal}
                alt={fotoCasal}
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
        <div ref={ref} className={`${inView ? estilos.sobre : estilos.sobre2}`}>
          <h2 className={estilos.sobre__titulo}>O grande dia está chegando!</h2>
          <div className={estilos.sobre__conteinerTextos}>
            <div className={estilos.sobre__conteinerTextosEsquerd}>
              <p className={estilos.sobre__texto}>
                É com grande alegria e emoção que convidamos todos vocês para
                celebrar conosco o dia mais especial de nossas vidas: nosso
                casamento! Neste dia tão significativo, uniremos nossos corações e
                juraremos amor eterno um ao outro. Será um momento repleto de amor,
                felicidade e promessas para o futuro que desejamos construir juntos.
                A cerimônia acontecerá no dia{" "}
                <a className={estilos.sobre__destaque}>
                  {" "}
                  23 de Setembro de 2023, às 16h00
                </a>
                , seguida por uma recepção cheia de alegria e comemoração, a partir
                das <a className={estilos.sobre__destaque}>18h00</a>. Estamos
                ansiosos para compartilhar esses momentos inesquecíveis com todos
                aqueles que são especiais em nossas vidas.
              </p>
            </div>
            <div className={estilos.sobre__conteinerTextosDireita}>
              <p className={estilos.sobre__texto}>
                Pedimos a gentileza de confirmar sua presença até o dia{" "}
                <a className={estilos.sobre__destaque}>22 de Setembro de 2023</a>,
                para que possamos organizar cada detalhe com muito carinho. Por
                favor, acesse o link abaixo para confirmar sua presença:
              </p>

              <Button variant="contained" onClick={() => navigate("/presenca")}>
                Confirmar Presenca
              </Button>

              <p className={estilos.sobre__texto}>
                Além disso, criamos uma lista de presentes com muito amor e cuidado,
                contendo itens que nos ajudarão a iniciar nossa nova jornada juntos.
                Se desejar nos presentear, você pode acessar nossa lista de
                presentes no link abaixo:
              </p>
              <Button variant="contained" onClick={() => navigate("/lista")}>
                Lista de Presentes
              </Button>
            </div>

          </div>

        </div>
      </div>

      <div className="bg-gold">
        <div
          ref={ref2}
          className={`${inView2 ? estilos.galeria : estilos.galeria2}`}
        >
          <h1 className={estilos.galeria__titulo}>
            O amor é o laço que nos une para sempre.
          </h1>
          <div className={estilos.galeria__fotos}>
            <img
              src={fotoCasal1}
              alt={fotoCasal1}
              className={estilos.galeria__fotos__images}
            />
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
              src={fotoCasal4}
              alt={fotoCasal4}
              className={estilos.galeria__fotos__images}
            />
          </div>
        </div>
      </div>
    </>
  );
}
