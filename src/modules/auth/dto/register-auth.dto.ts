export class RegisterAuthDto {
  /**
   * Name do usuário previamente cadastrado
   * @example 'Tiago de Castro'
   */
  name: string;
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
