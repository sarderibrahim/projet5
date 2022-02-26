//////////  Récupération des données ours en peluches avec l'API fetch.

fetch('http://localhost:3000/api/teddies')
  .then((response) => response.json())
  .then((response) => {
  
    console.log(response);

    //Je créer ma variable que je vais ajouter à mes elements
    let html = "";

    // Boucle pour récupére toutes les variables des produits + (Foreach)
    for(let i = 0; i < response.length; i++) {
      console.log(response[i].name);
      
      //Html pur , Créer les élément, clone prototype
      html += `<li class="item">
      <h2 class="row">${response[i].name}</h2>
      <p class="row"><img src="${response[i].imageUrl}" alt="Images ours" style= "width:28rem; border-radius:5px;"></p>
      <p class="row">${response[i].description}</p>
      <p class="row">${(response[i].price/100).toFixed(2).replace(".",",")}€</p>
      <a class="row" href="./produit.html?${response[i]._id}" style= "background-color:#f3e9f1; box-shadow: 0px 0px 12px 0px white; margin:auto; width:100px; border-radius:15px; padding:10px;"><b>Voir l'article</b></a></li>`
    }
    
     // Ajouter mes element créer dans le HTML pour afficher mes produits
    document.getElementById("bear").innerHTML = html
})

// Message d'erreur
.catch(e => {
  errorMessage();
});