import React from 'react';
import { useQuery, useAction, getProductDetails, updateProduct } from 'wasp/client/operations';
import { useParams } from 'wasp/client/router';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useQuery(getProductDetails, { id: productId });
  const updateProductFn = useAction(updateProduct);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateProduct = () => {
    updateProductFn({ id: product.id, newName: product.name, newQuantity: product.quantity });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p>Quantity: {product.quantity}</p>
        <button
          onClick={handleUpdateProduct}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Update Product
        </button>
      </div>
      <h2 className="text-xl font-bold mt-8">Movement History</h2>
      <ul className="mt-4">
        {product.movements.map((movement) => (
          <li key={movement.id} className="border-b py-2">
            <span>{movement.type} - Quantity: {movement.quantity} - Reference: {movement.reference}</span>
            <p className="text-gray-600">Notes: {movement.notes}</p>
            <p className="text-gray-500 text-sm">{new Date(movement.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetailsPage;
