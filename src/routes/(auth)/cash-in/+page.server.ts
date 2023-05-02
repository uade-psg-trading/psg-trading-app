import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

type CashInForm = {
  amount: string;
  tokenSelection: string;
};

export const actions: Actions = {
  default: async ({ cookies, locals, request }) => {
    const formData = await request.formData();
    const cashInForm = Object.fromEntries(formData) as CashInForm;
    const errors: Record<string, unknown> = {};

    if (Object.keys(errors).length > 0) {
      return fail(400, errors);
    }

    const jwt = getCurrentSession(cookies, locals);
    if (jwt == null) {
      return fail(400, {
        errors: {
          message: 'Error with token'
        }
      });
    }
    const createPaymentResponse = await apiEndpoints.payments.createPayment(jwt, {
      amount: Number(cashInForm.amount),
      paymentMethod: 'CREDIT_CARD'
    });
    if (createPaymentResponse.success) {
      return {};
    }

    return fail(400, {
      errors: {
        message: createPaymentResponse.message
      }
    });
  }
};
