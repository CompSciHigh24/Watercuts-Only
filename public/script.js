const createForm = document.querySelector("form");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const appointmentsData = new FormData(createForm);
  const reqBody = Object.fromEntries(appointmentsData);

  fetch("/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/appointments";
  });
});

const deleteCard = document.querySelectorAll(".deleteButton");

for (let i = 0; i < deleteCard.length; i++) {
  deleteCard[i].addEventListener("click", (e) => {
    fetch("/appointments/" + deleteCard[i].id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log("Deleted Successfully!");
      if (response.redirected) {
        window.location.href = response.url;
      } else {
        window.location.href = "/appointments";
      }
    });
  });
}
