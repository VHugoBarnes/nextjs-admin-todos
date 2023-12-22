import { WidgetItem } from "@/components";
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

  const totalToPay = productsInCart.reduce((prev, current) => ((current.product.price * current.quantity) + prev), 0);

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
          {
            productsInCart.length === 0 && (
              <div className="flex justify-center items-center py-10">
                <p className="text-slate-500 text-lg italic">No items in cart</p>
              </div>
            )
          }
        </div>

        <div className="flex flex-col sm:w-4/12">
          <WidgetItem title="Price">
            <h3 className="text-3xl font-bold text-gray-700 text-center">${totalToPay}</h3>
            <p className="font-bold text-gray-500 text-center">15% tax: ${Number(totalToPay * 0.15).toFixed(2)}</p>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
};

export default CartPage;