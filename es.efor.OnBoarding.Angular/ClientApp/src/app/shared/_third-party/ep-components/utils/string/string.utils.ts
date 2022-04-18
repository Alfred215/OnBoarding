export class StringUtilities {
    static pad(pad: number, input: number, padLeft: boolean): string
    static pad(pad: string, input: string, padLeft: boolean): string
    static pad(pad: string | number, input: string | number, padLeft: boolean) {
        if (input == null) { return pad || ''; }
        if (pad == null) { pad = ''; }

        pad = pad.toString();
        input = input.toString();

        const joined = `${pad}${input}`;
        if (padLeft) {
            return joined.slice(-pad.length);
        } else {
            return joined.substr(0, pad.length);
        }
    }
    static padLeft(pad: string, input: string): string
    static padLeft(pad: number, input: number): string
    static padLeft(pad: string | number, input: string | number) {
        if (input == null) { return pad || ''; }
        if (pad == null) { pad = ''; }

        pad = pad.toString();
        input = input.toString();

        return StringUtilities.pad(pad, input, true);
    }
    static padRight(pad: string, input: string): string
    static padRight(pad: number, input: number): string
    static padRight(pad: string | number, input: string | number) {
        if (input == null) { return pad || ''; }
        if (pad == null) { pad = ''; }

        pad = pad.toString();
        input = input.toString();

        return StringUtilities.pad(pad, input, false);
    }
    static isNullOrUndefined(data: any) {
        return typeof (data) === 'undefined' || data == null;
    }
    static isNullOrEmpty(input: string) {
        return StringUtilities.isNullOrUndefined(input) || input.length === 0;
    }
    static isNullOrWhitespace(input: string) {
        return StringUtilities.isNullOrEmpty(input) || input.replace(/\s/g, '').length === 0;
    }
    /**
     * Formats a string with the properties of the give dataSource object.
     * @param input String to be formated with the properties of dataSource. **Case sensitive**
     * @param dataSource The object containing the data.
     * @example
     * 
     * ```typescript
     const myString = 'Hello, {username}. Your eye color is {eyes.color}';
     const myObject = { username: 'John Doe', eye: { color: 'brown', size: 'big' } };
     const result = StringUtilities.formatFromObject(myString, myObject);
     console.log(result); // ---> Hello, John Doe. Your eye color is brown.
     ```
     */
    static formatFromObject(input: string, dataSource: object) {
        if (dataSource == null || input == null || typeof (input) !== 'string' || typeof (dataSource) !== 'object') { return input; }

        let result = input;
        const matches = (input.match(/(\{[a-z0-9.-]+\})/gi) || []);

        matches.map((m) => {
            const segmentKey = m.replace('{', '').replace('}', '');
            const value = StringUtilities.formatFromObject_Crawler(dataSource, segmentKey);
            result = result.replace(m, value);
        });
        return result;
    }
    private static formatFromObject_Crawler(dataSource: { [key: string]: any }, str: string): string {
        if (dataSource == null || str == null || str === '') { return null; }

        const separatorIndex = str.indexOf('.');
        if (separatorIndex >= 0) {
            const segment = str.substr(0, separatorIndex);
            if (segment == null || segment.trim() === '') { return null; }
            const rowProperty = dataSource[segment];
            if (rowProperty == null) { return null; }
            return StringUtilities.formatFromObject_Crawler(rowProperty, str.replace(segment + '.', ''));
        }

        return dataSource[str];
    }
}