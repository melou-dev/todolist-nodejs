# TODOLIST node.js

https://github.com/HachemiH/todo-app-node/tree/13-add-findAll-request-in-home-get-request-display-in-console


## 1 - Initiation du projet (git + npm)

* mkdir todolist
* git init
* npm init -y
* commit (add + commit)


## 2 - Installation d'Express

* touch .gitignore
* code .gitignore

dans le fichier `node_modules/`

* commit (add + commit)

* npm install express
* commit (add + commit)


## 3 - Initiation d'Express

* touch app.js
* code app.js

dans le fichier app.js 

Création de la dépendance à l'api express
```
const express = require("express);
```

Mise en action des modules express à l'appel de l'url.
```
const app = express();
const port = 4000;

app.listen(port);
```


**option**
dans une nouvelle page de terminal
* node app.js
* nodemon app.js

ou

package.json
{
  "name": "todo-list-nodetest",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "dev": "nodemon app.js"
  },
  "author": "",
  "license": "ISC"
}

puis dans le terminal à la suite de code app.js
* commit


## 4 - Création de la première route sur la page d'accueil (get)

la fonction est exécutée lorsqu'est appelée page.html et crée un chemin
Cette méthode permet de récupérer les éléments figurant dans l’url (req pour "request"), et les afficher  à l'adresse url indiquée, page principale "/" (res pour "response").

Dans app.js
```
app.get("/", (req, res) => {
    res.send("Welcome to todo app node");
});
```
ouvrir navigation : localhost:port pour voir afficher "Welcome to todo app node" sur le navigateur.
npm run dev dans un autre terminal.

* commit


## 5 - Coller le template Bootstrap de la todo dans le get de l'accueil

Copier/coller Bootstrap
https://github.com/HachemiH/todo-app-node
étape 5 dans `res.send(`COLLER`)`

* Regarder si la liste apparait dans le navigateur
* commit


## 6 - Création d'une première requête post + test avec Postman

la fonction est exécutée lorsqu'est appelée page.html et crée un chemin.
Cette méthode permet de récupérer les nouvelles entrées figurant dans l’url (req pour "request"),  et d'envoyer ces éléments vers le serveur (res pour "response"). Postman permet de vérifier que la route est bien créée.

dans app.js
```
app.post("/", (req, res) => {
    res.send("form successfully transmitted!!!");
});
```
* commit

## 7 - Cabler le formulaire avec la requête post

Cette méthode est un analyseur de code. On indique dans le code: activer lorsque le page "/" est appelé la méthode POST pour input du formulaire nommé "item". On le teste ensuite dans le terminal.

dans app.js après les "const"
```
app.use(express.urlencoded({ extended: false }));
```

dans app.js code HTML
```
<form action="/" method="POST">
<input name="item" autofocus 
```

dans app.js -POST REQUEST
tester input :
```
app.post("/", (req, res) => {
    console.log(req.body.item);
    res.send("Form successfully transmitted !!!");
```
En saisissant une entrée dans l'URL en input, il va apparaitre dans le terminal.
Question : pourquoi "Form successfully transmitted apparaît-il dans la page et aussi dans postman ?

## Préparer la base de donnée (postgreSQL)

sudo -i -u postgres
ou
pgcli
\l

CREATE USER todolistnodejs; 
\du
CREATE DATABASE todolistnodejs;
\l
ALTER DATABASE todolistnodejs OWNER TO todolistnodejs; 

ALTER USER todolistnodejs WITH PASSWORD 'testtodo';

\q

pgcli -U todolistnodejs
\conninfo

```
todolistnodejs> CREATE TABLE Items ( 
 id bigserial not null primary key, 
 item varchar(200));                                                                                                                          
CREATE TABLE
Time: 0.046s
todolistnodejs> select * from "items";                                                                                                        
+------+--------+
| id   | item   |
|------+--------|
+------+--------+
SELECT 0
Time: 0.013s
todolistnodejs> INSERT INTO Items(item) VALUES('bonjour');                                                                                    
INSERT 0 1
Time: 0.002s
todolistnodejs> select * from "items";                                                                                                        
+------+---------+
| id   | item    |
|------+---------|
| 1    | bonjour |
+------+---------+
SELECT 1
Time: 0.010s
todolistnodejs>  
```

```
newtodolist> ALTER TABLE items ADD COLUMN "createdAt" timestamp;                                                                              
You're about to run a destructive command.
Do you want to proceed? (y/n): y
Your call!
ALTER TABLE
Time: 0.008s
newtodolist> ALTER TABLE items ADD COLUMN "updatedAt" timestamp;                                                                              
You're about to run a destructive command.
Do you want to proceed? (y/n): y
Your call!
ALTER TABLE
Time: 0.004s
newtodolist> select * from "items";                                                                                                           
+------+---------+-------------+-------------+
| id   | item    | createdAt   | updatedAt   |
|------+---------+-------------+-------------|
| 1    | bonjour | <null>      | <null>      |
+------+---------+-------------+-------------+
SELECT 1
Time: 0.011s
```

## Installer l'ORM Sequelize + initialisation de Sequelize + test de connection

https://sequelize.org/v5/manual/getting-started.html

dans app.js
```
const Sequelize = require("sequelize");
```

```
const db = new Sequelize("todolistnodejs", "todolistnodejs", "testtodo", {
  host: "localhost",
  dialect: "postgres"
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
```
Pour tester, saisir un input sur le localhost pour affichage du message et mot saisi dans le terminal.


## Déplacer les informations de connection à la base de donnée dans config/database.js

mkdir config
touch config/database.js
code config/database.js

Pour lier app.js et database.js couper/coller le code suivant de app.js dans ce fichier, et changer `const db` par `module.exports`.
```
const Sequelize = require("sequelize");

module.exports = new Sequelize("newtodolist", "newtodolist", "123", {
    host: "localhost",
    dialect: "postgres"
  });
```
dans app.js,
```
const db = require("./config/database");
```
* commit


## Création du model Item + cablage d'une requête Sequelize findAll dans la requête post

mkdir models
touch models/Item.js
code models/Item.js

dans Items.js
```
const Sequelize = require("sequelize");
const db = require("../config/database");

const Item = db.define("item", {
    item: {
        type: Sequelize.STRING
    }
});

module.exports = Item;
```

dans app.js
```
const item = require("./models/Item");
```
et 
```
app.post("/", (req, res) => {
    Item.findAll().then(items => {
        console.log("All items:", JSON.stringify(items, null, 4));
    });
    res.send("form successfully transmetted")
});
```

## Modification de la requête post pour insertion du contenu de l'input dans la bdd avec Sequelize

dans app.js
```
app.post("/", (req, res) => {
  Item.create({
    item: req.body.item
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});
```

## Ajouter un findAll de Sequelize dans la requête get de l'accueil et afficher le contenu dans la console

```
app.get("/", (req, res) => {
  Item.findAll().then(items => {
    console.log(items);
  });
  
    res.send(`<!DOCTY
```
text en rouge ok.

## Déplacer le template Bootstrap HTML dans la requête findAll à la place de la ligne console.log

```
app.get("/", (req, res) => {
  Item.findAll().then(items => {
    res.send(`<!DOCT
```

## Remplacer les items écrit en dur dans le template HTML par ceux enregistrés en bdd

Dans app.js bootstap
```
<ul>
${items
            .map(function(item) {
              return `
                <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                  <span class="item-text">${item.dataValues.item}</span>
                  <div>
                    <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                    <button class="delete-me btn btn-danger btn-sm">Delete</button>
                  </div>
                </li>`;
            })
            .join("")}
</ul>
```

## Création du fichier statique edit.js dans public + ajout d'un écouteur d'évènement click sur le bouton Edit

mkdir public
mkdir cd public
mkdir js
touch js/edit.js

Dans js/edit.js
```
document.addEventListener("click", function(e){
    if (e.target.classlist.contains("edit-me")) {
        alert("click OK on Edit button");
    }
});
```

## Ajout d'un prompt dans l'écouteur d'évènement + affichage du contenu dans la console du navigateur

Dans app.js
```
app.use(express.static("public"));
```
et 
```
 </div>
      <script src="/js/edit.js></script>
    </body>
    </html>`)
```

## Ajout du CDN de la librairie Axios dans le template Bootstrap

Computer Network Defense.
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## Ajout d'une requête post pour l'url /update-item

```
app.post("/", (res, req) => {
  res.send("Test update successfull")
})
```

## Ajout d'une requête post depuis edit.js avec Axios qui renvoi le contenu du prompt au serveur + test dans la console de Node

ajouter un middleware dans app.js `app.use(express.json());`
* Exécuter tout type de code.
* Apporter des modifications aux objets de demande et de réponse.
* Terminer le cycle de demande-réponse.
* Appeler la fonction middleware suivant dans la pile.

Dans edit.js
```
    let userInput = prompt("Veuillez entrer votre nouvelle tâche ...");
    console.log(userInput);
    axios
      .post("/update-item", { itemUpdated: userInput })
      .then()
      .catch(err => {
        console.log(err);
      });
  }
  }
});
});
```

## Cabler le bouton Edit pour l'édition de l'item en base de données (récupération de l'id + modification) warning Rechargement obligatoire pour afficher les nouvelles valeurs !!!!

dans app.js
```
<button data-id="${item.dataValues.id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
```

```
app.post("/update-item", (req, res) => {
    Item.update(
      { item: req.body.itemUpdated },
      {
        where: {
          id: req.body.id
        }
      }
    );
  });
```

dans edit.js
```
axios
  .post("/update-item", { 
    itemUpdated: userInput,
      id: e.target.getAttribute("data-id")
        })
```

## Cabler le bouton Delete pour la suppression de l'item en base de données (récupération de l'id + suppression) warningRechargement obligatoire pour afficher les nouvelles valeurs !!!!






