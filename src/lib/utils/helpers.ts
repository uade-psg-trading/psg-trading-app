import type { AlertOperator, Balance, Token } from '$lib/api';

export function filterFiat(token: Token | Balance): boolean {
  return token.symbol !== 'USD';
}

export function translateAlertOperator(operator: AlertOperator) {
  return operator === 'GREATER' ? 'SUBE' : 'BAJA';
}

export function formatNumber(value: number | undefined) {
  if (value)
    return value.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  return 0;
}
