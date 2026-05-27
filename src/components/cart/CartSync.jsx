"use client";

import { useEffect } from "react";
import { CART_UPDATED_EVENT } from "@/lib/cart/cartUtils";
import { useAppDispatch } from "@/store/hooks";
import { syncCartFromStorage } from "@/store/slices/cartSlice";

export function CartSync() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(syncCartFromStorage());

    const handleUpdate = () => dispatch(syncCartFromStorage());
    window.addEventListener(CART_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handleUpdate);
  }, [dispatch]);

  return null;
}
