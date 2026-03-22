import { ChangeType, HorusStatus } from '../enums/enums';

export type GenericHorusUpdatePayload<T> = Partial<Omit<T, 'statusCode_code'>> & {
  statusCode?: HorusStatus;
};

export type Delta<Entity> = {
  key: keyof Entity;
  changeType: ChangeType;
  oldValue: Partial<Entity>[keyof Entity];
  newValue: Partial<Entity>[keyof Entity];
};

export type SortOrder = 'DESC' | 'ASC' | 'desc' | 'asc';

export type OrderByClause<Entity> = Partial<Record<keyof Entity, SortOrder>>;
