// controllers/acaoCenaController.js
import { Router } from 'express';
import { AcaoCenaRepositorio } from '../repositories/acaoCenaRepositorio.js';
import { DispositivoRepositorio } from '../repositories/dispositivoRepositorio.js'; // Importe o repositório de Dispositivo

const acaoCenaRouter = Router();

// POST /acaoCena/:id/execute
acaoCenaRouter.post('/:id/execute', async (req, res) => {
  const { id } = req.params;

  try {
    const acao = await AcaoCenaRepositorio.buscarPorId(Number(id));
    if (!acao) {
      return res.status(404).json({ message: 'Ação de cena não encontrada.' });
    }

    if (!acao.estadodesejado) {
      return res.status(400).json({ message: 'Ação de cena não tem um estadoDesejado para executar.' });
    }

    // Executa a lógica: atualiza o estado do dispositivo
    const dispositivoAtualizado = await DispositivoRepositorio.atualizarEstado(acao.dispositivo_id, acao.estadodesejado);

    if (!dispositivoAtualizado) {
      return res.status(404).json({ message: 'Dispositivo associado não encontrado.' });
    }

    return res.json({
      message: `Ação de cena ${id} executada! Dispositivo ${dispositivoAtualizado.id} atualizado para o estado '${dispositivoAtualizado.estado}'.`,
      acao,
      dispositivo: dispositivoAtualizado
    });

  } catch (error) {
    console.error('Erro ao executar ação de cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /acaoCena
acaoCenaRouter.get('/', async (_req, res) => {
  try {
    const lista = await AcaoCenaRepositorio.listar();
    return res.json(lista);
  } catch (error) {
    console.error('Erro ao listar ações de cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /acaoCena/:id
acaoCenaRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID da ação de cena inválido.' });
  }

  try {
    const acao = await AcaoCenaRepositorio.buscarPorId(Number(id));
    if (!acao) {
      return res.status(404).json({ message: 'Ação de cena não encontrada.' });
    }
    return res.json(acao);
  } catch (error) {
    console.error('Erro ao buscar ação de cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// POST /acaoCena
acaoCenaRouter.post('/', async (req, res) => {
  const { dispositivo_id, cena_id, intervalo, estadoDesejado } = req.body;

  if (!dispositivo_id || !cena_id) {
    return res.status(400).json({ message: 'Os campos dispositivo_id e cena_id são obrigatórios.' });
  }

  try {
    const novaAcao = await AcaoCenaRepositorio.criar(dispositivo_id, cena_id, intervalo, estadoDesejado);
    return res.status(201).json(novaAcao);
  } catch (error) {
    console.error('Erro ao criar ação de cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// PUT /acaoCena/:id
acaoCenaRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { dispositivo_id, cena_id, intervalo, estadoDesejado } = req.body;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID da ação de cena inválido.' });
  }
  
  if (!dispositivo_id || !cena_id) {
    return res.status(400).json({ message: 'Os campos dispositivo_id e cena_id são obrigatórios.' });
  }

  try {
    const atualizada = await AcaoCenaRepositorio.atualizar(Number(id), dispositivo_id, cena_id, intervalo, estadoDesejado);
    if (!atualizada) {
      return res.status(404).json({ message: 'Ação de cena não encontrada.' });
    }
    return res.json(atualizada);
  } catch (error) {
    console.error('Erro ao atualizar ação de cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// DELETE /acaoCena/:id
acaoCenaRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID da ação de cena inválido.' });
  }

  try {
    const deletado = await AcaoCenaRepositorio.deletar(Number(id));
    if (!deletado) {
      return res.status(404).json({ message: 'Ação de cena não encontrada.' });
    }
    return res.json({ message: 'Ação de cena deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar ação de cena:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export { acaoCenaRouter };