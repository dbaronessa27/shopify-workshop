import cds from '@sap/cds';
import { OrderByClause } from '../utils/types';

export abstract class BaseRepository<Entity> {
  protected constructor(
    protected readonly entity: any,
    protected readonly _service?: cds.Service,
  ) {}

  protected get service(): cds.Service {
    // Tricky type conversion due to ugly typedef in cds =/
    return this._service || (cds as unknown as cds.Service);
  }

  private injectPrimaryKey(payload: Partial<Entity> & { ID?: string }): Partial<Entity> {
    if ('ID' in this.entity.keys) {
      return {
        ID: payload.ID || cds.utils.uuid(),
        ...payload,
      };
    }

    return { ...payload };
  }

  async count(where: Partial<Record<keyof Entity, any>>): Promise<number> {
    const [result] = await this.service.read(this.entity).columns('count(1) as count').where(where);
    return result?.count || 0;
  }

  async find(
    where: Partial<Record<keyof Entity, any>> = {},
    orderBy?: OrderByClause<Entity>,
  ): Promise<Entity[]> {
    return this.service.read(this.entity).where(where).orderBy(this.buildOrderBy(orderBy));
  }

  async findOne(
    where: Partial<Record<keyof Entity, any>>,
    orderBy?: OrderByClause<Entity>,
  ): Promise<Entity | null> {
    const [entity] = await this.service
      .read(this.entity)
      .where(where)
      .orderBy(this.buildOrderBy(orderBy))
      .limit(1);

    return entity || null;
  }

  async create(payload: Partial<Entity>): Promise<Entity> {
    const mappedPayload = this.injectPrimaryKey(payload);

    await this.service.insert(mappedPayload).into(this.entity);

    return (await this.findOne(mappedPayload)) as Entity;
  }

  async createMany(payloads: Partial<Entity>[]): Promise<void> {
    await this.service.insert(payloads).into(this.entity);
  }

  async update(id: string, payload: Partial<Entity>): Promise<void> {
    await this.service.update(this.entity, id).with(payload);
  }

  async updateMany(payload: Partial<Entity>, where: Partial<Entity>): Promise<void> {
    await this.service.update(this.entity).with(payload).where(where);
  }

  async upsert(payloads: Partial<Entity>[]): Promise<void> {
    const mappedPayloads = payloads.map((payload) => this.injectPrimaryKey(payload));

    await this.service.upsert(mappedPayloads).into(this.entity.name);
  }

  async delete(id: string): Promise<void> {
    await this.service.delete(this.entity).where({ ID: id });
  }

  async deleteMany(where: Partial<Record<keyof Entity, any>> = {}): Promise<void> {
    await this.service.delete(this.entity).where(where);
  }

  private buildOrderBy(orderBy?: OrderByClause<Entity>): string {
    if (!orderBy) {
      return '';
    }

    return Object.entries(orderBy)
      .map(([key, order]) => `${key} ${order}`)
      .join(',');
  }
}
