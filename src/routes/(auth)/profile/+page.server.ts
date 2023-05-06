import { apiEndpoints } from '$lib/api';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const jwt = locals.session?.jwt;
  if (jwt == null) {
    return fail(400, {
      errors: {
        message: 'Error with token'
      }
    });
  }

  const userResponse = locals.UserData;
  if (userResponse) {
    return userResponse;
  }

  return fail(400, {
    errors: {
      message: 'Su sesión ha expirado, por favor vuelva a iniciar sesión.'
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
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const profileForm = Object.fromEntries(formData) as ProfileForm;
    const jwt = locals.session?.jwt;
    if (jwt == null) {
      return fail(400, {
        errors: {
          message: 'Su sesión ha expirado, por favor vuelva a iniciar sesión.'
        }
      });
    }
    const updateUserResponse = await apiEndpoints.user.updateUser(jwt, {
      firstName: profileForm.name,
      dni: Number(profileForm.dni),
      email: profileForm.email,
      lastName: profileForm.lastName,
      location: {
        country: profileForm.country,
        address: profileForm.address,
        city: profileForm.city,
        province: profileForm.state,
        zipCode: profileForm.zipCode
      }
    });

    if (updateUserResponse.success) {
      locals.UserData = updateUserResponse.data;
      return {};
    }

    return fail(400, {
      errors: {
        message: updateUserResponse.message
      }
    });
  }
};
