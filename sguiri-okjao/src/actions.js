import { HttpError } from 'wasp/server'

export const createMovement = async ({ productId, type, quantity, reference, notes }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const product = await context.entities.Product.findUnique({
    where: { id: productId }
  });
  if (!product) { throw new HttpError(404, 'Product not found') };

  let newQuantity = product.quantity;
  if (type === 'entry') {
    newQuantity += quantity;
  } else if (type === 'exit') {
    newQuantity -= quantity;
    if (newQuantity < 0) { throw new HttpError(400, 'Insufficient stock for the product') };
  } else {
    throw new HttpError(400, 'Invalid movement type')
  }

  const movement = await context.entities.Movement.create({
    data: {
      productId,
      type,
      quantity,
      reference,
      notes,
      userId: context.user.id
    }
  });

  await context.entities.Product.update({
    where: { id: productId },
    data: { quantity: newQuantity }
  });

  return movement;
}

export const addProduct = async ({ name, quantity }, context) => {
  if (!context.user) { throw new HttpError(401) };
  if (!['Admin', 'Admin Principal'].includes(context.user.role.name)) { throw new HttpError(403) };
  const newProduct = await context.entities.Product.create({
    data: {
      name,
      quantity
    }
  });
  return newProduct;
}

export const updateProduct = async ({ id, newName, newQuantity }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const userRole = context.user.role.name;
  if (userRole !== 'Admin' && userRole !== 'Admin Principal') { throw new HttpError(403) };

  const product = await context.entities.Product.findUnique({
    where: { id }
  });
  if (!product) { throw new HttpError(404, 'Product not found'); }

  return context.entities.Product.update({
    where: { id },
    data: { name: newName, quantity: newQuantity }
  });
}
