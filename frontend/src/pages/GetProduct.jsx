import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/GetProduct.css";

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [editProduct, setEditProduct] = useState(null); // State to hold the product being edited

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      ); // Update UI
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  // Handle Edit
  const handleEdit = (product) => {
    setEditProduct(product); // Set the product to be edited
  };

  const handleSaveEdit = async () => {
    if (editProduct) {
      try {
        const updatedProduct = await API.put(`/products/${editProduct._id}`, {
          name: editProduct.name,
          price: editProduct.price,
          stock: editProduct.stock,
        });
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct.data._id
              ? updatedProduct.data
              : product
          )
        );
        setEditProduct(null); // Clear edit state
      } catch (error) {
        console.error("Error updating product", error);
      }
    }
  };

  return (
    <div className="get-product-container">
      <h2>Product List</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by product name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-item">
              {editProduct && editProduct._id === product._id ? (
                <div>
                  <input
                    type="text"
                    value={editProduct.name}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, name: e.target.value })
                    }
                    placeholder="Product Name"
                  />
                  <input
                    type="number"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, stock: e.target.value })
                    }
                    placeholder="Stock"
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditProduct(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p className="price">Price: Rs. {product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No products found...</p>
        )}
      </div>
    </div>
  );
};

export default GetProduct;
