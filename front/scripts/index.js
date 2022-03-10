main();

function main() {
    allProducts();
}

function allProducts () {
    fetch("http://localhost:3000/api/products")
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((error) => {
            const items = document.querySelector(".items");
            items.innerHTML = "Oups ! Une erreur s'est produite !";
            items.style.textAlign = "center";
            items.style.padding = "auto";
        })
        
        .then(function(showApi) {
            const products = showApi;
            console.log(products);
            for(let product in products) {
                let itemLink = document.createElement("a");
                document.querySelector("#items").appendChild(itemLink);
                itemLink.href = `./product.html?id=${showApi[product]._id}`;
                
                let productArticle = document.createElement("article");
                itemLink.appendChild(productArticle);

                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = showApi[product].imageUrl;
                productImg.setAttribute("alt", showApi[product].altTxt);

                let productTitle = document.createElement("h3");
                productArticle.appendChild(productTitle);
                productTitle.classList.add("productName");
                productTitle.src = showApi[product].name;
                productTitle.innerText = productTitle.src;

                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productDescription");
                productDescription.src = showApi[product].description;
                productDescription.innerText = productDescription.src;
            }
        })
}