module.exports = `
query login {
  login(input: {username: "anna1", password: "qwerty1234"})
}
query getUser {
  user(id: 1) {
    ...UserData
  }
}
query getUsers {
  users {
    ...UserData
    password
  }
}
mutation createUser {
  createUser(input: {firstName: "Anna", username: "anna1", lastName: "Shi", password: "qwerty1234", isAdmin: false}) {
    ...UserData
  }
}
fragment UserData on User {
  id
  firstName
  lastName
  username
}
`;
