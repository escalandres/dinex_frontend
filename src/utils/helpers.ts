export function toCamelCase<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map((item) => toCamelCase(item)) as T;
    }

    if (obj !== null && typeof obj === "object") {
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
        result[camelKey] = toCamelCase(value);
        }
        return result as T;
    }

    return obj;
}

export function toSnakeCase<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map((item) => toSnakeCase(item)) as T;
    }

    if (obj !== null && typeof obj === "object") {
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        result[snakeKey] = toSnakeCase(value);
        }
        return result as T;
    }

    return obj;
}
