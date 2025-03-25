

export const menuItems = [
    {
      name: "Voorgerechten",
      items: [
        {
            id: 1,
            name: "Soep van de dag",
            description: "Soep van de dag",
            price: 12.50,
            image: "images/soep.jpg",
            isVegetarian: true,
            isSpicy: false,
            isGlutenFree: false
          },
          {
            id: 2,
            name: "Bruschetta",
            description: "Bruschetta",
            price: 6.75,
            image: "/images/Bruschetta.jpg",
            isVegetarian: true,
            isSpicy: false,
            isGlutenFree: false
          }
      ]
    },
    {
      name: "Hoofdgerechten",
      items: [
        {
            id: 3,
            name: "Pizza Margherita",
            description: "Klassieke Italiaanse pizza met tomatensaus, mozzarella en basilicum",
            price: 12.50,
            image: "/images/pizza-margherita.jpg",
            isVegetarian: true,
            isSpicy: false,
            isGlutenFree: false
          },
          {
            id: 4,
            name: "Spaghetti Carbonara",
            description: "Traditioneel Romeins gerecht met ei, pecorino kaas, guanciale en zwarte peper",
            price: 14.75,
            image: "/images/carbonara.jpg",
            isVegetarian: false,
            isSpicy: true,
            isGlutenFree: false
          }
      ]
    },
  ];