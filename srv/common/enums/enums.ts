export enum HorusStatus {
  Rejected = 0,
  Failed = 1,
  Pending = 2,
  Success = 3,
}

export enum ContentType {
  JSON = 'application/json',
  FormUrlEncoded = 'application/x-www-form-urlencoded',
  MultipartFormData = 'multipart/form-data',
  TextPlain = 'text/plain',
  Xml = 'application/xml',
  Html = 'text/html',
  OctetStream = 'application/octet-stream',
  Xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

export enum Environment {
  Dev = 'LBPdev',
  Prod = 'LBPprd',
  Uat = 'LBPuat',
  Qa = 'LBPqa',
  Local = 'local',
  Unknown = 'unknown',
}

export enum ChangeType {
  ADDED = 'added',
  REMOVED = 'removed',
  MODIFIED = 'modified',
  UNCHANGED = 'unchanged',
}

export enum LengthUnit {
  MICROMETER = 'MIM',
  METER = 'M',
  CENTIMETER = 'CM',
  DECIMETER = 'DM',
  FOOT = 'FT',
  NANOMETER = 'NAM',
  YARDS = 'YD',
  INCH = 'IN',
  KILOMETER = 'KM',
  MILE = 'MI',
  MILLIMETER = 'MM',
}

export enum WeightUnit {
  OUNCE = 'OZ',
  GRAM = 'G',
  TONNE = 'TO',
  US_TON = 'TON',
  KILOGRAM = 'KG',
  KILOTONNE = 'KT',
  POUND = 'LB',
  MILLIGRAM = 'MG',
}
