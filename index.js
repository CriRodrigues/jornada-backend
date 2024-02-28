const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbUrl = 'mongodb+srv://rodriguescira01:a1B2c3D4@cluster0.znm4gkl.mongodb.net';
const dbName = 'OceanJornada';

async function main() {
  const client = new MongoClient(dbUrl);

  console.log('Conectando ao banco de dados...');
  await client.connect();
  console.log('Banco de dados conectado com sucesso!');

  const app = express();

  app.get('/', function (req, res) {
    res.send('Hello, World!');
  })

  app.get('/oi', function (req, res) {
    res.send('Olá, mundo!');
  })

  // Lista de Personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']
  //              0               1              2

  const db = client.db(dbName)
  const collection = db.collection('items');

  // Read All -> [GET] /item
  app.get('/item', async function (req, res) {
    // Realizamos a operação de find na collection do MongoDB
    const items = await collection.find().toArray();

    // Envio todos os documentos como resposta HTTP
    res.send(items);
  })

  // Read By ID -> [GET] /item/:id
  app.get('/item/:id', async function (req, res) {
    // Acesso o ID no parâmetro de rota
    const id = req.params.id;

    // Acesso item na lista baseado no ID recebido
    const items = await collection.findOne(
      {_id: new ObjectId(id)}
    )

    // Envio o item obtido como resposta HTTP
    res.send(items);
  });

  // Sinalizamos que o corpo da requisição está em JSON
  app.use(express.json());

  // Create -> [POST] /item
  app.post('/item', async function (req, res) {

    // Pegamos o nome (string) que foi enviado dentro do corpo
    const items = req.body;

    // Colocamos o nome dentro da lista de itens
     await collection.insertOne(items);

    // Enviamos uma resposta de sucesso
    res.send('Item adicionado com sucesso!')
  });

  app.put('/item/:id', async function (req, res){
    const id = req.params.id;
    const novoItem = req.body;

    await collection.updateOne(
      {_id: new ObjectId(id)},
      { $set: novoItem}
    )
    res.send('item atualizado com sucesso!!!');
  });

  app.delete('/item/:id', async function (req, res){
    const id = req.params.id;

    await collection.deleteOne({ _id: new ObjectId(id)});

    req.send('item deletado com sucesso!!');

  });

  app.listen(3000)
}

main()