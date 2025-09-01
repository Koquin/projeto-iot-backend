// controllers/comodoController.js
import { Router } from 'express';
import { ComodoRepositorio } from '../repositories/comodoRepositorio.js';

const comodoRouter = Router();

// POST /room
comodoRouter.post('/', async (req, res) => {
  const { nome, descricao, usuario_id } = req.body;
  if (!nome || !usuario_id) {
    return res.status(400).json({ message: 'O nome e o ID do usuário são obrigatórios.' });
  }

  try {
    const novoComodo = await ComodoRepositorio.criar(nome, descricao, usuario_id);
    return res.status(201).json(novoComodo);
  } catch (error) {
    console.error('Erro ao criar cômodo:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /room
comodoRouter.get('/', async (_req, res) => {
  try {
    const lista = await ComodoRepositorio.listar();
    return res.json(lista);
  } catch (error) {
    console.error('Erro ao listar cômodos:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /room/:id
comodoRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID do cômodo inválido.' });
  }

  try {
    const comodo = await ComodoRepositorio.buscarPorId(Number(id));
    if (!comodo) {
      return res.status(404).json({ message: 'Cômodo não encontrado.' });
    }
    return res.json(comodo);
  } catch (error) {
    console.error('Erro ao buscar cômodo:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// PUT /room/:id
comodoRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, usuario_id } = req.body;
  if (isNaN(Number(id)) || !nome || !usuario_id) {
    return res.status(400).json({ message: 'ID, nome e ID do usuário são obrigatórios.' });
  }

  try {
    const atualizado = await ComodoRepositorio.atualizar(Number(id), nome, descricao, usuario_id);
    if (!atualizado) {
      return res.status(404).json({ message: 'Cômodo não encontrado.' });
    }
    return res.json(atualizado);
  } catch (error) {
    console.error('Erro ao atualizar cômodo:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// DELETE /room/:id
comodoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID do cômodo inválido.' });
  }

  try {
    const deletado = await ComodoRepositorio.deletar(Number(id));
    if (!deletado) {
      return res.status(404).json({ message: 'Cômodo não encontrado.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error('Erro ao deletar cômodo:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export { comodoRouter };