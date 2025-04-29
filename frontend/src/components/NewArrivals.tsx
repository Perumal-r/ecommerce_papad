import Image from "next/image";

export default function NewArrivals() {
  const products = [
    {
      name: "Orange Juice",
      price: "$24.99",
      img: "https://img.freepik.com/free-photo/orange-juice_144627-28495.jpg?w=740",
    },
    {
      name: "Fresh Meat",
      price: "$122.00",
      img: "https://img.freepik.com/free-photo/raw-meat-with-rosemary_144627-8648.jpg?w=740",
    },
    {
      name: "Strawberries",
      price: "$2600.00",
      img: "https://img.freepik.com/free-photo/fresh-strawberries_144627-28506.jpg?w=740",
    },
    {
      name: "Apple",
      price: "$602.00",
      img: "https://img.freepik.com/free-photo/apple_144627-28486.jpg?w=740",
    },
  ];
  return (
    <section className="p-8">
      <h2 className="text-center text-3xl font-bold mb-8">New Arrivals</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
          >
            <Image
              width={100}
              height={100}
              src={product.img}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="mt-4 font-bold">{product.name}</h3>
            <p className="text-green-600">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
