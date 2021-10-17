// connect to Moralis server
Moralis.initialize("mB21k5LGo1h4h55cGnStPm3W4ja54Zehs27HQvAn"); // App ID
Moralis.serverURL = "https://0pvxfa2x0kq2.grandmoralis.com:2053/server"; // server url

// add from here down
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate();
  }
  console.log("logged in user:", user);
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("mm-login").onclick = login;
