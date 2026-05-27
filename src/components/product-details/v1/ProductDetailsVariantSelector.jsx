"use client";

import { useEffect, useMemo, useState } from "react";
import {
  combinationMatches,
  getCombinationStock,
  getCombinationStockKey,
  getVariantCombinations,
  getVariantGroups,
  getVariantKeyOrder,
  getVariantValue,
  getVariantValues,
} from "./productDetailsUtils";

const titleCase = (value) => value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export function ProductDetailsVariantSelector({ product, onVariantChange }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isStockPanelOpen, setIsStockPanelOpen] = useState(false);

  const variantGroups = useMemo(() => getVariantGroups(product), [product]);
  const orderedKeys = useMemo(() => getVariantKeyOrder(variantGroups), [variantGroups]);
  const combinations = useMemo(() => getVariantCombinations(product), [product]);
  const availableCombinations = useMemo(
    () => combinations.filter((combination) => getCombinationStock(product, combination) > 0),
    [combinations, product]
  );

  const getAvailableOptions = (variantKey, selections = selectedOptions) => {
    const otherSelections = Object.fromEntries(Object.entries(selections).filter(([key]) => key !== variantKey));
    const options = [];

    availableCombinations.forEach((combination) => {
      if (!combinationMatches(combination, otherSelections)) return;

      const value = getVariantValue(combination, variantKey);
      if (value && !options.includes(value)) options.push(value);
    });

    return options;
  };

  const visibleKeys = [];
  for (const variantKey of orderedKeys) {
    const availableOptions = getAvailableOptions(variantKey);
    const shouldShow = Boolean(selectedOptions[variantKey]) || availableOptions.length > 0;

    if (!shouldShow) continue;
    visibleKeys.push(variantKey);
    if (!selectedOptions[variantKey]) break;
  }

  const selectionComplete = visibleKeys.length > 0 && visibleKeys.every((key) => selectedOptions[key]);
  const matchedCombination = selectionComplete
    ? availableCombinations.find((combination) => combinationMatches(combination, selectedOptions)) || null
    : null;
  const selectedStock = matchedCombination ? getCombinationStock(product, matchedCombination) : 0;
  const stockKey = matchedCombination ? getCombinationStockKey(matchedCombination) : "";

  const handleSelect = (variantKey, value) => {
    const selectedIndex = orderedKeys.indexOf(variantKey);

    setSelectedOptions((current) => {
      const nextOptions = {};
      orderedKeys.slice(0, selectedIndex).forEach((key) => {
        if (current[key]) nextOptions[key] = current[key];
      });
      nextOptions[variantKey] = value;
      return nextOptions;
    });
  };

  const handleStockSelect = (combination) => {
    setSelectedOptions(getVariantValues(combination));
    setIsStockPanelOpen(false);
  };

  useEffect(() => {
    onVariantChange({
      matchedCombination,
      selectedOptions,
      stock: selectedStock,
      stockKey,
    });
  }, [matchedCombination, onVariantChange, selectedOptions, selectedStock, stockKey]);

  if (orderedKeys.length === 0) return null;

  return (
    <section className="pdv1_variantBox">
      <div className="pdv1_sectionHeading">
        <span>Choose Variant</span>
        <button className="pdv1_stockToggle" onClick={() => setIsStockPanelOpen((isOpen) => !isOpen)} type="button">
          {isStockPanelOpen ? "Hide Stock" : "Available Stock"}
        </button>
      </div>

      <div className="pdv1_variantGroups">
        {visibleKeys.map((variantKey) => {
          const options = variantGroups[variantKey] || [];
          const availableOptions = getAvailableOptions(variantKey);
          const isColor = variantKey.toLowerCase().includes("color");

          return (
            <div className="pdv1_variantGroup" key={variantKey}>
              <span className="pdv1_variantLabel">{titleCase(variantKey)}</span>
              <div className="pdv1_variantOptions">
                {options.map((option) => {
                  const isActive = selectedOptions[variantKey] === option;
                  const isDisabled = !availableOptions.includes(option);

                  return (
                    <button
                      className={`pdv1_variantOption${isActive ? " is-active" : ""}${isDisabled ? " is-disabled" : ""}`}
                      disabled={isDisabled}
                      key={option}
                      onClick={() => handleSelect(variantKey, option)}
                      style={isColor ? { "--pdv1-swatch": option } : undefined}
                      type="button"
                    >
                      {isColor ? <span className="pdv1_colorSwatch" aria-hidden="true" /> : null}
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className={`pdv1_stockMessage${matchedCombination ? " is-success" : ""}`}>
        {matchedCombination
          ? `In Stock (${selectedStock} available)`
          : Object.keys(selectedOptions).length > 0
            ? "Select remaining options"
            : "Select options to check stock"}
      </p>

      {isStockPanelOpen ? (
        <div className="pdv1_stockPanel">
          {availableCombinations.length > 0 ? (
            availableCombinations.map((combination) => {
              const values = getVariantValues(combination);
              const label = orderedKeys
                .map((key) => values[key])
                .filter(Boolean)
                .join(" / ");
              const isActive = stockKey && stockKey === getCombinationStockKey(combination);

              return (
                <button
                  className={`pdv1_stockItem${isActive ? " is-active" : ""}`}
                  key={combination.id || getCombinationStockKey(combination) || label}
                  onClick={() => handleStockSelect(combination)}
                  type="button"
                >
                  <span>{label}</span>
                  <b>{getCombinationStock(product, combination)} pcs</b>
                </button>
              );
            })
          ) : (
            <div className="pdv1_emptyStock">No available variant stock found.</div>
          )}
        </div>
      ) : null}
    </section>
  );
}
