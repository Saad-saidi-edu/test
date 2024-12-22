import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getProducts, getClients } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: products, isLoading: productsLoading, error: productsError } = useQuery(getProducts);
  const { data: clients, isLoading: clientsLoading, error: clientsError } = useQuery(getClients);

  if (productsLoading || clientsLoading) return 'Loading...';
  if (productsError) return 'Error loading products: ' + productsError;
  if (clientsError) return 'Error loading clients: ' + clientsError;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Stock Management</h2>
        <p>Total Products: {products.length}</p>
        <Link to="/product-management" className="underline">Click to manage stock</Link>
      </div>
      <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Client Management</h2>
        <p>Total Clients: {clients.length}</p>
        <Link to="/clients" className="underline">Click to manage clients</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
