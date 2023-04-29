import { apiEndpoints } from '$lib/api';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
  const jwt = getCurrentSession(cookies, locals);
  if (jwt == null) {
    return fail(400, {
      errors: {
        message: 'Error with token'
      }
    });
  }
  const userResponse = await apiEndpoints.user.get(jwt);
  if (userResponse.success) {
    return userResponse.data;
  }
  return fail(400, {
    errors: {
      message: userResponse.message
    }
  });
};

type ProfileForm = {
  name: string;
  lastName: string;
  dni: string;
  email: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
};
export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const formData = await request.formData();
    const profileForm = Object.fromEntries(formData) as ProfileForm;
    const jwt = getCurrentSession(cookies, locals);
    if (jwt == null) {
      return fail(400, {
        errors: {
          message: 'Error with token'
        }
      });
    }
    const updateUserResponse = await apiEndpoints.user.updateUser(jwt, {
      firstName: profileForm.name,
      dni: Number(profileForm.dni),
      email: profileForm.email,
      lastName: profileForm.lastName,
      password: profileForm.password,
      location: {
        country: profileForm.country,
        direction: profileForm.address,
        city: profileForm.city,
        province: profileForm.state,
        zipCode: profileForm.zipCode
      }
    });
    if (updateUserResponse.success) {
      throw redirect(303, '/');
    }

    return fail(400, {
      errors: {
        message: updateUserResponse.message
      }
    });
  }
};
