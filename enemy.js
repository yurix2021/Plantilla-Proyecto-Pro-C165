
AFRAME.registerComponent("enemy-fireballs", {
    init: function () {        
        setInterval(this.shootEnemyMonster, 2000)
    },
    shootEnemyMonster: function () {
        var scene = document.querySelector("#scene");

        //Entidad monstruo enemigo
        var enemyMonster = document.querySelectorAll(".enemy");   
            
        for (var i = 0; i < enemyMonster.length; i++) {

       //Crear bolas de fuego
        var fireball = document.createElement("a-entity");

        fireball.setAttribute("class","fireball")
        fireball.setAttribute("gltf-model", "./models/fireball/scene.gltf");
        fireball.setAttribute("dynamic-body", { mass: 0 });
     
        var pos=enemyMonster[i].getAttribute("position")

        fireball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
        });
        fireball.setAttribute("scale", {
            x: 0.05,
            y: 0.05,
            z: 0.05,
        });

        scene.appendChild(fireball);      

        // AGREGA EL CÓDIGO AQUI
       



        
        /******************************************************************************************* */

        //revisar vidas del jugador
        var element = document.querySelector("#countLife");
        var playerLife = parseInt(element.getAttribute("text").value);

        //eventos de colisión con balas enemigas
        fireball.addEventListener("collide", function (e) {
           
            if (e.detail.body.el.id === "weapon") {               
                if (playerLife > 0) {
                    playerLife -= 1;
                    element.setAttribute("text", {
                        value: playerLife
                    });
                }
                if (playerLife <= 0) {
                    //mostrar texto
                    var txt = document.querySelector("#over");
                    txt.setAttribute("visible", true);

                    //eliminar monstruos
                    var El = document.querySelectorAll(".enemy")
                    for (var i = 0; i < El.length; i++) {
                        scene.removeChild(El)
                    }

                }

            }
        });

    }
    },
    

});
