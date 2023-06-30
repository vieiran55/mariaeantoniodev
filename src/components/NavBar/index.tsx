import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import estilos from "./NavBar.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import "tw-elements";
import estilosProjetos from "../Projetos/Projetos.module.scss";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { ImGift } from "react-icons/im";
import { RiFilePaper2Line } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";

interface Props {
  showAlertList: boolean;
  setShowAlertList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar(props: Props) {
  const { showAlertList, setShowAlertList } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const wpp = "https://wa.me/5561999981928";

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={estilos.navbar}>
      {/* mobile */}
      <div className={estilos.mobile}>
        <div className={estilos.menu}>
          <Stack>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={isOpen ? "composition-menu" : undefined}
              aria-expanded={isOpen ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{
                width: "50px",
                height: "50px",
                "&:hover": {
                  backgroundColor: "#CE633E",
                },
              }}
            >
              <GiHamburgerMenu className={estilos.mobile__icon} />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link
                            to={"https://form.respondi.app/QNGi0gSF"}
                            className={estilos.mobile__links}
                            onClick={handleClose}
                          >
                            Confirmar Presenca
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={() => setShowAlertList(true)}>
                          Lista de Presentes
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          {" "}
                          <ScrollLink
                            to="sobre"
                            smooth={true}
                            duration={500}
                            offset={-70} // Ajuste o valor do deslocamento conforme necessário
                            className={estilos.navbarLink}
                          >
                            <div onClick={handleClose}>Sobre o Casamento</div>
                          </ScrollLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          {" "}
                          <ScrollLink
                            to="momentos"
                            smooth={true}
                            duration={500}
                            offset={-70} // Ajuste o valor do deslocamento conforme necessário
                            className={estilos.navbarLink}
                          >
                            <div onClick={handleClose}>Nossos momentos</div>
                          </ScrollLink>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Stack>
        </div>
        <div className={estilos.entrada__casal}>
          <h1 className={estilos.entrada__casal__titulo}>Maira e Antônio</h1>
        </div>
      </div>
      {/* desktop */}
      <div className={estilos.conteinerDesktop}>
        <div className={estilos.entrada__casal}>
          <h1 className={estilos.entrada__casal__titulo}>Maira e Antônio</h1>
        </div>
        <ol className={estilos.conteinerDesktop__opcoes}>
          <li className={estilos.conteinerDesktop__opcoes__links}>
            <Link
              to={"https://form.respondi.app/QNGi0gSF"}
              className={estilos.desktop__links}
            >
              <RiFilePaper2Line className={estilos.desktop__links__icons} />
              Confirmar Presenca
            </Link>
          </li>
          <li
            className={estilos.conteinerDesktop__opcoes__links}
            onClick={() => setShowAlertList(true)}
          >
            <ImGift className={estilos.desktop__links__icons} />
            Lista de Presentes
          </li>
          <li className={estilos.conteinerDesktop__opcoes__links}>
            <ScrollLink
              to="sobre"
              smooth={true}
              duration={500}
              offset={-70} // Ajuste o valor do deslocamento conforme necessário
              className={estilos.navbarLink}
            >
              <div onClick={handleClose}>
                <BsInfoCircle className={estilos.desktop__links__icons} />
                Sobre o Casamento
              </div>
            </ScrollLink>
          </li>
          <li className={estilos.conteinerDesktop__opcoes__links}>
            <ScrollLink
              to="momentos"
              smooth={true}
              duration={500}
              offset={-70} // Ajuste o valor do deslocamento conforme necessário
              className={estilos.navbarLink}
            >
              <div onClick={handleClose}>
                <HiOutlinePhotograph
                  className={estilos.desktop__links__icons}
                />
                Nossos momentos
              </div>
            </ScrollLink>
          </li>
        </ol>
      </div>
    </div>
  );
}
