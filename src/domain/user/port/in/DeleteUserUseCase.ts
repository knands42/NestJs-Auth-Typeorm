export interface DeleteUserUseCase {
  deleteOne(id: string): Promise<void>
}
