// src/data/initialData.js
export const initialUsers = [
  {
    id: 1,
    name: "Sara",
    avatar: "S",
    color: "bg-pink-500",
    routines: [
      { id: 101, text: "Lire 20 pages", completed: true },
      { id: 102, text: "30 minutes de course", completed: false },
    ],
  },
  {
    id: 2,
    name: "Houda",
    avatar: "H",
    color: "bg-blue-500",
    routines: [
      { id: 201, text: "Lire 20 pages", completed: true },
      { id: 202, text: "30 minutes de course", completed: true },
    ],
  },
  {
    id: 3,
    name: "Khaoula",
    avatar: "K",
    color: "bg-yellow-500",
    routines: [
      { id: 301, text: "Lire 20 pages", completed: false },
      { id: 302, text: "30 minutes de course", completed: false },
    ],
  },
];