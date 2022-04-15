let addTocart = document.querySelectorAll('.add-to-cart')

addTocart.forEach((btn) =>{
    btn.addEventListener('click',(e)=>{
        let pizza = btn.dataset.pizza
        console.log(pizza);
    })
   
})