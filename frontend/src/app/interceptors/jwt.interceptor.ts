import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const raw = localStorage.getItem('parasoins_user');
  if (raw) {
    const user = JSON.parse(raw);
    if (user?.token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return next(cloned);
    }
  }
  return next(req);
};
