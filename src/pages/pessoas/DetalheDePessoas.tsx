import { useEffect, useRef, useState } from 'react';
import { PessoasService } from '../../shared/services';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDeDetalhes } from '../../shared/components';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);
    if (id === 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
          }
        });
    }
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
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
          aoClicarEmSalvarEVoltar={() => formRef.current?.submitForm()}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder='Nome completo' name='nomeCompleto' />
        <VTextField placeholder='Email' name='email' />
        <VTextField placeholder='Cidade id' name='cidadeId' />
      </Form>
    </LayoutBaseDePagina>
  );
};
