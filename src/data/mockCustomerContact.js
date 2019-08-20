import { mock } from "../util/mockAdapter";

export const contacts = [
    {
      id: 1,
      email: "demomail1@gmail.com",
      number: 1234567891,
      name: "demo1",
    },
    {
      id: 2,
      email: "demomail2@gmail.com",
      number: 1234567892,
      name: "dem2",
    },
    {
      id: 3,
      email: "demomail3@gmail.com",
      number: 1234567893,
      name: "demo3",
    },
    {
      id: 4,
      email: "demomail4@gmail.com",
      number: 1234567894,
      name: "demo4",
    },
    {
      id: 5,
      email: "demomail5@gmail.com",
      number: 1234567895,
      name: "demo5",
    },
  ];
  
  mock.onGet(/\/api\/c\/\d+\/customer\/\d+\/contact/).reply(200, { contacts, nm:"nonm"  });
