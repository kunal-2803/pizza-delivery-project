import axios from 'axios'
import Noty from 'noty'
let addTocart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelectorAll('#cartCounter')

    function updateCart(pizza){
        axios.post("/update-cart",pizza).then((res)=>{
            cartCounter.innerText = res.data.totalQty
            new Noty({
                type: 'success',
                timeout: 1000,
                text:'item added to cart',
                progressBar:false
            }).show();
            console.log(res)
        }).catch(err=>{
            new Noty({
                type: 'error',
                timeout: 1000,
                text:'Someting Went wrong',
                progressBar:false
            }).show();
        })
    }

addTocart.forEach((btn) =>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        // console.log(pizza);
        updateCart(pizza);
    })
   
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}
