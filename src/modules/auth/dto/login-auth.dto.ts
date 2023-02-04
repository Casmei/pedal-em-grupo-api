export class LoginAuthDto {
  /**
   * Email do usuário previamente cadastrado
   * @example 'casmei@protonmail.com'
   */
  email: string;
  /**
   * Senha do usuário previamente cadastrado
   * @example '12345678910'
   */
  password: string;
}
