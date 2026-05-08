'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';

export type ProductCardV2DiscountCountdownProps = {
  /** Discount / offer end instant (ISO 8601 or string parseable by moment) */
  endsAt?: string | null;
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  invalid: boolean;
};

/** Remaining time as day : hour : min : sec using wall-clock diff via moment. */
function computeCountdown(endsAt: moment.Moment): CountdownParts {
  if (!endsAt.isValid()) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
      invalid: true,
    };
  }

  const ms = endsAt.diff(moment());
  if (ms <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
      invalid: false,
    };
  }

  let rest = Math.floor(ms / 1000);
  const days = Math.floor(rest / 86400);
  rest %= 86400;
  const hours = Math.floor(rest / 3600);
  rest %= 3600;
  const minutes = Math.floor(rest / 60);
  const seconds = rest % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    expired: false,
    invalid: false,
  };
}

function fmtPadded(n: number): string {
  return Math.max(0, n).toString().padStart(2, '0');
}

/**
 * Horizontal discount countdown (Days : Hours : Mins : Sec) on amber track.
 */
export default function ProductCardV2DiscountCountdown({
  endsAt,
}: ProductCardV2DiscountCountdownProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  void tick;

  const end = endsAt ? moment(endsAt) : null;
  const parts = end
    ? computeCountdown(end)
    : ({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: true,
        invalid: true,
      } as const);

  const displayValues: [string, string, string, string] = parts.invalid
    ? ['—', '—', '—', '—']
    : parts.expired
      ? ['00', '00', '00', '00']
      : [
          fmtPadded(parts.days),
          fmtPadded(parts.hours),
          fmtPadded(parts.minutes),
          fmtPadded(parts.seconds),
        ];

  const ariaLabel = parts.invalid
    ? 'Discount countdown unavailable'
    : parts.expired
      ? 'Offer ended'
      : `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds remaining`;

  return (
    <div
      className="pcv2_discount_countdown"
      aria-label={ariaLabel}
      aria-live="polite"
      title={parts.expired && !parts.invalid ? 'Offer ended' : undefined}
    >
      <div className="pcv2_discount_countdown_track" role="timer">
        <span className="pcv2_discount_countdown_num">{displayValues[0]}</span>
        <span className="pcv2_discount_countdown_sep" aria-hidden>
          :
        </span>
        <span className="pcv2_discount_countdown_num">{displayValues[1]}</span>
        <span className="pcv2_discount_countdown_sep" aria-hidden>
          :
        </span>
        <span className="pcv2_discount_countdown_num">{displayValues[2]}</span>
        <span className="pcv2_discount_countdown_sep" aria-hidden>
          :
        </span>
        <span className="pcv2_discount_countdown_num">{displayValues[3]}</span>
        <span className="pcv2_discount_countdown_label">Days</span>
        <span className="pcv2_discount_countdown_label">Hours</span>
        <span className="pcv2_discount_countdown_label">Mins</span>
        <span className="pcv2_discount_countdown_label">Sec</span>
      </div>
    </div>
  );
}
