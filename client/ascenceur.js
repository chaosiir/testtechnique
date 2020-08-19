/**
 * classe servant à simuler le fonctionnement d'un ascenceur
 * possede 2 variable state qui indique si l'ascenseur est en mouvement et son id
 */
class Ascenceur {
    state= 0;
    id=this.id;

    /**
     * @constructor
     * @param state etat de l'ascenseur : 0 indique à l'arret
     *                                    1 indique que l'ascenceur monte
     *                                    -1 qu'il descend
     */
    constructor(state){
        this.state=0;
    }

    /**
     * simule la fin des operations hardwares qui sont suposees etres blocantes
     * remet l'ascenseur en attente
     */
    arret(){
        if (this.state==0) {
            console.error("fonction arret alors que l'on est deja a l'arret");
        }
        else {
            this.state=0;
            console.log("ascenseur disponible");
        }
    }

    /**
     * fonction qui fait monter l'ascenceur uniquement si le numero en parametre est iddentique a son id
     * @param num numero de l'ascenseur qui doit monter
     * @returns {number} -1: demande ignoree
     *                    0: demande effectue ,montee demarree
     *                    1: erreur, l'ascenceur n'est pas disponible
     */
    goUp(num){
        if (num!=this.id){
            return -1;
        }
        if(this.state==0){
            this.state=1;
            console.log("debut de montee");
            setTimeout(() => { //executer les fonctions hardwares puis lancer arret directement apres
                this.arret()
            }, 3000);
            return 0;
        }
        console.log("ascenseur non disponible");
        return 1;
    }
    /**
     * fonction qui fait descendre l'ascenceur uniquement si le numero en parametre est iddentique a son id
     * @param num numero de l'ascenseur qui doit descendre
     * @returns {number} -1: demande ignoree
     *                    0: demande effectue ,descente demarree
     *                    1: erreur, l'ascenceur n'est pas disponible
     */
    goDown(num){
        if (num!=this.id){
            return -1;
        }
        if(this.state==0){
            this.state=-1;
            console.log("debut de descente");
            setTimeout(() => {
                this.arret()
            },3000);
            return 0
        }
        console.log("ascenseur non disponible");
        return 1;
    }
}

module.exports =Ascenceur; //utilisation dans client/index.js
