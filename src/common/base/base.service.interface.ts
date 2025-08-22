// IBaseService.ts
export interface IBaseService<
  T, // Entidad (ej: Tag)
  CreateDto = unknown, // DTO de creación
  UpdateDto = unknown, // DTO de actualización
> {
  getAll(): Promise<T[]>;
  getById(id: string | number): Promise<T | null>;
  create(data: CreateDto): Promise<T>;
  update(id: string | number, data: UpdateDto): Promise<T>;
  delete(id: string | number): Promise<void>;
}
