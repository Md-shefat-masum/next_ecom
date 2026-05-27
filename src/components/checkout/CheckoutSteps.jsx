"use client";

import Link from "next/link";
import { Check, CreditCard, MapPin, Truck } from "lucide-react";

const steps = [
  { id: "shipping", label: "Shipping", href: "/checkout", icon: MapPin },
  { id: "delivery", label: "Delivery", href: "/checkout/delivery", icon: Truck },
  { id: "payment", label: "Payment", href: "/checkout/payment", icon: CreditCard },
];

export function CheckoutSteps({ currentStep }) {
  return (
    <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={step.id} className="flex items-center">
            <Link
              href={step.href}
              className={[
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition",
                isActive ? "bg-[#0B5FAE] text-white" : "",
                isCompleted ? "bg-[#16A34A] text-white" : "",
                !isActive && !isCompleted ? "bg-[#EEF5FF] text-[#071B3A]" : "",
              ].join(" ")}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              <span>{step.label}</span>
            </Link>
            {index < steps.length - 1 ? (
              <div className={`mx-2 hidden h-1 w-10 sm:block ${index < currentStep ? "bg-[#16A34A]" : "bg-[#E8EEF6]"}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
