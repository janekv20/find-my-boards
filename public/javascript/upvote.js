
async function upvoteClickHandler(event) {    

  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch("/api/ranks", {
    method: "post",
    body: JSON.stringify({
      game_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    document.location.replace("/login");
  }
}

document
  .querySelector(".upvote-btn")
  .addEventListener("click", upvoteClickHandler);
