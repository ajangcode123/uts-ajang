import { useState, useEffect } from "react";
import { Info, Edit, Trash, Plus } from "lucide-react";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    price: "",
    color: "",
    image: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleAddProduct = () => {
    setIsEdit(false);
    setCurrentProduct({
      id: "",
      name: "",
      price: "",
      color: "",
      image: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setCurrentProduct(productToEdit);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = () => {
    const updatedProducts = isEdit
      ? products.map((product) =>
          product.id === currentProduct.id ? currentProduct : product
        )
      : [...products, { ...currentProduct, id: Date.now() }];

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    const compareValue =
      sortBy === "name" ? a.name.localeCompare(b.name) : a.price - b.price;
    return sortOrder === "asc" ? compareValue : -compareValue;
  });

  const filteredProducts = sortedProducts.filter(
    (product) =>
      (filter ? product.color === filter : true) &&
      (searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen flex flex-col"
      style={{ backgroundImage: "url('daun.jpg')" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Product Page
      </h1>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <label className="mr-2 text-white">Filter by color:</label>
          <select
            onChange={handleFilterChange}
            className="border p-2 rounded mr-4"
          >
            <option value="">All</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="gray">Gray</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
            <option value="brown">Brown</option>
            <option value="indigo">Indigo</option>
          </select>
          <label className="mr-2 text-white">Sort by:</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border p-2 rounded mr-2"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <label className="mr-2 text-white">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded mr-4"
            placeholder="Search products..."
          />
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
          >
            <Plus className="mr-2" /> Add Product
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl w-full"
            key={product.id}
          >
            <div className="bg-gray-100 p-4 h-full flex flex-col justify-between">
              <div className="mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700">Price: Rp.{product.price}</p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => alert(`Info: ${product.description}`)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Info />
                </button>
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4 text-green-800">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label className="block mb-2 text-green-800">Name:</label>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <label className="block mb-2 text-green-800">Price:</label>
              <input
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <label className="block mb-2 text-green-800">Color:</label>
              <select
                name="color"
                value={currentProduct.color}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              >
                <option value="">Select Color</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="gray">Gray</option>
                <option value="orange">Orange</option>
                <option value="pink">Pink</option>
                <option value="brown">Brown</option>
                <option value="indigo">Indigo</option>
              </select>
              <label className="block mb-2 text-green-800">Image URL:</label>
              <input
                type="text"
                name="image"
                value={currentProduct.image}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              />
              <label className="block mb-2 text-green-800">Description:</label>
              <textarea
                name="description"
                value={currentProduct.description}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
                required
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  {isEdit ? "Save Changes" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
