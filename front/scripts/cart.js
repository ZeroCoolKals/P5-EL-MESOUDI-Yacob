
let getProductsInArray = JSON.parse(localStorage.getItem("products")); 
let totalQuantityValue = 0;
const totalQuantity = document.getElementById("totalQuantity");

const totalPrice = document.getElementById("totalPrice");
let totalPriceValue = 0;




ArrayDetails();



async function ArrayDetails() {
    const list = await fetch(`http://localhost:3000/api/products`)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }
        })
        
        .catch (() => {
            const errorMessage = document.querySelector("#cart__items");
            errorMessage.innerHTML = "Oups, l'API semble ne pas fonctionner !";
            errorMessage.style.textAlign = "center";
            errorMessage.style.padding = "auto";
        })
        
        getProductsInArray.forEach((productInCart, indexOfProductInCart) => {
            const item = list.find(element => element._id === productInCart.id);

            if(item) {
                const productsArticle = document.createElement("article");
                const articleParent = document.querySelector("#cart__items");
                articleParent.appendChild(productsArticle);
                productsArticle.classList.add("cart__item");
                productsArticle.setAttribute("data-id", productInCart.id);
                productsArticle.setAttribute("data-color", productInCart.color);
                const imgDiv = document.createElement("div");
                productsArticle.appendChild(imgDiv);
                imgDiv.classList.add("cart__item__img");

                const img = document.createElement("img");
                imgDiv.appendChild(img);
                img.src = item.imageUrl;
                img.setAttribute("alt", item.altTxt);

                const content = document.createElement("div");
                productsArticle.appendChild(content);
                content.classList.add("cart__item__content");

                const contentDescription = document.createElement("div");
                content.appendChild(contentDescription);
                contentDescription.classList.add("cart__item__content__description");

                const titlePrice = document.createElement("div");
                contentDescription.appendChild(titlePrice);
                titlePrice.classList.add("cart__item__content__titlePrice");

                const productTitle = document.createElement("h2");
                titlePrice.appendChild(productTitle);
                productTitle.innerText = item.name;

                const productColor = document.createElement("p");
                titlePrice.appendChild(productColor);
                productColor.innerText = productInCart.color;
                
                const productPrice = document.createElement("p");
                const getPrice = item.price;
                titlePrice.appendChild(productPrice);
                const euroFormat = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(getPrice*(productInCart.quantity));
                productPrice.innerText = euroFormat;

                const settings = document.createElement("div");
                productsArticle.appendChild(settings);
                settings.classList.add("cart__item__content__settings");

                const quantity = document.createElement("div");
                settings.appendChild(quantity);
                quantity.classList.add("cart__item__content__settings__quantity");

                const quantityP = document.createElement("p");
                const quantityDetails = document.createElement("input");
                quantity.appendChild(quantityP);
                quantity.appendChild(quantityDetails);
                quantityP.innerHTML = "Qté :";

                quantityDetails.type = 'number';
                quantityDetails.className = 'itemQuantity';
                quantityDetails.name = 'itemQuantity';
                quantityDetails.min = '1';
                quantityDetails.max = '100';
                quantityDetails.setAttribute("value", productInCart.quantity);

                totalQuantityValue = totalQuantityValue+parseInt(productInCart.quantity);
                totalQuantity.innerHTML = totalQuantityValue;

                

                quantityDetails.addEventListener('change', function (e) {
                    const euroFormat = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"}).format(getPrice*quantityDetails.value)
                    productPrice.innerText = euroFormat;

                    getProductsInArray.forEach(element => {
                        if(element.id === productInCart.id) {
                            element.quantity = e.target.value;
                        }
                    });
                    localStorage.setItem("products", JSON.stringify(getProductsInArray));
                });


                const deleteProduct = document.createElement("div");
                const deleteProductP = document.createElement("p");
                productsArticle.appendChild(deleteProduct);
                deleteProduct.className = "cart__item__content__settings__delete";
                deleteProduct.appendChild(deleteProductP);
                deleteProductP.className = "deleteItem";
                deleteProductP.innerHTML = "Supprimer";

                const parent = document.getElementById("cart__items");
                deleteProductP.addEventListener("click", () => {
                    parent.removeChild(quantityDetails.closest(".cart__item"));
                    getProductsInArray.splice(indexOfProductInCart, 1);
                    localStorage.setItem("products", JSON.stringify(getProductsInArray));
                    
                })
                
            }
        })               
}


const order = document.getElementById("order");
const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");

const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");

const address = document.getElementById("address");
const addressError = document.getElementById("addressErrorMsg");

const city = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");

const validateFirstAndLastNameAndCity = /^[a-zA-ZéèîÏÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîÏÉÈÎÏ][a-zéèêàçîï])?/;
const validateAdress = /^[0-9]*[\s][a-zA-Z][a-zA-ZéèîÏÉÈÎÏ]+([-'\s][a-zA-ZéèîÏÉÈÎÏ][a-zéèêàçîï])?/;
const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const email = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");


function checkForm() {
    order.addEventListener('click', (e) => {
        if(validateFirstAndLastNameAndCity.test(firstName.value) == false) {
            firstNameError.textContent = 'Format incorrect !';
            firstNameError.style.color = '#ffff';
            e.preventDefault();
        }
        else {
            firstNameError.textContent = "";
        }

        if(validateFirstAndLastNameAndCity.test(lastName.value) == false) {
            lastNameError.textContent = 'Format incorrect !';
            lastNameError.style.color = '#ffff';
            e.preventDefault();
        }
        else {
            lastNameError.textContent ="";
        }

        if(validateAdress.test(address.value) == false) {
            addressError.textContent = 'Format incorrect !';
            addressError.style.color = '#ffff';
            e.preventDefault();
        }
        else {
            addressError.textContent = "";
        }

        if(validateFirstAndLastNameAndCity.test(city.value) == false) {
            cityError.textContent = 'Format incorrect !';
            cityError.style.color  ='#ffff';
            e.preventDefault();
        }
        else {
            cityError.textContent = "";
        }

        if(validateEmail.test(email.value) == false) {
            emailError.textContent = "Format de l'email incorrect";
            emailError.style.color = '#ffff';
            e.preventDefault();
        }
        else {
            email.textContent = "";
        }
    })
}
checkForm();
