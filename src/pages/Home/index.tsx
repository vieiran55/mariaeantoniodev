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
import InterLista from "../../components/InterLista";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const linkPresenca = "https://form.respondi.app/L86LWmDr";

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const [ref2, inView2] = useInView({
    threshold: 0,
  });

  const topo = () => {
    setShowAlertList(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [showAlertList, setShowAlertList] = useState(false);

  const show = true;

  return (
    <div>
      {showAlertList && (
        <InterLista
          showAlertList={showAlertList}
          setShowAlertList={setShowAlertList}
        />
      )}
      <div>
        <div className={estilos.central}>
          <div className={estilos.navbarhome}>
            <NavBar
              showAlertList={showAlertList}
              setShowAlertList={setShowAlertList}
            />
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
                  <div
                    className={estilos.central__cartaoBotoesDesktop__confirma}
                  >
                    <Button variant="contained">
                      <Link to={"https://form.respondi.app/QNGi0gSF"}>
                        Confirmar Presenca
                      </Link>
                    </Button>
                  </div>
                  <div className={estilos.central__cartaoBotoesDesktop__Lista}>
                    <Button
                      variant="contained"
                      // onClick={() =>
                      //   navigate(
                      //     "https://www.finalfeliz.de/maira-antonio23092023"
                      //   )
                      onClick={() => setShowAlertList(true)}
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

        {!showAlertList && (
          <>
            <div className="bg-gold">
              <div
                id="sobre"
                className={estilos.sobre}
              >
                <h2 className={estilos.sobre__titulo}>
                  Sua presença é muito importante para nós!
                </h2>
                <div className={estilos.sobre__conteinerTextos}>
                  <p className={estilos.sobre__textoVersiculo}>
                    {`"Deus mudou o teu caminho até juntares com o meu e guardou a
                    tua vida separando-a para mim. Para onde fores, irei. Onde
                    tu repousares, repousarei. Teu Deus será o meu Deus. Teu
                    caminho o meu será." (Rute 1:16-17)`}
                  </p>
                  <p className={estilos.sobre__texto}>
                  É com grande satisfação e alegria que convidamos você para celebrar conosco o dia mais importante de nossas vidas: Nosso casamento!
                  </p>
                  <p className={estilos.sobre__texto}>
                    Para uma melhor organização, solicitamos que confirme sua
                    presença clicando no link abaixo até o dia
                    <a className={estilos.sobre__destaque}> 16/09.</a>
                  </p>
                  <Button variant="contained">
                    <Link to={"https://form.respondi.app/QNGi0gSF"}>
                      Confirmar Presenca
                    </Link>
                  </Button>
                  <p className={estilos.sobre__texto}>
                    Ressaltamos a importância de confirmar sua presença, bem
                    como a presença dos membros de sua família que irão
                    acompanhá-lo no dia do evento, para que possamos ter um
                    controle adequado. Caso não seja possível comparecer,
                    compreendemos e esperamos que possamos marcar um encontro em
                    breve.
                  </p>
                  <p className={estilos.sobre__texto}>
                    Além disso, criamos uma lista de presentes com muito amor e
                    cuidado, contendo itens que nos ajudarão a iniciar nossa
                    nova jornada juntos. Se desejar nos presentear, você pode
                    acessar nossa lista de presentes no link abaixo:
                  </p>
                  <Button variant="contained" onClick={topo}>
                    Lista de Presentes
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
                className={estilos.galeria}
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
        )}
      </div>
    </div>
  );
}
