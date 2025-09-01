// controllers/usuarioController.js
import { Router } from 'express';
import { UsuarioRepositorio } from '../repositories/usuarioRepositorio.js';

const usuarioRouter = Router();

// POST /user
usuarioRouter.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    const novoUsuario = await UsuarioRepositorio.criar(nome, email, senha);
    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /user
usuarioRouter.get('/', async (_req, res) => {
  try {
    const lista = await UsuarioRepositorio.listar();
    return res.status(200).json(lista);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// GET /user/:id
usuarioRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID do usuário inválido.' });
  }

  try {
    const usuario = await UsuarioRepositorio.buscarPorId(Number(id));
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// PUT /user/:id
usuarioRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  if (isNaN(Number(id)) || !nome || !email || !senha) {
    return res.status(400).json({ message: 'ID, nome, email e senha são obrigatórios.' });
  }

  try {
    const atualizado = await UsuarioRepositorio.atualizar(Number(id), nome, email, senha);
    if (!atualizado) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(200).json(atualizado);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// DELETE /user/:id
usuarioRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID do usuário inválido.' });
  }

  try {
    const deletado = await UsuarioRepositorio.deletar(Number(id));
    if (!deletado) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export { usuarioRouter };