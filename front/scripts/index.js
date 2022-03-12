
allProducts();


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
        
        .then(function(products) {
            console.log(products);
            for(let product in products) {
                const itemLink = document.createElement("a");
                document.querySelector("#items").appendChild(itemLink);
                itemLink.href = `./product.html?id=${products[product]._id}`;
                
                const productArticle = document.createElement("article");
                itemLink.appendChild(productArticle);

                const productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = products[product].imageUrl;
                productImg.setAttribute("alt", products[product].altTxt);

                const productTitle = document.createElement("h3");
                productArticle.appendChild(productTitle);
                productTitle.classList.add("productName");
                productTitle.src = products[product].name;
                productTitle.innerText = productTitle.src;

                const productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productDescription");
                productDescription.src = products[product].description;
                productDescription.innerText = productDescription.src;

            }
        });
}