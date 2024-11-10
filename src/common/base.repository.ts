import { AnyEntity, EntityManager, EntityRepository } from "@mikro-orm/core";

export class BaseRepository<T extends object> extends EntityRepository<T> {
  protected entityName!: string;

  constructor(em: EntityManager, entity: { new (): T }) {
    super(em, entity);
  }

  persist(entity: AnyEntity | AnyEntity[]): EntityManager {
    return this.em.persist(entity);
  }

  async persistAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  remove(entity: AnyEntity): EntityManager {
    return this.em.remove(entity);
  }

  async removeAndFlush(entity: AnyEntity): Promise<void> {
    await this.em.removeAndFlush(entity);
  }

  async flush(): Promise<void> {
    return this.em.flush();
  }
}
