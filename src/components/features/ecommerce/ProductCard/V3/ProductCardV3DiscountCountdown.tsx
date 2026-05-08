'use client';

import { useEffect, useState } from 'react';

export type ProductCardV3DiscountCountdownProps = {
  endsAt?: string | null;
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  expired: boolean;
};

function computeCountdown(endsAt?: string | null): CountdownParts {
  if (!endsAt) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      expired: true,
    };
  }

  const end = new Date(endsAt).getTime();
  const now = Date.now();

  if (!Number.isFinite(end) || end <= now) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      expired: true,
    };
  }

  let remaining = Math.floor((end - now) / 1000);
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;
  const minutes = Math.floor(remaining / 60);

  return {
    days,
    hours,
    minutes,
    expired: false,
  };
}

function pad(value: number): string {
  return Math.max(0, value).toString().padStart(2, '0');
}

export default function ProductCardV3DiscountCountdown({
  endsAt,
}: ProductCardV3DiscountCountdownProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 60000);
    return () => window.clearInterval(timer);
  }, []);

  void tick;

  const parts = computeCountdown(endsAt);
  const label = parts.expired
    ? 'Offer window closed'
    : `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes left`;

  return (
    <div className="hudpv1_countdown" aria-label={label}>
      <span className="hudpv1_countdown_label">Deal timer</span>
      <span className="hudpv1_countdown_group" role="timer">
        <span>
          <strong>{pad(parts.days)}</strong>
          <small>D</small>
        </span>
        <span className="hudpv1_countdown_divider" aria-hidden />
        <span>
          <strong>{pad(parts.hours)}</strong>
          <small>H</small>
        </span>
        <span className="hudpv1_countdown_divider" aria-hidden />
        <span>
          <strong>{pad(parts.minutes)}</strong>
          <small>M</small>
        </span>
      </span>
    </div>
  );
}
