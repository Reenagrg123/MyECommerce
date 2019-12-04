


function getCurrentUserOrder() {
  var userSession = JSON.parse(localStorage.getItem("userSession"));
  const username = userSession.username;
  const password = userSession.password;
  var users = JSON.parse(localStorage.getItem("Users"));
  var currentUser = users.find(
    (user) =>
      user.username == userSession.username &&
      user.password == userSession.password
  );

  const currentUserId = currentUser.userId;
  var orders = JSON.parse(localStorage.getItem("orders"));
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].userId === currentUserId) {
      return i;
    }
  }
}

export {getCurrentUserOrder};