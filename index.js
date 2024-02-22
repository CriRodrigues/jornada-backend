const express = require('express')

const app = express()

 

app.get('/', function (req, res) {

res.send('Hello World');

});

app.get('/oi', function (req, res){
    res.send('Hello Word');
})

let lista = ['Rick Sanches', 'Morty Smith', 'Sumner Smith'];
 
//read All -> [Get] /item

app.get('/item', function (req, res){
  res.send(lista);

});

// Read By ID -> [GET] /item/:id
app.get('/item/:id', function (req, res) {

//Acesso ID no parametro item.
  const id = req.params.id;

// Acessa lista baseado no ID recebido
  const item = lista[id];

//Envio do item recebido como resposta http.
  res.send(item);

});

app.use(express.json());

// criando um post /item
app.post('/item', function (req, res){
  
  // Extaindo o corpo da requisição
  const body = req.body;
  
  //pegando o nome (String) que foi enviado
  const item = body.name;
  
  //item recebe um nome enviado pela requisição.
  lista.push(item);


  //Enviado com sucesso
  res.send('adiconado com sucesso!!');
});

app.delete('/item/:id', function (req, res){

  const id  = req.params.id;
  const item = lista.deleteOne(id);
  req.redirec('/item');

  
  res.send(item);



});


app.listen(3000)