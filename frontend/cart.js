let boxSection = document.querySelector("#item__select");
// variable quantité 0
let total = 0;
// Appel ma function affichage du panier
displayQuantity()

// Contenu du panier, des boutons de suppression et d'annulation du panier ainsi que du formulaire de contact 
function displayQuantity() {

    if (localStorage.getItem('anyItem') !== null) {

        let items = JSON.parse(localStorage.getItem('anyItem'));
        total = 0; //initialisation du total à 0

        boxSection.insertAdjacentHTML("afterbegin",
            `<h1>Panier</h1>
            <table>
                <thead>
                    <tr>
                        <th>Articles</th>              
                        <th>Nom</th>
                        <th>Couleurs</th>
                        <th>Nombre<br>d'articles</th>
                        <th>Prix</th>
                    </tr>
                </thead>
                <tbody class="order__details">
                </tbody>
            </table>`
        );
        
        let html = "";
        // Affichage des articles + prix + quantité
        items.forEach( (product, index) => {
            
            total = total + (product.price * product.quantity);

            html +=`<tr>
                        <td class="old"><img src="${product.imageUrl}" alt="ours peluche" style="width:100px;"></td>
                        <td class="old">${product.name}</td>
                        <td class="old">${product.selectColors}</td>
                        <td class="old" style="padding-left:50px;"><button class="decrease__item ${index}" style=" background-color:white; padding:0 5px 0 5px;"> - </button>
                        ${product.quantity}
                        <button class="increase__item ${index}" style="background-color:white; padding:0 5px 0 5px;"> + </button></td>
                        <td class="old" style="padding-left:50px;">${(product.price * product.quantity/100).toFixed(2).replace(".",",")}€</td>
                        <td><button class="delete__item ${index}" style="background-color:white; padding:0 5px 0 5px;">Supprimer</button></td>
                    </tr>`
            document.querySelector(".order__details").innerHTML = html;
        })

        //Total prix + boutton annuler commande    
        boxSection.insertAdjacentHTML("beforeend",
            `<div class="total" style="margin-left:5%;">
                <p class="cart-section" style="margin-right:5%;"><b>Total: ${(total/100).toFixed(2).replace(".",",")}€</b></p>
                <button class="cancel__ordered" style="border:0; background-color:#f3e9f1; border-radius:15px;          box-shadow: 0px 0px 8px 0px white; margin-left:5%;">
                    <p>Annuler le panier</p>
                </button>
            </div>`
        );
        // Formulaire
        boxSection.insertAdjacentHTML("beforeend",
            `<h2 style="margin-top:30px;">Veuillez remplir le formulaire ci-dessous avant de valider votre commande</h2>
                <form class="contact__form" action="post" type="submit">
                    <div class="details__form">
                        <label for="firstname">PRENOM</label>
                        <input type="text" name="firstname" id="firstname" placeholder="Julien" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
                    </div>
                    <div class="details__form">
                        <label for="name">NOM</label>
                        <input type="text" name="name" id="name" placeholder="Lemaire" maxlength="25" pattern="[a-zA-ZÀ-ÿ]{2,}" required />
                    </div>
                    <div class="details__form">
                        <label for="address">ADRESSE</label>
                        <input type="text" name="address" id="address" placeholder="33 rue Lefort" maxlength="50" required />
                    </div>
                    <div class="details__form">
                        <label for="city">VILLE</label>
                        <input type="text" name="city" id="city" placeholder="Monteville" maxlength="50" pattern="[A-Za-z]{2,}" required />
                    </div>
                    <div class="details__form">
                        <label for="email">EMAIL</label>
                        <input type="email" name="email" id="email" placeholder="Veulliez entrer une adresse valide: adressemail@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" required />
                    </div>
                    <button class="validate" id="submit" style="border:0; background-color:#f3e9f1; border-radius:15px;  box-shadow: 0px 0px 8px 0px white; margin: 30px 0 0 45%;">
                        <p>Valider vôtre commande</p>
                    </button>
                </form>`
        );

        // L'ecoute du boutton -
        const decreaseItem = document.querySelectorAll(".decrease__item ");
        decreaseItem.forEach((btn) => {

            btn.addEventListener('click', e => {
            removeOneItem(e, items);
            })
        })
        // L'ecoute des bouttons +
        const increaseItem = document.querySelectorAll(".increase__item");
        increaseItem.forEach((btn) => {

            btn.addEventListener('click', e => {
            addOneItem(e, items);
            })
        })
        //supprimer
        const deleteItem = document.querySelectorAll(".delete__item");
        deleteItem.forEach((btn) => {

            btn.addEventListener('click', e => {
            deleteItemSelect(e, items);
            });
        });
        //annuler
        const cancelOrdered = document.querySelector(".cancel__ordered");
        cancelOrdered.addEventListener('click', () => {
            cancelMyOrdered();
        });

        //validation formulaire
        const form = document.querySelector(".contact__form");
        form.addEventListener('submit', e => {
            e.preventDefault();
            sendform();
        });

        //Sinon, Panier vide
    } else {
        boxSection.insertAdjacentHTML("afterbegin",
            `<h2>Panier</h2>
            <p class="cart-section" style="font-size:25px;">
                Vous n'avez aucun article!<a href="./index.html"><b>Revenir à la page d'accueil</b></a>
            </p>`
        )
    }
}

// =====================================================================================

// Ajoute "1" d'un article
function addOneItem(e, items) {
    let index = e.target.classList[1].slice(-1);
    items[index].quantity++;
    localStorage.setItem('anyItem', JSON.stringify(items));
    updateNumberArticles();
}

// =====================================================================================

// Enlève "1" d'un article, en arrivant à zéro il est supprimé
function removeOneItem(e, items) {
    let index = e.target.classList[1].slice(-1);
    items[index].quantity--;
    
    if (items[index].quantity <= 0) {
        items.splice(index, 1);       
        if (items.length === 0 ) {
            localStorage.removeItem('anyItem');
        } else {
            localStorage.setItem('anyItem', JSON.stringify(items));
        }
    } else {
        localStorage.setItem('anyItem', JSON.stringify(items));
    }
    updateNumberArticles();
}

// =====================================================================================
 
//Supprime l'article sélectionné.
//Récupère l'index de l'article correspondant avec le caractère du nom de la classe. 
//Supprime le bon article dans le tableau "items" du localStorage
function deleteItemSelect(e, items) {
    let index = e.target.classList[1].slice(-1);
    items.splice(index, 1);
    localStorage.setItem('anyItem', JSON.stringify(items));

    if (items.length === 0) {
        localStorage.removeItem('anyItem');
    }
    updateNumberArticles();
}

// =====================================================================================

//Annulation tout le panier
function cancelMyOrdered() {
    localStorage.removeItem('anyItem');
    updateNumberArticles();
}

// =====================================================================================

//Réinitialise la section "item__select" et le nombre d'article dans le panier
function updateNumberArticles() {
    boxSection.innerHTML = "";
    displayQuantity();
    itemConfirmation();
}

// =====================================================================================

//Récupère les valeurs de l'input dans contact__form
//Récupère les id des produits du panier dans le tableau products
//L'objet contact et le tableau products sont envoyé dans la function postOrder
function sendform() {
    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("name").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };

    let products = [];
    if (localStorage.getItem('anyItem') !== null) {
        let productTab = JSON.parse(localStorage.getItem('anyItem'));
        
        productTab.forEach( p => {
            products.push(p._id);
        })
    }
    
    let contactItems = JSON.stringify({
        contact, products
    })
    postOrder(contactItems);
};
// =====================================================================================

//Requête POST, envoi au serveur "contact" et le tableau d'id "products"
//Enregistre l'objet "contact" et Id, le total de la commande sur le localStorage.
//Envoie page "confirmation"
function postOrder(contactItems) {

    fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode:'cors',
        body: contactItems
    }).then(response => {

        return response.json();

    }).then( r => {
        localStorage.setItem('contact', JSON.stringify(r.contact));
        localStorage.setItem('orderId', JSON.stringify(r.orderId));
        localStorage.setItem('total', JSON.stringify(total));
        localStorage.removeItem('anyItem');
        window.location.replace("./confirmation.html");
    })
    .catch((e) => {
        displayError();
        console.log(e);
    })
}