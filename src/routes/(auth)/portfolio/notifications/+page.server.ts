import { apiEndpoints, type AlertOperator } from '$lib/api';
import { filterFiat, translateAlertOperator } from '$lib/utils/helpers';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { Actions } from './$types';

type NotificationForm = {
  amount?: string;
  tokenName?: string;
  reason?: AlertOperator;
};
export const load: PageServerLoad = async ({ parent }) => {
  const { tokens, tokensError, session: jwt } = await parent();
  const reasons = [
    {
      value: 'GREATER',
      label: 'SUBE'
    },
    {
      value: 'LOWER',
      label: 'BAJA'
    }
  ];

  if (tokensError) {
    return {
      tokens: [],
      reasons,
      errors: {
        tokensError
      }
    };
  }

  const alertsResponse = await apiEndpoints.alerts.get(jwt);
  if (!alertsResponse.success) {
    return {
      tokens: [],
      reasons,
      errors: {
        alertsError: alertsResponse.message
      }
    };
  }

  return {
    tokens: tokens.filter(filterFiat).map((token) => {
      return { value: token.symbol, label: token.symbol };
    }),
    alerts: alertsResponse.data?.map((alert) => {
      return {
        id: alert.alertId,
        symbolName: alert.symbol.name,
        reason: translateAlertOperator(alert.operator),
        amount: `$${alert.amount}`
      };
    }),
    reasons,
    errors: undefined
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const formData = Object.fromEntries(form) as NotificationForm;
    const errors: Record<string, unknown> = {};
    if (!formData.tokenName || formData.tokenName === '-1') {
      errors.tokenName = 'Debe seleccionar un token válido';
    }

    if (!formData.amount || isNaN(Number(formData.amount))) {
      errors.amount = 'Este campo debe tener un valor numérico válido';
    }

    if (!formData.reason || !['GREATER', 'LOWER'].includes(formData.reason)) {
      errors.reason = 'Debe seleccionar un aviso válido.';
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors });
    }

    const createAlertResponse = await apiEndpoints.alerts.create(locals.session?.jwt || '', {
      amount: Number(formData.amount),
      operator: formData.reason as AlertOperator,
      token: formData.tokenName || ''
    });

    if (!createAlertResponse.success) {
      return fail(400, { errors: { createAlertError: createAlertResponse.message } });
    }

    return {
      errors: undefined
    };
  }
};
