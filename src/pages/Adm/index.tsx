import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SetStateAction, useState } from "react";
import GerecniarPresencas from "../GerenciarPresencas";
import GerenciarLista from "../GerenciarLista";
import GerenciarPresentesRecebidos from "../GerenciarPresentesRecebidos";
import { IOpcoes } from "../../interfaces/IOpcoes";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {
  repositorio: IOpcoes[];
  setRepositorio: React.Dispatch<React.SetStateAction<IOpcoes[]>>;
}

export default function Adm(props: Props) {
  const { repositorio, setRepositorio } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Gerenciar Convidados" {...a11yProps(0)} />
          <Tab label="Gerenciar Presentes" {...a11yProps(1)} />
          <Tab label="Presentes Rescebidos" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GerecniarPresencas/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GerenciarLista repositorio={repositorio} setRepositorio={setRepositorio} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GerenciarPresentesRecebidos />
      </TabPanel>
    </Box>
  );
}
