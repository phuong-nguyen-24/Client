import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("http://localhost:4000/product"),
    select: (res) => res.data,
  });

  if (isLoading) return <div>Loading...</div>;

  const [q, setQ] = useState("");

  function handleSearch() {
    axios.get(`http://localhost:4000/product/search?q=${q}`)
  }

  return (
    <div className="container mx-auto">
      <div className="flex">
        <input
          className="w-full py-5 px-12 text-xl border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          type="text"
          placeholder="Search products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          className="block py-5 px-10 h-full w-full xl:w-auto text-xl text-white font-medium tracking-tighter font-heading bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-4 gap-6 py-10">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}
