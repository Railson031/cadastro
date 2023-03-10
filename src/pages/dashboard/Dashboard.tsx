import { useEffect, useState } from 'react';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components';
import { CidadesService, PessoasService } from '../../shared/services';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

export const Dashboard = () => {

  const [isLoadingCidades, setIsLoadingCidades] = useState(false);
  const [totalCountCidades, setTotalCountCidades] = useState(0);

  const [isLoadingPessoas, setIsLoadingPessoas] = useState(false);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    CidadesService.getAll(1)
      .then((result) => {
        setIsLoadingCidades(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCidades(result.totalCount);
        }
      });
    PessoasService.getAll(1)
      .then((result) => {
        setIsLoadingPessoas(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountPessoas(result.totalCount);
        }
      });
  }, []);


  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}>
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2} >

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de pessoas
                  </ Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingPessoas && (
                      <Typography variant='h1' >
                        {totalCountPessoas}
                      </ Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant='h6' >
                        Carregando...
                      </ Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de cidades
                  </ Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingCidades && (
                      <Typography variant='h1' >
                        {totalCountCidades}
                      </ Typography>
                    )}
                    {isLoadingCidades && (
                      <Typography variant='h6' >
                        Carregando...
                      </ Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};