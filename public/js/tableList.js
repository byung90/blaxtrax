console.log("working");
fetch("/api/tableRoutes", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

fetch("/api/tableRoutes/:id", {
  method:"GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });