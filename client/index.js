/**
 * application client, tout les clients ecoute a la meme adresse et se differentie avec les ids dans les url
 * @type {createApplication}
 */
const express = require('express');
const Ascenceur = require('./Ascenceur');
const axios = require('axios');
var path = require('path');

const app = express();
const port = 8083;
const lift=new Ascenceur();//objet ascenceur lie au client, interface avec les fonctions hardware
/**
 * sert à obtenir le status de l'ascenceur de l'id correspondant
 */
app.get('/status/:id', function(req, res){
        console.log("status");
        if (req.params.id==lift.id){//ne repond que si on a le bon id
            res.setHeader("Access-Control-Allow-Origin",'http://localhost:8082');
            res.setHeader("Access-Control-Allow-Methods",'GET, DELETE, HEAD, OPTIONS');
            res.send(200,lift.state);

        }

    }
);
/**
 * sert à demander a l'ascenceur de l'id correspondant de monter
 */
app.get('/up/:id', function(req, res){
        var id=req.params.id;//recuperation de l'id
        console.log("up "+id);
        var status=lift.goUp(id);//test de montee
        if (status>=0) {//si on est concerne on renvois le status
            res.setHeader("Access-Control-Allow-Origin",'http://localhost:8082')
            res.setHeader("Access-Control-Allow-Methods",'GET, DELETE, HEAD, OPTIONS')
            res.send(200,status);
        }
    }
);
/**
 * sert à demander a l'ascenceur de l'id correspondant de descendre
 * voir la fonction equivalente pour monter
 */
app.get('/down/:id', function(req, res){
        var id=req.params.id;
        console.log("down "+id);
        var status=lift.goDown(id);
        if (status>=0) {
            res.setHeader("Access-Control-Allow-Origin",'http://localhost:8082')
            res.setHeader("Access-Control-Allow-Methods",'GET, DELETE, HEAD, OPTIONS')
            res.send(200,status);
        }
    }
);

/**
 * sert a envoyer une requete de deconnection au serveur en fin d'aplication
 */
function exitHandler() {
    console.log(lift.id)
    axios({
        method: 'delete',
        url: 'http://localhost:8082/'+lift.id,
        headers: {},
        data: {}

    })        .then(response => {console.log((response))})
        .catch(error => {console.log(error)})

}

process.on('exit', exitHandler.bind());//lorsqu'on sort de l'aplication on envois une requete au serveur pour deconecter l'ascenceur
process.on('SIGINT', exitHandler.bind());
process.on('SIGUSR1', exitHandler.bind());
process.on('SIGUSR2', exitHandler.bind());
process.on('uncaughtException', exitHandler.bind());

/**
 * demarage de l'aplication du client
 */
app.listen(port, (err) => {
    console.log(`client listening on port ${port}! ${err}`);//entendu : client listening on port 8030 ! undefined
    console.log( process.argv);
    if (process.argv.length>2){
        var nom=process.argv[2];// recuperation du nom si donne en parametre
    }
    axios({//requete pour obtenir son id
        method: 'get',
        url: 'http://localhost:8082/id',
        headers: {},
        data: nom //transmition du nom non fonctionnelle
    })
        .then(response => {console.log(response.data);
                                    lift.id=response.data})// atribution de l'id
        .catch(error => {console.log(error);
    });

});
