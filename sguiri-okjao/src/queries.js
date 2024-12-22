import { HttpError } from 'wasp/server'

export const getProducts = async (args, context) => {
  const { searchTerm } = args;

  const products = await context.entities.Product.findMany({
    where: {
      name: {
        contains: searchTerm || '',
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      name: true,
      quantity: true
    }
  });

  return products;
}

export const getProductDetails = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const product = await context.entities.Product.findUnique({
    where: { id },
    include: {
      movements: true
    }
  });

  if (!product) throw new HttpError(404, 'No product with id ' + id);

  return product;
}

export const getClients = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Client.findMany({
    where: {
      name: { contains: args.name, mode: 'insensitive' }
    },
    select: {
      id: true,
      name: true,
      contactDetails: true
    }
  });
}

export const getEmployeeDetails = async ({ id }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const employee = await context.entities.Employee.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      personalInfo: true,
      employmentStatus: true,
      emergencyContact: true,
      projects: {
        select: {
          id: true,
          name: true,
          description: true,
          status: true
        }
      }
    }
  });

  if (!employee) throw new HttpError(404, 'No employee with id ' + id);

  return employee;
}
