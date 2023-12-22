import { Product, products } from "@/data/products";
import { ItemCard } from "@/shopping-cart/components/ItemCard";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Products cart",
  description: "Your products cart"
};

interface ProductsInCart {
  product: Product,
  quantity: number
};

const getProductsInCart = (cart: { [id: string]: number }): ProductsInCart[] => {
  const productsInCart: ProductsInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find(prod => prod.id === id);
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

const CartPage = () => {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value || "{}") as { [id: string]: number };
  const productsInCart = getProductsInCart(cart);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">Products Cart</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.map(cart => (
              <ItemCard key={cart.product.id} product={cart.product} quantity={cart.quantity} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default CartPage;