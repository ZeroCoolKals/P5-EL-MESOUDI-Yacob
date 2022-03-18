
const getProductsInArray = JSON.parse(localStorage.getItem("products")); 

console.log(getProductsInArray)


productsInArray();

function productsInArray() {
    fetch(`http://localhost:3000/api/products`)
        .then(function(res) {
            if (res.ok){
                return res.json();
            }
        })
        
        .catch((error) => {
            const item = document.querySelector("#cart__items");
            item.innerHTML = "Oups, l'API semble ne pas fonctionner !";
            item.style.textAlign = "center";
            item.style.padding = "auto";
        })

        .then(function(products) {
            for(let i = 0; i < getProductsInArray.length; i++) {
                const productsArticle = document.createElement("article");
                const articleParent = document.querySelector("#cart__items");
                articleParent.appendChild(productsArticle);

                const imgDiv = document.createElement("div");
                productsArticle.appendChild(imgDiv);
                imgDiv.classList.add("cart__item__img");

                const img = document.createElement("img");
                imgDiv.appendChild(img);
                img.src = products[i].imageUrl;
                img.setAttribute("alt", products[i].altTxt);

                const content = document.createElement("div");
                productsArticle.appendChild(content);
                content.classList.add("cart__item__content");

                const contentDescription = document.createElement("div");
                content.appendChild(contentDescription);
                contentDescription.classList.add("cart__item__content__description");

                const titlePrice = document.createElement("div");
                contentDescription.appendChild(titlePrice);
                titlePrice.classList.add("cart__item__content__titlePrice");

                const productTitle = document.createElement("p");
                titlePrice.appendChild(productTitle);
                productTitle.innerText = products[i].name;

                const productPrice = document.createElement("p");
                titlePrice.appendChild(productPrice);
                productPrice.innerText = products[i].price;
                parseInt(products[i].price);
                
                
                



            }
            



        })
}