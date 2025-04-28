export default function Categories() {
  const categories = [
    { icon: "🥣", name: "Flour" },
    { icon: "🍊", name: "Fruits" },
    { icon: "🍯", name: "Jam" },
    { icon: "🥩", name: "Meat" },
    { icon: "🥚", name: "Milk & Eggs" },
    { icon: "🥦", name: "Vegetables" },
  ];
  return (
    <section className="p-8">
      <h2 className="text-center text-3xl font-bold mb-8">
        Featured Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
              {cat.icon}
            </div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
