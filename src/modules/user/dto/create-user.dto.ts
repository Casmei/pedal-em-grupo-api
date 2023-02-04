export class CreateUserDto {
  /**
   * Nome do usuário
   * @example 'Tiago de Castro'
   */
  name: string;
  /**
   * Email do usúario
   * @example 'casmei@protonmail.com'
   */
  email: string;
  /**
   * Senha do usúario
   * @example 'senhaComplicada'
   */
  password: string;
}
