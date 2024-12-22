import React, { useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getClients } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ClientManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: clients, isLoading, error } = useQuery(getClients, { variables: { name: searchTerm } });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search clients"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="grid grid-cols-1 gap-4">
        {clients.map((client) => (
          <div key={client.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{client.name}</h2>
            <p>{client.contactDetails}</p>
            <Link to={`/client/${client.id}`} className="text-blue-500 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientManagementPage;
