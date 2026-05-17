type UnknownRecord = Record<string, unknown>;

export const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null;

const readByKey = (source: UnknownRecord, key: string): unknown => {
  const value = source[key];
  return value === undefined || value === null ? undefined : value;
};

export const unwrapApiPayload = <T>(raw: unknown): T => {
  if (isRecord(raw)) {
    const data = readByKey(raw, 'data');
    if (data !== undefined) return data as T;

    const output = readByKey(raw, 'output');
    if (output !== undefined) return output as T;

    const result = readByKey(raw, 'result');
    if (result !== undefined) return result as T;
  }

  return raw as T;
};

export const readApiSuccess = (raw: unknown, fallback: boolean): boolean => {
  if (!isRecord(raw)) return fallback;
  if (typeof raw.success === 'boolean') return raw.success;
  if (typeof raw.status === 'string') return raw.status.toLowerCase() === 'success';
  return fallback;
};
