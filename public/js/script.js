const submitForm = async () => {
  try {
    const formData = {
      title: $("#title").val(),
      subTitle: $("#subTitle").val(),
      path: $("#path").val(),
      description: $("#description").val()
    };

    const response = await fetch("/api/cards", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      addCards(data);
    } else {
      console.error("Failed to submit form:", response.statusText);
    }
  } catch (err) {
    console.error("Error submitting form:", err);
  }
};

const getAllCats = async () => {
  try {
    const response = await fetch("/api/cards");
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Failed to fetch cards:", response.statusText);
      return [];
    }
  } catch (err) {
    console.error("Error fetching cards:", err);
    return [];
  }
};

const addCards = (cards) => {
  const cardSection = $("#card-section");
  cardSection.empty();
  cards.forEach((card) => {
    const cardElement = `
      <div class="col s4 center-align">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${card.path}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${card.title}<i class="material-icons right">more_vert</i></span>
            <p><a href="#">Find nearby restaurants</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Description about food<i class="material-icons right">close</i></span>
            <p class="card-text">${card.description}</p>
          </div>
        </div>
      </div>`;
    cardSection.append(cardElement);
  });
};

const socket = io();
  socket.on('number',(msg)=>{
    console.log('Random Number: ' + msg);
});

$(document).ready(() => {
  $(".materialboxed").materialbox();
  $("#formSubmit").click(submitForm);
  $(".modal").modal();

  getAllCats().then(addCards);
});
