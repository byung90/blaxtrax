
const joinTable = async (tableId, userId) => {
  const joinTableObject = {
    tableId: tableId,
    userId, userId
  }

  const joinTableData = await fetch('/api/gameRoutes/joinTable', {
    method: 'PUT',
    body: JSON.stringify(joinTableObject),
    headers: { "Content-Type": "application/json" }
  });

  if (joinTableData.ok) {
    console.log(joinTableData);
  }
}