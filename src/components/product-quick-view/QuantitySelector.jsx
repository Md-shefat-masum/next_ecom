"use client";

import { Minus, Plus } from "lucide-react";
import "./QuantitySelector.css";

export function QuantitySelector({ quantity, onQuantityChange, min = 1, max, availableStock }) {
  const handleDecrease = () => {
    if (quantity > min) onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    if (!max || quantity < max) onQuantityChange(quantity + 1);
  };

  const handleInputChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10) || min;
    if (newQuantity < min) onQuantityChange(min);
    else if (max && newQuantity > max) onQuantityChange(max);
    else onQuantityChange(newQuantity);
  };

  return (
    <div className="quantity-selector-wrapper">
      <label className="quantity-label">Quantity:</label>
      <div className="quantity-selector">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= min}
          className="quantity-button"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="quantity-input"
        />
        <button
          type="button"
          onClick={handleIncrease}
          disabled={max ? quantity >= max : false}
          className="quantity-button"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {availableStock !== undefined ? (
        <span className="quantity-stock">({availableStock} Available)</span>
      ) : null}
    </div>
  );
}
