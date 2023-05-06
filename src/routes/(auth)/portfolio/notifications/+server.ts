import { apiEndpoints } from '$lib/api';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ locals, request }) => {
  const { alertId } = await request.json();
  if (isNaN(Number(alertId))) {
    return json({ error: 'La alerta seleccionada no es válida' });
  }

  const deleteResponse = await apiEndpoints.alerts.delete(locals.session?.jwt || '', alertId);
  if (!deleteResponse.success) {
    return json({ error: deleteResponse.message });
  }

  const alerts = await apiEndpoints.alerts.get(locals.session?.jwt || '');
  return json({ alerts: alerts.data || [] });
};
