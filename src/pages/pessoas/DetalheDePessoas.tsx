import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { PessoasService } from '../../shared/services';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhes } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErros } from '../../shared/forms';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  cidadeId: yup.number().required(),
  email: yup.string().required().email(),
  nomeCompleto: yup.string().required().min(3),
});

export const DetalheDePessoas: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        email: '',
        cidadeId: undefined,
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    formValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          PessoasService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                } else {
                  navigate(`/pessoas/detalhe/${result}`);
                }
              }
            });
        } else {
          PessoasService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/pessoas');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErros = {};

        errors.inner.forEach(error => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });

  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova de pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhes
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostarBotaoApagar={id !== 'nova'}

          aoClicarEmVoltar={() => navigate('/pessoas')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmSalvar={save}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvarEVoltar={saveAndClose}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >

          <Grid container direction='column' padding={2} spacing={2}>

            {isLoading && (
              <Grid>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral </Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome completo'
                  name='nomeCompleto'
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Email'
                  name='email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
