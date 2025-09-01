// controllers/dispositivoController.js
import { Router } from 'express';
import { DispositivoRepositorio } from '../repositories/dispositivoRepositorio.js';

const dispositivoRouter = Router();

// GET /device
dispositivoRouter.get('/', async (_req, res) => {
  try {
    const lista = await DispositivoRepositorio.listar();
    return res.status(200).json(lista);
  } catch (error) {
    console.error('Erro ao listar dispositivos:', error);
    return res.status(400).json({ message: 'Erro ao listar dispositivos.' });
  }
});

// GET /device/:id
dispositivoRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID do dispositivo inválido.' });
  }

  try {
    const dispositivo = await DispositivoRepositorio.buscarPorId(Number(id));
    if (!dispositivo) {
      return res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }
    return res.status(200).json(dispositivo);
  } catch (error) {
    console.error('Erro ao buscar dispositivo:', error);
    return res.status(400).json({ message: 'Erro ao buscar dispositivo.' });
  }
});

// POST /device
dispositivoRouter.post('/', async (req, res) => {
  const { nome, tipo, estado, comodo_id } = req.body;
  if (!nome || !tipo || !comodo_id) {
    return res.status(400).json({ message: 'Os campos nome, tipo e comodo_id são obrigatórios.' });
  }

  try {
    const novoDispositivo = await DispositivoRepositorio.criar(nome, tipo, estado, comodo_id);
    return res.status(201).json(novoDispositivo);
  } catch (error) {
    console.error('Erro ao criar dispositivo:', error);
    return res.status(400).json({ message: 'Erro ao criar dispositivo.' });
  }
});

// PUT /device/:id
dispositivoRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, tipo, estado, comodo_id } = req.body;
  if (isNaN(Number(id)) || !nome || !tipo || !comodo_id) {
    return res.status(400).json({ message: 'ID, nome, tipo e comodo_id são obrigatórios.' });
  }

  try {
    const atualizado = await DispositivoRepositorio.atualizar(Number(id), nome, tipo, estado, comodo_id);
    if (!atualizado) {
      return res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }
    return res.status(200).json(atualizado);
  } catch (error) {
    console.error('Erro ao atualizar dispositivo:', error);
    return res.status(400).json({ message: 'Erro ao atualizar dispositivo.' });
  }
});

// DELETE /device/:id
dispositivoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID do dispositivo inválido.' });
  }

  try {
    const deletado = await DispositivoRepositorio.deletar(Number(id));
    if (!deletado) {
      return res.status(404).json({ message: 'Dispositivo não encontrado.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error('Erro ao deletar dispositivo:', error);
    return res.status(400).json({ message: 'Erro ao deletar dispositivo.' });
  }
});

export { dispositivoRouter };