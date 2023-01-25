import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

interface IFerramentasDeDetalhesProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEVoltar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEVoltar,
}) => {

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      alignItems='center'
      height={theme.spacing(5)}
      component={Paper}
    >
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button color='primary'
          disableElevation
          variant='contained'
          onClick={aoClicarEmSalvar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && (
        <Skeleton width={110} height={60} />
      )}

      {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
        <Button color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmSalvarEVoltar}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar e voltar
          </Typography>
        </Button>
      )}

      {(mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
        <Skeleton width={180} height={60} />
      )}

      {(mostarBotaoApagar && !mostarBotaoApagarCarregando) && (
        <Button color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmApagar}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Apagar
          </Typography>
        </Button>
      )}

      {mostarBotaoApagarCarregando && (
        <Skeleton width={110} height={60} />
      )}

      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
        <Button color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmNovo}
          startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}

      {
        mostrarBotaoVoltar &&
        (mostrarBotaoNovo || mostarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar) && (
          <Divider variant='middle' orientation='vertical' />
        )}

      {(mostrarBotaoNovoCarregando && !smDown) && (
        <Skeleton width={110} height={60} />
      )}

      {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
        <Button color='primary'
          disableElevation
          variant='outlined'
          onClick={aoClicarEmVoltar}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Voltar
          </Typography>
        </Button>

      )}
      {mostrarBotaoVoltarCarregando && (
        <Skeleton width={110} height={60} />
      )}
    </Box>
  )
}

