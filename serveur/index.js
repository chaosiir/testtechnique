/**
 * application serveur, va communiquer avec tout les clients et stocker leur information dans un tableau pour y avoir acces sur la page html
 * @type {createApplication}
 */
var express = require('express');
var cors = require('cors');
var views = './views'
var app = express();
app.use(cors());
var corsOptions = {//pour autoriser les demandes des clients
    origin: 'http://localhost:8083',
    methods: 'GET,POST,PUT,DELETE',
    optionsSuccessStatus: 200
};
app.set('views',views);
app.set('view engine', 'pug');
app.use(express.static('./public')); // to get static pages


/**
 * renovois la page html pour controler les ascenceurs
 */
app.get('/', function(req, res){
        console.log("home");
        res.sendfile('views/serveur.html')
    }
);

let ids=new Array(100);//attribution des ids ds ascenseurs, l'index dans l'array est l'id de l'ascenceur et le contenu de l'array à
//cet id est son nom

/**
 * cherche dans le tableau d'id un id libre
 * @param nom le nom de l'ascenceur a stocker
 * @returns {number} id de l'ascenceur nouvellement atribue ,-1 est renvoye si aucun id est libre
 */
function findId(nom){
    var id=0;
    while (id<ids.length && !(ids[id]===undefined)){ // on parcourt la liste d'id
        id++;
    }
    if(id>ids.length){ // si aucun est libre on renvois -1
        return -1;
    }
    if(nom===undefined){ // sinon on met occupe l'id avec le nom de l'ascenseur ( ascenceur+id etant le nom par default)
        ids[id]="ascenseur "+id;
    }
    else {
        ids[id]=nom;
    }
    return id;
}

/**
 * revois la tableau des ascenceurs (ids), utilise dans la page html pour mettre a jour sans recharger la page
 */
app.get('/ids' ,cors(corsOptions), function (req,res){
  console.log(ids,'µµµµµ');
    res.setHeader('Content-Type', 'application/json');
    res.send(200,{
        ids : JSON.stringify(ids),//transmition sous format json sinon transforme en string
    });
});

/**
 * sert a atribuer un id aux clients
 */
app.get('/id',cors(corsOptions), function(req, res){
        console.log("get id");
        nom=req.data;//recuperation du nom inorecte
        var id= findId(nom);//attribution d'un id
        console.log(ids)
        if (id==-1){//test si id disponible
            res.send(500,"nombre maximal d'ascenceurs atteind")
        }
        else {
            res.send(200,id)
        }
    }
);
/**
 * libere l'id demande en parametre
 */
app.delete('/:id',cors(corsOptions), function(req, res){
        var id=req.params.id;
        console.log('suppr '+id);
        ids[id]=undefined;
        res.send(200,"ok")
    }
);

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

/**
 * demarage de l'application ecoute du port 8082
 */
app.listen(8082);
