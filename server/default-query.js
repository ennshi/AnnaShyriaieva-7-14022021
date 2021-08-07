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
query getMessagesOfChannel1 {
  messages(input: {channelId: 1, limit: 20, offset: 0}) {
    messages {
      id
      text
      channel {
        id
      }
    }
    count
  }
}
query getMessages {
  messages(input: {limit: 20, offset: 0}) {
    messages {
      id
      text
      channel {
        id
      }
    }
    count
  }
}
mutation createUser {
  createUser(input: {firstName: "Anna", username: "anna1", lastName: "Shi", password: "qwerty1234", isAdmin: false, email: aaa@gmail.com}) {
    ...UserData
  }
}
mutation createChannel {
  createChannel(input: {name: "general", users: [1]}) {
    id
  }
}
mutation createMessage {
  createMessage(input: {text: "New message", channelId: 1, }) {
    id
  }
}
mutation createResponse {
  createMessage(input: {text: "New message", channelId: 1, toMessageId: 1 }) {
    id
  }
}
mutation deleteUser {
  deleteUser(id: 1)
}
mutation deleteResponse {
  deleteMessage(id: 3)
}
mutation deleteParentMessage {
  deleteMessage(id: 1)
}
fragment UserData on User {
  id
  firstName
  lastName
  username
}
`;
