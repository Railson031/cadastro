import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, ListagemDeCidade } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        label: 'Página inicial',
        path: '/pagina-inicial',
      },
      {
        icon: 'location_city',
        label: 'Cidades',
        path: '/cidades',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />

      <Route path='/cidades' element={<ListagemDeCidade />} />
      {/* <Route path='/cidades/detalhes/:id' element={< />} /> */}

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
};