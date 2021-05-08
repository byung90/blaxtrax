console.log("Hello");
fetch("/api/leaderBoard", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
//questions
