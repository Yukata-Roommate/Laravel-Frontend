/*****************************************
 * Package Module Json
 *
 * Json
 *****************************************/

/**
 * Json
 */
export class Json {
    /*----------------------------------------*
     * Length
     *----------------------------------------*/

    /**
     * get length of object
     *
     * @param {TObject} object
     * @returns {number}
     */
    public length<TObject extends object>(object: TObject): number {
        return Object.keys(object).length;
    }

    /*----------------------------------------*
     * Check
     *----------------------------------------*/

    /**
     * whether is valid json string
     *
     * @param {string} jsonString
     * @returns {boolean}
     */
    public isValid(jsonString: string): boolean {
        try {
            JSON.parse(jsonString);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * whether is valid json object
     *
     * @param {unknown} object
     * @returns {boolean}
     */
    public isValidObject(object: unknown): boolean {
        try {
            JSON.stringify(object);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * whether objects are equal
     *
     * @param {unknown} a
     * @param {unknown} b
     * @returns {boolean}
     */
    public isEqual(a: unknown, b: unknown): boolean {
        return Object.is(a, b);
    }

    /**
     * whether objects are deeply equal
     *
     * @param {unknown} a
     * @param {unknown} b
     * @returns {boolean}
     */
    public isDeepEqual(a: unknown, b: unknown): boolean {
        try {
            return this.stringify(a) === this.stringify(b);
        } catch {
            return false;
        }
    }

    /**
     * whether objects is empty
     *
     * @param {TObject} object
     * @returns {boolean}
     */
    public isEmpty<TObject extends object>(object: TObject): boolean {
        return this.length<TObject>(object) === 0;
    }

    /*----------------------------------------*
     * Parse
     *----------------------------------------*/

    /**
     * parse json string
     *
     * @param {string} jsonString
     * @returns {TObject}
     */
    public parse<TObject>(jsonString: string): TObject {
        return JSON.parse(jsonString) as TObject;
    }

    /**
     * safely parse json string
     *
     * @param {string} jsonString
     * @returns {TObject | null}
     */
    public safeParse<TObject>(jsonString: string): TObject | null {
        try {
            return this.parse<TObject>(jsonString);
        } catch (e) {
            return null;
        }
    }

    /**
     * safely parse json string with default value
     *
     * @param {string} jsonString
     * @param {TObject} defaultValue
     * @returns {TObject}
     */
    public safeParseWithDefault<TObject>(
        jsonString: string,
        defaultValue: TObject
    ): TObject {
        const parsed = this.safeParse<TObject>(jsonString);

        return parsed || defaultValue;
    }

    /*----------------------------------------*
     * Stringify
     *----------------------------------------*/

    /**
     * stringify to json string
     *
     * @param {TObject} object
     * @returns {string}
     */
    public stringify(object: unknown): string {
        return JSON.stringify(object);
    }

    /**
     * safely stringify to json string
     *
     * @param {TObject} object
     * @returns {string | null}
     */
    public safeStringify(object: unknown): string | null {
        try {
            return this.stringify(object);
        } catch (e) {
            return null;
        }
    }

    /**
     * stringify to json string with pretty formatting
     *
     * @param {TObject} object
     * @param {number} space
     * @returns {string}
     */
    public stringifyPretty(object: unknown, space: number = 2): string {
        return JSON.stringify(object, null, space);
    }

    /*----------------------------------------*
     * Clone
     *----------------------------------------*/

    /**
     * clone object
     *
     * @param {TObject} object
     * @returns {TObject}
     */
    public clone<TObject>(object: TObject): TObject {
        return Object.assign({}, object) as TObject;
    }

    /**
     * safely clone object
     *
     * @param {TObject} object
     * @returns {TObject | null}
     */
    public safeClone<TObject>(object: TObject): TObject | null {
        try {
            return this.deepClone<TObject>(object);
        } catch (e) {
            return null;
        }
    }

    /**
     * deep clone object
     *
     * @param {TObject} object
     * @returns {TObject}
     */
    public deepClone<TObject>(object: TObject): TObject {
        const jsonString = this.stringify(object);

        return this.parse<TObject>(jsonString);
    }

    /**
     * safely deep clone object
     *
     * @param {TObject} object
     * @returns {TObject | null}
     */
    public safeDeepClone<TObject>(object: TObject): TObject | null {
        const jsonString = this.safeStringify(object);

        return jsonString ? this.safeParse<TObject>(jsonString) : null;
    }

    /*----------------------------------------*
     * Foreach
     *----------------------------------------*/

    /**
     * foreach object
     *
     * @param {TObject} object
     * @param {(key: string, value: unknown, index: number) => void} callback
     * @returns {void}
     */
    public foreach<TObject extends object>(
        object: TObject,
        callback: (key: string, value: unknown, index: number) => void
    ): void {
        Object.entries(object).forEach(([key, value], index) => {
            callback(key, value, index);
        });
    }

    /**
     * foreach key
     *
     * @param {TObject} object
     * @param {(key: string, index: number) => void} callback
     * @returns {void}
     */
    public foreachKey<TObject extends object>(
        object: TObject,
        callback: (key: string, index: number) => void
    ): void {
        Object.keys(object).forEach((key, index) => {
            callback(key, index);
        });
    }

    /**
     * foreach value
     *
     * @param {TObject} object
     * @param {(value: unknown, index: number) => void} callback
     * @returns {void}
     */
    public foreachValue<TObject extends object>(
        object: TObject,
        callback: (value: unknown, index: number) => void
    ): void {
        Object.values(object).forEach((value, index) => {
            callback(value, index);
        });
    }

    /*----------------------------------------*
     * Generator
     *----------------------------------------*/

    /**
     * generator for object entries
     *
     * @param {TObject} object
     * @yields {[key: string]: unknown}
     */
    public *entries<TObject extends object>(
        object: TObject
    ): Generator<[string, unknown]> {
        for (const [key, value] of Object.entries(object)) {
            yield [key, value];
        }
    }

    /**
     * generator for object keys
     *
     * @param {TObject} object
     * @yields {string}
     */
    public *keys<TObject extends object>(object: TObject): Generator<string> {
        for (const key of Object.keys(object)) {
            yield key;
        }
    }

    /**
     * generator for object values
     *
     * @param {TObject} object
     * @yields {unknown}
     */
    public *values<TObject extends object>(
        object: TObject
    ): Generator<unknown> {
        for (const value of Object.values(object)) {
            yield value;
        }
    }

    /*----------------------------------------*
     * Static Method
     *----------------------------------------*/

    /**
     * json instance
     *
     * @type {Json}
     */
    public static readonly instance: Json = new Json();

    /*----------------------------------------*
     * Static Method: Length
     *----------------------------------------*/

    /**
     * get length of object
     *
     * @param {TObject} object
     * @returns {number}
     */
    public static length<TObject extends object>(object: TObject): number {
        return Json.instance.length<TObject>(object);
    }

    /*----------------------------------------*
     * Static Method: Check
     *----------------------------------------*/

    /**
     * whether is valid json string
     *
     * @param {string} jsonString
     * @returns {boolean}
     */
    public static isValid(jsonString: string): boolean {
        return Json.instance.isValid(jsonString);
    }

    /**
     * whether is valid json object
     *
     * @param {unknown} object
     * @returns {boolean}
     */
    public static isValidObject(object: unknown): boolean {
        return Json.instance.isValidObject(object);
    }

    /**
     * whether objects are equal
     *
     * @param {unknown} a
     * @param {unknown} b
     * @returns {boolean}
     */
    public static isEqual(a: unknown, b: unknown): boolean {
        return Json.instance.isEqual(a, b);
    }

    /**
     * whether objects are deeply equal
     *
     * @param {unknown} a
     * @param {unknown} b
     * @returns {boolean}
     */
    public static isDeepEqual(a: unknown, b: unknown): boolean {
        return Json.instance.isDeepEqual(a, b);
    }

    /**
     * whether objects is empty
     *
     * @param {TObject} object
     * @returns {boolean}
     */
    public static isEmpty<TObject extends object>(object: TObject): boolean {
        return Json.instance.isEmpty<TObject>(object);
    }

    /*----------------------------------------*
     * Static Method: Parse
     *----------------------------------------*/

    /**
     * parse json string
     *
     * @param {string} jsonString
     * @returns {TObject}
     */
    public static parse<TObject>(jsonString: string): TObject {
        return Json.instance.parse<TObject>(jsonString);
    }

    /**
     * safely parse json string
     *
     * @param {string} jsonString
     * @returns {TObject | null}
     */
    public static safeParse<TObject>(jsonString: string): TObject | null {
        return Json.instance.safeParse<TObject>(jsonString);
    }

    /**
     * safely parse json string with default value
     *
     * @param {string} jsonString
     * @param {TObject} defaultValue
     * @returns {TObject}
     */
    public static safeParseWithDefault<TObject>(
        jsonString: string,
        defaultValue: TObject
    ): TObject {
        return Json.instance.safeParseWithDefault<TObject>(
            jsonString,
            defaultValue
        );
    }

    /*----------------------------------------*
     * Static Method: Stringify
     *----------------------------------------*/

    /**
     * stringify to json string
     *
     * @param {TObject} object
     * @returns {string}
     */
    public static stringify(object: unknown): string {
        return Json.instance.stringify(object);
    }

    /**
     * safely stringify to json string
     *
     * @param {TObject} object
     * @returns {string | null}
     */
    public static safeStringify(object: unknown): string | null {
        return Json.instance.safeStringify(object);
    }

    /**
     * stringify to json string with pretty formatting
     *
     * @param {TObject} object
     * @param {number} space
     * @returns {string}
     */
    public static stringifyPretty(object: unknown, space: number = 2): string {
        return Json.instance.stringifyPretty(object, space);
    }

    /*----------------------------------------*
     * Static Method: Clone
     *----------------------------------------*/

    /**
     * clone object
     *
     * @param {TObject} object
     * @returns {TObject}
     */
    public static clone<TObject>(object: TObject): TObject {
        return Json.instance.clone<TObject>(object);
    }

    /**
     * safely clone object
     *
     * @param {TObject} object
     * @returns {TObject | null}
     */
    public static safeClone<TObject>(object: TObject): TObject | null {
        return Json.instance.safeClone<TObject>(object);
    }

    /**
     * deep clone object
     *
     * @param {TObject} object
     * @returns {TObject}
     */
    public static deepClone<TObject>(object: TObject): TObject {
        return Json.instance.deepClone<TObject>(object);
    }

    /**
     * safely deep clone object
     *
     * @param {TObject} object
     * @returns {TObject | null}
     */
    public static safeDeepClone<TObject>(object: TObject): TObject | null {
        return Json.instance.safeDeepClone<TObject>(object);
    }

    /*----------------------------------------*
     * Static Method: Foreach
     *----------------------------------------*/

    /**
     * foreach object
     *
     * @param {TObject} object
     * @param {(key: string, value: unknown, index: number) => void} callback
     * @returns {void}
     */
    public static foreach<TObject extends object>(
        object: TObject,
        callback: (key: string, value: unknown, index: number) => void
    ): void {
        Json.instance.foreach<TObject>(object, callback);
    }

    /**
     * foreach key
     *
     * @param {TObject} object
     * @param {(key: string, index: number) => void} callback
     * @returns {void}
     */
    public static foreachKey<TObject extends object>(
        object: TObject,
        callback: (key: string, index: number) => void
    ): void {
        Json.instance.foreachKey<TObject>(object, callback);
    }

    /**
     * foreach value
     *
     * @param {TObject} object
     * @param {(value: unknown, index: number) => void} callback
     * @returns {void}
     */
    public static foreachValue<TObject extends object>(
        object: TObject,
        callback: (value: unknown, index: number) => void
    ): void {
        Json.instance.foreachValue<TObject>(object, callback);
    }

    /*----------------------------------------*
     * Static Method: Generator
     *----------------------------------------*/

    /**
     * generator for object entries
     *
     * @param {TObject} object
     * @yields {[key: string]: unknown}
     */
    public static *entries<TObject extends object>(
        object: TObject
    ): Generator<[string, unknown]> {
        yield* Json.instance.entries<TObject>(object);
    }

    /**
     * generator for object keys
     *
     * @param {TObject} object
     * @yields {string}
     */
    public static *keys<TObject extends object>(
        object: TObject
    ): Generator<string> {
        yield* Json.instance.keys<TObject>(object);
    }

    /**
     * generator for object values
     *
     * @param {TObject} object
     * @yields {unknown}
     */
    public static *values<TObject extends object>(
        object: TObject
    ): Generator<unknown> {
        yield* Json.instance.values<TObject>(object);
    }
}
