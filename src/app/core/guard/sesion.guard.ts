import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

export const loginGuard = () => {
  //const tokenService = inject(TokenService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  //Uso provisional de la variable token
  const authService = inject(AuthService);

  //const token = tokenService.getToken();
  const token = authService.getToken();
  
  console.log(token);

  if (!token) {
    console.log('entro al guard');
    toast.error('No tienes permiso para acceder a esta página', 'Error');
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
