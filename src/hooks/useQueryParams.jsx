import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function parseValue(value) {
    if (value === null || value === undefined) return null;

    if (value === "true") return true;
    if (value === "false") return false;

    if (!isNaN(value) && value.trim() !== "") return Number(value);

    if (value.includes(",")) {
        return value.split(",").filter(Boolean);
    }

    return value;
}

function serializeValue(value) {
    if (value === null || value === undefined) return "";

    if (Array.isArray(value)) return value.join(",");

    return String(value);
}

export function useQueryParams(defaults = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const get = useCallback(
        (key) => {
            const raw = searchParams.get(key);
            if (raw === null) return defaults[key] ?? null;
            return parseValue(raw);
        },
        [searchParams, defaults]
    );

    const getAll = useMemo(() => {
        const result = {};

        for (const key of Object.keys(defaults)) {
            result[key] = get(key);
        }

        for (const [key, value] of searchParams.entries()) {
            if (!(key in result)) {
                result[key] = parseValue(value);
            }
        }

        return result;
    }, [searchParams, get, defaults]);

    const set = useCallback(
        (key, value) => {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);

                if (value === null || value === undefined || value === "") {
                    params.delete(key);
                } else {
                    params.set(key, serializeValue(value));
                }

                return params;
            });
        },
        [setSearchParams]
    );

    const setMany = useCallback(
        (obj) => {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);

                Object.entries(obj).forEach(([key, value]) => {
                    if (value === null || value === undefined || value === "") {
                        params.delete(key);
                    } else {
                        params.set(key, serializeValue(value));
                    }
                });

                return params;
            });
        },
        [setSearchParams]
    );

    const remove = useCallback(
        (key) => {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.delete(key);
                return params;
            });
        },
        [setSearchParams]
    );

    const reset = useCallback(() => {
        setSearchParams(defaults);
    }, [setSearchParams, defaults]);

    return {
        get,
        getAll,
        set,
        setMany,
        remove,
        reset,
    };
}