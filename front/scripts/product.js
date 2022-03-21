const productUrl = window.location.href;
const url = new URL(productUrl);
const id = url.searchParams.get("id");


const quantity = document.getElementById("quantity");
const color = document.getElementById('colors');





    getProduct();



function getProduct () {
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .catch((error) => {
            const item = document.querySelector("article");
            item.innerHTML = "Oups, l'API semble ne pas fonctionner !";
            item.style.textAlign = "center";
            item.style.padding = "auto";
        })  

        .then(function(item) {
                const itemImg = document.createElement("img");
                const imgParent = document.querySelector(".item__img");
                imgParent.appendChild(itemImg);
                itemImg.src = item.imageUrl;
                itemImg.setAttribute("alt", item.altTxt);

                const itemTitle = document.getElementById("title");
                itemTitle.innerText = item.name;

                const itemPrice = document.getElementById("price");
                itemPrice.innerText = item.price;

                const itemDescription = document.getElementById("description");
                itemDescription.innerText = item.description;

                for (let i = 0; i < item.colors.length; i++) {
                    const colorChoice = document.createElement("option");
                    colorOption = document.getElementById("colors");
                    colorOption.appendChild(colorChoice);
                    colorChoice.setAttribute("value",item.colors[i]);
                    colorChoice.innerText = item.colors[i];
                } 
        });
}


const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.onclick = addToCart;

function addToCart() {
        let productsDetails = { 
            id: id, 
            color: color.value, 
            quantity: quantity.value
        }
        
        let productsArray = [];

        if(localStorage.getItem("products") !== null) {
            productsArray = JSON.parse(localStorage.getItem("products"));
            
        }

        const sameIdAndColor = productsArray.findIndex(function (product) {
            return (product.id === productsDetails.id && product.color === productsDetails.color)
        })

        if(sameIdAndColor === -1) {
            productsArray.push(productsDetails); 
        } 
            else {
                productsArray[sameIdAndColor].quantity = productsDetails.quantity;
            }

        const ObjDescriptor = Object.getOwnPropertyDescriptors(productsDetails);
        const NoColor = ObjDescriptor.color.value;
        const NoQuantity = ObjDescriptor.quantity.value;
        
        if(NoColor == "") {
            productsArray.pop();
        } 
            else if(NoQuantity <= 0) {
                productsArray.pop();
            }
        
        localStorage.setItem("products", JSON.stringify(productsArray));
        
}

