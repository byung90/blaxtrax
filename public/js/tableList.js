console.log("working");
fetch("/api/tableRoutes", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });