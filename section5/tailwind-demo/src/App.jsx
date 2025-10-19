import { useState } from "react";
import "./App.css";

function App() {
  // Flattened structure - much cleaner
  const animalInfo = [
    {
      id: 1,
      name: "dog",
      sound: "Woof",
      color: "Brown",
      size: "Medium",
    },
    {
      id: 2,
      name: "cat",
      sound: "Meow",
      color: "Black",
      size: "Small",
    },
    {
      id: 3,
      name: "cow",
      sound: "Moo",
      color: "White and Black",
      size: "Large",
    },
  ];

  const getAnimalColor = (color) => {
    switch (color.toLowerCase()) {
      case "brown":
        return "text-yellow-800";
      case "black":
        return "text-gray-800";
      case "white and black":
        return "text-gray-600";
      default:
        return "text-black";
    }
  }

  

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="mt-10 text-lg">
        This is a simple React application styled with Tailwind CSS.
      </p>
      <div className="mb-8 grid grid-cols-4 gap-2 border m-8 p-8 justify-center border-gray-300 rounded-lg bg-gray-50">
        {animalInfo.map((animal) => (
          <div key={animal.id} className="p-4 border rounded-lg shadow-2xl border-gray-500 last:border-0">
            <h2 className={`text-2xl font-semibold capitalize ${getAnimalColor(animal.color)}`}>{animal.name}</h2>
            <p>Sound: {animal.sound}</p>
            <p>Color: {animal.color}</p>
            <p>Size: {animal.size}</p>
          </div>
        ))}
        <button className="m-2 p-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-700 hover:text-white ease-in-out transform duration-500 hover:scale-110"><h1 className="">Add Animal</h1></button>
      </div>
    </>
  );
}

export default App;
