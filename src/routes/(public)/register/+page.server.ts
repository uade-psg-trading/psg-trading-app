import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { isValidEmail, isValidPassword } from '$lib/utils/validator';
import { apiEndpoints } from '$lib/api';
import { getCurrentTenant } from '$lib/tenant-manager';

function sanitizeFormData(form: RegisterForm): RegisterForm {
  return {
    ...form,
    password: '',
    confirmPassword: ''
  };
}

type RegisterForm = {
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
/** @type {import('./$types').Actions} */
export const actions: Actions = {
  register: async ({ request, locals }) => {
    const formData = await request.formData();
    const registerForm = Object.fromEntries(formData) as RegisterForm;

    const errors: Record<string, unknown> = {};
    if (!registerForm.name) {
      errors.name = 'required';
    }

    if (!isValidEmail(registerForm.email)) {
      errors.email = 'required';
    }

    if (isNaN(Number(registerForm.dni))) {
      errors.dni = 'required';
    }

    if (!isValidPassword(registerForm.password)) {
      errors.password = 'required';
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'required';
    }

    if (Object.keys(errors).length > 0) {
      const returnData = {
        data: sanitizeFormData(registerForm),
        errors
      };

      return fail(400, returnData);
    }

    const tenant = getCurrentTenant(locals).id;
    const registerResponse = await apiEndpoints.user.create({
      firstName: registerForm.name,
      dni: Number(registerForm.dni),
      email: registerForm.email,
      lastName: registerForm.lastName,
      password: registerForm.password,
      tenantId: tenant,
      location: {
        country: registerForm.country,
        address: registerForm.address,
        city: registerForm.city,
        province: registerForm.state,
        zipCode: registerForm.zipCode
      }
    });
    if (registerResponse.success) {
      return {};
    }

    return fail(400, {
      errors: {
        register: 'error',
        registerMessage: registerResponse.message,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        name: undefined
      },
      data: sanitizeFormData(registerForm)
    });
  }
};
