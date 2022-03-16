const productUrl = window.location.href;
const url = new URL(productUrl);
const id = url.searchParams.get("id");

const addToCartBtn = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");
const color = document.getElementById('colors');



/*let productsArray = JSON.parse(localStorage.getItem("products"));

if (productsArray == null ) {
    productsArray = [];
}
productsArray.push(productsDetails);
localStorage.setItem("products", JSON.stringify(productsArray));

console.log(productsArray);*/

/*let productsArray = JSON.parse(localStorage.getItem("products"));

if(productsArray) {
    productsArray.push(productsDetails);
    localStorage.setItem("products", JSON.stringify(productsArray));
    


} else {
    productsArray = [];
    productsArray.push(productsDetails);
    localStorage.setItem("products", JSON.stringify(productsArray));
}

console.log(productsArray)*/

main();

function main() {
    getProduct();
    addToCart();
}


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

function addToCart() {
    /*let productsArray = [];*/

    addToCartBtn.onclick = () => {
        let productsDetails = {
            id: id, 
            color: color.value, 
            quantity: quantity.value,
        };
        
        let productsArray = [];

        if(localStorage.getItem("products") !== null) {
            productsArray = JSON.parse(localStorage.getItem("products"));
        }
            productsArray.push(productsDetails);
            localStorage.setItem("products", JSON.stringify(productsArray));


        if(productsDetails.id === productsArray.id) {
            productsArray.push(productsDetails.quantity++);
        }
        console.log(productsArray)

        

    };
}

