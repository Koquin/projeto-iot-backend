import express from 'express';
import { acaoCenaRouter } from './controllers/acaoCenaController.js';
import { cenaRouter } from './controllers/cenaController.js';
import { comodoRouter } from './controllers/comodoController.js';
import { dispositivoRouter } from './controllers/dispositivoController.js';
import { usuarioRouter } from './controllers/usuarioController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/scene-action', acaoCenaRouter);
app.use('/scene', cenaRouter);
app.use('/room', comodoRouter);
app.use('/device', dispositivoRouter);
app.use('/user', usuarioRouter);

app.listen(PORT, () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`Servidor rodando em ${serverUrl}`);

  console.log(`\nEndpoints disponíveis para Usuário:`);
  console.log(`-------------------------------------------`);
  console.log(`POST   ${serverUrl}/user              - Cria um novo usuário`);
  console.log(`GET    ${serverUrl}/user              - Lista todos os usuários`);
  console.log(`GET    ${serverUrl}/user/:id          - Busca um usuário por ID`);
  console.log(`PUT    ${serverUrl}/user/:id          - Atualiza um usuário existente`);
  console.log(`DELETE ${serverUrl}/user/:id          - Deleta um usuário por ID`);
  console.log(`-------------------------------------------`);

  console.log(`\nEndpoints disponíveis para Cômodo:`);
  console.log(`-------------------------------------------`);
  console.log(`POST   ${serverUrl}/room              - Cria um novo cômodo`);
  console.log(`GET    ${serverUrl}/room              - Lista todos os cômodos`);
  console.log(`GET    ${serverUrl}/room/:id          - Busca um cômodo por ID`);
  console.log(`PUT    ${serverUrl}/room/:id          - Atualiza um cômodo existente`);
  console.log(`DELETE ${serverUrl}/room/:id          - Deleta um cômodo por ID`);
  console.log(`-------------------------------------------`);

  console.log(`\nEndpoints disponíveis para Dispositivo:`);
  console.log(`-------------------------------------------`);
  console.log(`POST   ${serverUrl}/device            - Cria um novo dispositivo`);
  console.log(`GET    ${serverUrl}/device            - Lista todos os dispositivos`);
  console.log(`GET    ${serverUrl}/device/:id        - Busca um dispositivo por ID`);
  console.log(`PUT    ${serverUrl}/device/:id        - Atualiza um dispositivo existente`);
  console.log(`DELETE ${serverUrl}/device/:id        - Deleta um dispositivo por ID`);
  console.log(`-------------------------------------------`);

  console.log(`\nEndpoints disponíveis para Cena:`);
  console.log(`-------------------------------------------`);
  console.log(`POST   ${serverUrl}/scene             - Cria uma nova cena`);
  console.log(`GET    ${serverUrl}/scene             - Lista todas as cenas`);
  console.log(`GET    ${serverUrl}/scene/:id         - Busca uma cena por ID`);
  console.log(`PUT    ${serverUrl}/scene/:id         - Atualiza uma cena existente`);
  console.log(`DELETE ${serverUrl}/scene/:id         - Deleta uma cena por ID`);
  console.log(`POST   ${serverUrl}/scene/:id/addAcao - Associa uma ação a uma cena`);
  console.log(`POST   ${serverUrl}/scene/:id/execute - Executa todas as ações da cena`);
  console.log(`-------------------------------------------`);

  console.log(`\nEndpoints disponíveis para Ação de Cena:`);
  console.log(`-------------------------------------------`);
  console.log(`POST   ${serverUrl}/scene-action          - Cria uma nova ação`);
  console.log(`GET    ${serverUrl}/scene-action          - Lista todas as ações`);
  console.log(`GET    ${serverUrl}/scene-action/:id      - Busca uma ação por ID`);
  console.log(`PUT    ${serverUrl}/scene-action/:id      - Atualiza uma ação existente`);
  console.log(`DELETE ${serverUrl}/scene-action/:id      - Deleta uma ação por ID`);
  console.log(`POST   ${serverUrl}/scene-action/:id/execute - Executa uma ação`);
  console.log(`-------------------------------------------`);
});