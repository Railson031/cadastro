import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from "@mui/material";

import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDaListagem } from "../../shared/components";
import { IListagemPessoa, PessoasService } from "../../shared/services";
import { Environment } from "../../shared/environments";


export const ListagemDePessoas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000, false);

  const [rows, setRows] = useState<IListagemPessoa[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PessoasService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);

            setTotalCount(result.totalCount);
            setRows(result.data);
          }
        });
    });
  }, [busca]);

  return (
    <div>
      <LayoutBaseDePagina
        titulo='Listagem de pessoas'
        barraDeFerramentas={
          <FerramentasDaListagem
            mostrarInputBusca
            textoBotaoNovo='Nova'
            textoBusca={busca}
            aoMudarTextoDeBusca={
              texto => setSearchParams({ busca: texto },
                { replace: true })
            }
          />
        }
      >
        <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ações</TableCell>
                <TableCell>Nome completo</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>Ações</TableCell>
                  <TableCell>{row.nomeCompleto}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            {totalCount === 0 && !isLoading && (
              <caption>{Environment.LISTAGEM_VAZIA}</caption>
            )}

            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant='indeterminate' />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutBaseDePagina>
    </div>
  );
};


