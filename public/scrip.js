const deleteCard = document.querySelectorAll(".deleteButton")
const updateCard = document.querySelectorAll(".update")
for(let i = 0; i < deleteCard.length; i++){


deleteCard[i].addEventListener("click", (e) => {

  fetch("/services/" + deleteCard[i].id, {
    method: "DELETE",
    headers: { "Content-Type" : "application/json"},
  })
  .then((response) => {
  console.log("Deleted Successfully!")
  if(response.redirected){
    window.location.href = response.url;
  }
  else{
    window.location.href = "/admin/services"
  }
  });
});
}
for(let i = 0; i<updateCard.length; i++){
  updateCard[i].addEventListener("submit", (e) => {
  e.preventDefault();
    const updateData = new FormData(updateCard[i]);
    const reqBody=Object.fromEntries(updateData);
    
    fetch("/services/" + updateCard[i].dataset.id, {
      method: "PATCH",
      headers: { "Content-Type" : "application/json"},
      body:JSON.stringify(reqBody),
    })
    .then((response) => {
    console.log("Update  Successfully!")
    if(response.redirected){
      window.location.href = response.url;
    }
    else{
      window.location.href = "/admin/services"
    }
    });
  });
}