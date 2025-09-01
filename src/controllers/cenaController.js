import { Router } from 'express';
import { CenaRepositorio } from '../repositories/cenaRepositorio.js';
import { AcaoCenaRepositorio } from '../repositories/acaoCenaRepositorio.js';
import { DispositivoRepositorio } from '../repositories/dispositivoRepositorio.js';

const cenaRouter = Router();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// POST /scene
cenaRouter.post('/', async (req, res) => {
  const { usuario_id, nome, descricao } = req.body;
  console.log(`[CenaController - POST] Recebendo dados para nova cena:`, req.body);
  
  if (!usuario_id || !nome) {
    console.log(`[CenaController - POST] Erro 400: Campos obrigatórios faltando.`);
    return res.status(400).json({ message: 'Os campos usuario_id e nome são obrigatórios.' });
  }

  try {
    const novaCena = await CenaRepositorio.criar(usuario_id, nome, descricao);
    console.log(`[CenaController - POST] Nova cena criada com sucesso. ID: ${novaCena.id}`);
    return res.status(201).json(novaCena);
  } catch (error) {
    console.error('[CenaController - POST] Erro ao criar cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /scene
cenaRouter.get('/', async (_req, res) => {
  console.log(`[CenaController - GET] Recebendo requisição para listar cenas.`);
  try {
    const lista = await CenaRepositorio.listar();
    console.log(`[CenaController - GET] Retornando ${lista.length} cenas.`);
    return res.json(lista);
  } catch (error) {
    console.error('[CenaController - GET] Erro ao listar cenas:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /scene/:id
cenaRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`[CenaController - GET/:id] Recebendo requisição para buscar cena. ID: ${id}`);
  
  if (isNaN(Number(id))) {
    console.log(`[CenaController - GET/:id] Erro 400: ID inválido.`);
    return res.status(400).json({ message: 'ID da cena inválido.' });
  }

  try {
    const cena = await CenaRepositorio.buscarPorId(Number(id));
    if (!cena) {
      console.log(`[CenaController - GET/:id] Erro 404: Cena não encontrada.`);
      return res.status(404).json({ message: 'Cena não encontrada.' });
    }
    console.log(`[CenaController - GET/:id] Cena encontrada. ID: ${cena.id}`);
    return res.json(cena);
  } catch (error) {
    console.error('[CenaController - GET/:id] Erro ao buscar cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// PUT /scene/:id
cenaRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { usuario_id, nome, descricao } = req.body;
  console.log(`[CenaController - PUT/:id] Recebendo requisição para atualizar cena. ID: ${id}, Dados:`, req.body);

  if (isNaN(Number(id))) {
    console.log(`[CenaController - PUT/:id] Erro 400: ID inválido.`);
    return res.status(400).json({ message: 'ID da cena inválido.' });
  }

  if (!usuario_id || !nome) {
    console.log(`[CenaController - PUT/:id] Erro 400: Campos obrigatórios faltando.`);
    return res.status(400).json({ message: 'Os campos usuario_id e nome são obrigatórios.' });
  }

  try {
    const atualizada = await CenaRepositorio.atualizar(Number(id), usuario_id, nome, descricao);
    if (!atualizada) {
      console.log(`[CenaController - PUT/:id] Erro 404: Cena não encontrada.`);
      return res.status(404).json({ message: 'Cena não encontrada.' });
    }
    console.log(`[CenaController - PUT/:id] Cena atualizada com sucesso. ID: ${atualizada.id}`);
    return res.json(atualizada);
  } catch (error) {
    console.error('[CenaController - PUT/:id] Erro ao atualizar cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// DELETE /scene/:id
cenaRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`[CenaController - DELETE/:id] Recebendo requisição para deletar cena. ID: ${id}`);
  
  if (isNaN(Number(id))) {
    console.log(`[CenaController - DELETE/:id] Erro 400: ID inválido.`);
    return res.status(400).json({ message: 'ID da cena inválido.' });
  }

  try {
    const deletado = await CenaRepositorio.deletar(Number(id));
    if (!deletado) {
      console.log(`[CenaController - DELETE/:id] Erro 404: Cena não encontrada.`);
      return res.status(404).json({ message: 'Cena não encontrada.' });
    }
    console.log(`[CenaController - DELETE/:id] Cena deletada com sucesso.`);
    return res.json({ message: 'Cena deletada com sucesso.' });
  } catch (error) {
    console.error('[CenaController - DELETE/:id] Erro ao deletar cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// POST /scene/:id/addAcao
cenaRouter.post('/:id/addAcao', async (req, res) => {
  const { id } = req.params;
  const { acaocena_id } = req.body;
  console.log(`[CenaController - POST/:id/addAcao] Recebendo requisição. Cena ID: ${id}, Ação ID: ${acaocena_id}`);

  if (isNaN(Number(id)) || isNaN(Number(acaocena_id))) {
    console.log(`[CenaController - POST/:id/addAcao] Erro 400: IDs inválidos.`);
    return res.status(400).json({ message: 'IDs da cena e da ação de cena são inválidos.' });
  }

  try {
    const cena = await CenaRepositorio.buscarPorId(Number(id));
    const acao = await AcaoCenaRepositorio.buscarPorId(Number(acaocena_id));

    if (!cena || !acao) {
      console.log(`[CenaController - POST/:id/addAcao] Erro 404: Cena ou Ação de Cena não encontrada.`);
      return res.status(404).json({ message: 'Cena ou Ação de Cena não encontrada.' });
    }
    
    const associacao = await CenaRepositorio.associarAcao(Number(id), Number(acaocena_id));
    console.log(`[CenaController - POST/:id/addAcao] Ação associada com sucesso.`, associacao);
    return res.status(201).json(associacao);
  } catch (error) {
    console.error('[CenaController - POST/:id/addAcao] Erro ao associar ação à cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// POST /scene/:id/execute
cenaRouter.post('/:id/execute', async (req, res) => {
  const { id } = req.params;
  console.log(`[CenaController - POST/:id/execute] Recebendo requisição para executar cena. ID: ${id}`);

  if (isNaN(Number(id))) {
    console.log(`[CenaController - POST/:id/execute] Erro 400: ID inválido.`);
    return res.status(400).json({ message: 'ID da cena inválido.' });
  }

  try {
    const cena = await CenaRepositorio.buscarPorId(Number(id));
    if (!cena) {
      console.log(`[CenaController - POST/:id/execute] Erro 404: Cena não encontrada.`);
      return res.status(404).json({ message: 'Cena não encontrada.' });
    }
    console.log(`[CenaController - POST/:id/execute] Cena encontrada. Buscando ações...`);

    const acoes = await CenaRepositorio.buscarAcoesDaCena(Number(id));
    console.log(`[CenaController - POST/:id/execute] Encontradas ${acoes.length} ações para a cena.`);

    if (acoes.length === 0) {
      console.log(`[CenaController - POST/:id/execute] Nenhuma ação para executar.`);
      return res.status(200).json({ message: `Cena ${id} executada com sucesso. Nenhuma ação encontrada para executar.`, acoes_executadas: 0 });
    }

    let resultados = [];
    for (const acao of acoes) {
      console.log(`[CenaController - POST/:id/execute] Tentando executar ação:`, acao);
      
      console.log(`Antes do if da acao.estadoDEsejado(${acao.estadoDesejado}) && acao.dispositivo_id(${acao.dispositivo_id})`)
      if (acao.estadodesejado && acao.dispositivo_id) {
        console.log(`Entrou no if da acao.estadoDEsejado(${acao.estadoDesejado}) && acao.dispositivo_id(${acao.dispositivo_id})`)
        try {
          const dispositivoAtualizado = await DispositivoRepositorio.atualizarEstado(acao.dispositivo_id, acao.estadodesejado);
          
          if (!dispositivoAtualizado) {
            console.log(`[CenaController - POST/:id/execute] Erro: Dispositivo ${acao.dispositivo_id} não encontrado.`);
            resultados.push({
              acao_id: acao.id,
              status: 'erro',
              mensagem: `Erro: Dispositivo associado à ação não encontrado.`
            });
            continue;
          }
          
          console.log(`[CenaController - POST/:id/execute] Sucesso: Dispositivo ${dispositivoAtualizado.id} atualizado para o estado '${dispositivoAtualizado.estado}'.`);
          resultados.push({
            acao_id: acao.id,
            status: 'sucesso',
            mensagem: `Dispositivo ${dispositivoAtualizado.id} atualizado para o estado '${dispositivoAtualizado.estado}'.`
          });
          
          if (acao.intervalo) {
            console.log(`[CenaController - POST/:id/execute] Aguardando intervalo de ${acao.intervalo} segundos...`);
            await sleep(acao.intervalo * 1000);
          }

        } catch (error) {
          console.error(`[CenaController - POST/:id/execute] Erro ao executar a ação ${acao.id}:`, error);
          resultados.push({
            acao_id: acao.id,
            status: 'erro',
            mensagem: `Erro ao executar a ação. Detalhes: ${error.message}`
          });
        }
      } else {
        console.log(`[CenaController - POST/:id/execute] Aviso: Ação ${acao.id} ignorada por falta de dados.`);
        resultados.push({
          acao_id: acao.id,
          status: 'aviso',
          mensagem: 'Ação ignorada: faltando dispositivo_id ou estadoDesejado.'
        });
      }
    }

    console.log(`[CenaController - POST/:id/execute] Execução da cena ${id} concluída. Resultados:`, resultados);
    return res.json({
      message: `Cena ${id} executada!`,
      acoes_executadas: acoes.length,
      resultados
    });

  } catch (error) {
    console.error('[CenaController - POST/:id/execute] Erro fatal ao executar cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export { cenaRouter };