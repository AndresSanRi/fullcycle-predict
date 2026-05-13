import { test, expect } from '@playwright/test';

test.describe('App Frontend', () => {
  test('debería cargar la página principal', async ({ page }) => {
    await page.goto('/');
    
    // Asumiendo que hay un formulario de login o el dashboard al inicio.
    // Esto dependerá de si el inicio de la app requiere auth.
    // Verificamos que no haya un error 404
    expect(await page.title()).not.toBe('');
    
    // Podemos buscar algún texto que sepamos que está en el inicio
    // Por ejemplo, buscar el botón de Entrar si estamos en login
    // const loginButton = page.getByRole('button', { name: /entrar/i });
    // if (await loginButton.isVisible()) {
    //   await expect(loginButton).toBeVisible();
    // }
  });
});
