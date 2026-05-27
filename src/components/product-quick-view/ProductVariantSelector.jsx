"use client";

import { useEffect, useMemo, useState } from "react";
import { getVariantCombinations, getVariantGroups } from "./utils";

const variantOrder = ["color", "size", "ram", "storage"];
const stockKeyOrder = ["size", "ram", "storage", "color"];

const getCombinationValue = (combination, variantKey) => {
  const directValue = combination[variantKey];
  if (typeof directValue === "string") return directValue;

  const nestedValues = combination.variant_values;
  if (nestedValues && typeof nestedValues === "object" && !Array.isArray(nestedValues)) {
    const nestedValue = nestedValues[variantKey];
    return typeof nestedValue === "string" ? nestedValue : undefined;
  }

  return undefined;
};

const combinationMatches = (combination, selectedOptions, keys) =>
  keys.every((key) => {
    const selectedValue = selectedOptions[key];
    return !selectedValue || getCombinationValue(combination, key) === selectedValue;
  });

const getStockKey = (selectedOptions, combination) =>
  stockKeyOrder
    .map((key) => selectedOptions[key] ?? getCombinationValue(combination, key))
    .filter(Boolean)
    .join("-");

const parseStockKey = (stockKey) =>
  stockKey.split("-").reduce((options, value, index) => {
    const variantKey = stockKeyOrder[index];
    if (variantKey && value) options[variantKey] = value;
    return options;
  }, {});

const getAvailableStockList = (product) =>
  Object.entries(product.variant_stocks ?? {})
    .map(([key, stock]) => ({
      key,
      selectedOptions: parseStockKey(key),
      stock: Number(stock),
    }))
    .filter((item) => item.stock > 0);

const getCombinationStock = (product, selectedOptions, matchedCombination) => {
  if (!matchedCombination) return 0;

  const stockKey = getStockKey(selectedOptions, matchedCombination);
  if (product.variant_stocks && Object.keys(product.variant_stocks).length > 0) {
    return Math.max(0, Number(product.variant_stocks[stockKey] ?? 0));
  }

  return Math.max(0, Number(matchedCombination.stock ?? 0));
};

export function ProductVariantSelector({ product, onVariantChange }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isStockPanelOpen, setIsStockPanelOpen] = useState(false);
  const [selectedStockKey, setSelectedStockKey] = useState(undefined);
  const [quantity, setQuantity] = useState(1);

  const variantGroups = useMemo(() => getVariantGroups(product), [product]);
  const combinations = useMemo(() => getVariantCombinations(product), [product]);
  const availableStockList = useMemo(() => getAvailableStockList(product), [product]);
  const visibleVariantKeys = useMemo(
    () => variantOrder.filter((key) => variantGroups[key]?.length),
    [variantGroups]
  );

  const getMatchedCombination = () => {
    const allSelected = visibleVariantKeys.every((key) => selectedOptions[key]);
    if (!allSelected) return null;

    return (
      combinations.find((combination) =>
        visibleVariantKeys.every((key) => getCombinationValue(combination, key) === selectedOptions[key])
      ) ?? null
    );
  };

  const getAvailableOptions = (variantKey) => {
    const currentIndex = visibleVariantKeys.indexOf(variantKey);
    const previousKeys = visibleVariantKeys.slice(0, currentIndex);
    const candidateValues = variantGroups[variantKey] ?? [];

    return candidateValues.filter((value) => {
      const nextSelection = { ...selectedOptions, [variantKey]: value };

      return combinations.some((combination) => {
        const pathKeys = [...previousKeys, variantKey];
        if (!combinationMatches(combination, nextSelection, pathKeys)) return false;
        const stock = getCombinationStock(product, nextSelection, combination);
        return stock > 0;
      });
    });
  };

  const handleSelect = (variantKey, value) => {
    const currentIndex = visibleVariantKeys.indexOf(variantKey);

    setSelectedOptions((current) => {
      const nextOptions = {};
      visibleVariantKeys.slice(0, currentIndex).forEach((key) => {
        if (current[key]) nextOptions[key] = current[key];
      });
      nextOptions[variantKey] = value;
      return nextOptions;
    });
    setSelectedStockKey(undefined);
    setQuantity(1);
  };

  const matchedCombination = getMatchedCombination();
  const stock = getCombinationStock(product, selectedOptions, matchedCombination);
  const selectionComplete = visibleVariantKeys.every((key) => selectedOptions[key]);
  const activeStockKey =
    matchedCombination && stock > 0 ? getStockKey(selectedOptions, matchedCombination) : selectedStockKey;
  const effectiveQuantity = stock > 0 ? Math.min(quantity, stock) : 1;

  const handleStockCombinationSelect = (item) => {
    setSelectedOptions(item.selectedOptions);
    setSelectedStockKey(item.key);
    setQuantity(1);
  };

  const handleQuantityChange = (value) => {
    const nextQuantity = Number(value);
    if (!Number.isFinite(nextQuantity)) return;
    setQuantity(Math.min(Math.max(1, nextQuantity), stock));
  };

  useEffect(() => {
    onVariantChange({
      selectedOptions,
      matchedCombination,
      stock,
      quantity: effectiveQuantity,
      stockKey: activeStockKey,
    });
  }, [activeStockKey, effectiveQuantity, matchedCombination, onVariantChange, selectedOptions, stock]);

  if (visibleVariantKeys.length === 0) return null;

  return (
    <div className="hudpv1_variantSelector">
      {visibleVariantKeys.map((variantKey, index) => {
        const previousSelected = index === 0 || Boolean(selectedOptions[visibleVariantKeys[index - 1]]);
        if (!previousSelected) return null;

        const availableOptions = getAvailableOptions(variantKey);
        const values = variantGroups[variantKey] ?? [];

        return (
          <div className="hudpv1_variantGroup" key={variantKey}>
            <span className="hudpv1_variantTitle">{variantKey}</span>
            <div className="hudpv1_variantOptions">
              {values.map((value) => {
                const isActive = selectedOptions[variantKey] === value;
                const isDisabled = !availableOptions.includes(value);

                return (
                  <button
                    className={[
                      "hudpv1_variantOption",
                      isActive ? "hudpv1_variantOptionActive" : "",
                      isDisabled ? "hudpv1_variantOptionDisabled" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={isDisabled}
                    key={value}
                    onClick={() => handleSelect(variantKey, value)}
                    type="button"
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className={`hudpv1_variantStockMessage${stock > 0 ? " is-available" : ""}`}>
        {selectionComplete
          ? stock > 0
            ? `Available Stock: ${stock}`
            : "This combination is unavailable"
          : "Select options to lock a variant"}
      </div>

      {selectionComplete && stock === 0 ? (
        <div className="hudpv1_stockWarning">This combination is unavailable</div>
      ) : null}

      <button
        className="hudpv1_stockToggleBtn"
        onClick={() => setIsStockPanelOpen((isOpen) => !isOpen)}
        type="button"
      >
        {isStockPanelOpen ? "Hide Available Stocks" : "Show Available Stocks"}
      </button>

      {isStockPanelOpen ? (
        <div className="hudpv1_availableStockPanel">
          {availableStockList.length > 0 ? (
            <div className="hudpv1_stockCombinationGrid">
              {availableStockList.map((item) => {
                const label = stockKeyOrder
                  .map((key) => item.selectedOptions[key])
                  .filter(Boolean)
                  .join(" / ");
                const isActive = activeStockKey === item.key;

                return (
                  <button
                    className={[
                      "hudpv1_stockCombinationBtn",
                      isActive ? "hudpv1_stockCombinationBtnActive" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    key={item.key}
                    onClick={() => handleStockCombinationSelect(item)}
                    type="button"
                  >
                    <span className="hudpv1_stockCombinationText">{label}</span>
                    <span className="hudpv1_stockCombinationQty">Stock: {item.stock}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="hudpv1_stockWarning">No available stock combination found.</div>
          )}
        </div>
      ) : null}

      {matchedCombination && stock > 0 ? (
        <label className="hudpv1_quantityBox">
          <span>Quantity</span>
          <input
            className="hudpv1_quantityInput"
            max={stock}
            min={1}
            onChange={(event) => handleQuantityChange(event.target.value)}
            type="number"
            value={effectiveQuantity}
          />
        </label>
      ) : null}
    </div>
  );
}
