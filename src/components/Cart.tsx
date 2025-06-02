
import { useState } from "react";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../contexts/CartContext";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();

  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <>
      {/* Cart Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        </Button>
      </div>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">Your Order</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.restaurant}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-orange-600">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
