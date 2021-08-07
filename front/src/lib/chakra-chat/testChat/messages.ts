const DEFAULT_MESSAGES = [
  {
    _id: 1,
    text: "This is a new message 1",
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 2,
    text: "This is a new message 2",
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 3,
    text: "This is a new message 3",
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 4,
    text: "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT 4",
    createdAt: new Date(Date.UTC(2016, 5, 14, 17, 20, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 5,
    text: "This is a quick reply. Do you love Gifted Chat? (checkbox) 5",
    createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 6,
    text: '[["[Matière]",{"variant":"h6","my":"10px"}],["Détails",{"variant":"paragraphXs"}],["Dans le cadre de votre cours, vous rencontrerez [Nom Prénom de l’enfant/de l’étudiant] pour une leçon de [Matière]. La première séance aura lieu le [date] à [heure].",{"variant":"paragraphSmall"}]]',
    isCustom: true,
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 7,
    text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
        But you can also do more with this package, for example Bob will change style and David too. foo@gmail.com
        And the magic number is 42!
        #react #react-native 7`,
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 20, 0)),
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 8,
    text: "This is a new message",
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 22, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 9,
    text: "Hello developer",
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 26, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 10,
    text: "Hi! I work from home today! 10",
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 29, 0)),
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 11,
    text: "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT 11",
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 35, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 12,
    text: "This is a quick reply. Do you love Gifted Chat? (checkbox) 12",
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 36, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 13,
    text: "This is a new message 13",
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 37, 0)),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  {
    _id: 14,
    text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
        But you can also do more with this package, for example Bob will change style and David too. foo@gmail.com
        And the magic number is 42!
        #react #react-native`,
    createdAt: new Date(Date.UTC(2016, 8, 1, 17, 38, 0)),
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
];

export default DEFAULT_MESSAGES;
