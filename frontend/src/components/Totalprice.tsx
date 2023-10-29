import React, { useEffect } from "react";
import { BasketInterface } from "../interfaces/IBasket";
import { GetBasket } from "../services/http";
const Totalprice = () => {
  const [basket, setBasket] = React.useState<BasketInterface[]>([]);
  
  // const getBasket = async () => {
  //   let res = await GetBasket();
  //   if (res) {
  //     setBasket(res);
  //   }
  // };

  // useEffect(() => {
  //   getBasket();
  // }, []);
  return (
    <div className="card w-96 h-52 bg-base-100 shadow-lg flex flex-col gap-y-4 ml-14">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">ฺ{200}</span>
        </p>
        {/* Order Total */}
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Order Total</span>
          <span className="font-medium">200</span>
        </p>
      </div>
    </div>
  );
};

export default Totalprice;
