/**
 * script utilise dans la page html pour mettre a jour les informations du tableau
 */

console.log("serveur up");

/**
 * envois une requete aux clients pour faire monter l'ascenceur possedant l'id correspondant
 * l'id est passe dans l'url et seul le client possedant l'id correspondant est supose repondre
 * @param id identifiant de l'ascenseur a deplacer
 */
function goUp(id) {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:8083/up/' + id;
    http.open("GET", url);
    http.send()
}

/**
 * fonctionne de maniere analogue à goUp mais pour la descente
 * @see goUp
 * @param id identifiant de l'ascenseur a deplacer
 */
function goDown(id) {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:8083/down/' + id;
    http.open("GET", url);
    http.send()
}

/**
 * construit la table html avec les nouvelles informations a jour
 * @param table la table html a construire
 */
function updateTable(table) {
    const http = new XMLHttpRequest();
    const url = 'http://localhost:8082/ids';//demande du tableau d'identifiant
    http.onreadystatechange = function () {
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {//des que la reponse est terminee
            var ids = JSON.parse( http.response);//on recupere les identifiants et pour chaque identifiant non vide
            for (var id=0; id<ids.length;id++){
                if(!(ids[id]===undefined)&&!(ids[id]==null)){
                    var row = table.insertRow(table.length);//on cree une ligne dans laquelle on met
                    const a=id;
                    row.insertCell(0).innerHTML= ids[id];//le nom de l'ascenceur
                    row.insertCell(1).innerHTML='<button> go up </button>';//deux bouttons
                    row.insertCell(2).innerHTML= '<button> go down </button>'
                    row.insertCell(3).innerHTML= "indisponible";//et le status
                    row.cells[1].addEventListener("click",()=> goUp(a));//les bouttons lancent chacun la fonction correspondante avec le bon id
                    row.cells[2].addEventListener("click",()=> goDown(a));
                    getstatus(row.cells[3],a)//puis on met a jour le status
                }
            };
        }
    }
    http.open("GET", url);
    http.setRequestHeader("Content-type", "application/json");
    http.send(null);//envois de la demande
}

/**
 * fonction qui est appelee à interval regulier pour lancer la mise a jour de la table html
 * elle commence par detruire l'interieur de la table puis appelle updateTable
 * @see updateTable
 */
function uptdate() {
    var table = document.getElementById("table");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {//destruction de toutes les lignes sauf la premiere (legende)
        table.deleteRow(tableHeaderRowCount);
    }
    updateTable(table);//construction de la nouvelle table
    setTimeout(() => {uptdate()}, 1000);// rapel de la fonction pour rafraichir la table toute les 1s
}

/**
 * demande le status de l'id en paramettre et met a jour la case correspondante dans la table
 * @param cell case a remplir avec le status
 * @param id id du status a demander
 */
function getstatus(cell,id) {
    const http= new XMLHttpRequest();
    const url='http://localhost:8083/status/'+id;//demande du status de l'id a tous les clients
    //seul le client a l'id correspondant est suppose repondre
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            switch (http.response) {//decodage du status
                case "-1": cell.innerHTML="en decente"; break;
                case "0": cell.innerHTML="en attente"; break;
                case "1": cell.innerHTML="en montee"; break;
                default: cell.innerHTML="indisponible"; break;

            }
        }
    }
    http.open("GET",url);
    http.send(null)//envois de la requete
}


