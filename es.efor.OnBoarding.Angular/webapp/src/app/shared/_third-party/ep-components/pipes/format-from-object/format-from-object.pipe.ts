import { Pipe, PipeTransform } from '@angular/core';
import { StringUtilities } from '../../utils/string/string.utils';
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
@Pipe({
  name: 'formatFromObject'
})
export class FormatFromObjectPipe implements PipeTransform {

  transform(dataSource: any, extractionPattern: string): string {
    return StringUtilities.formatFromObject(extractionPattern, dataSource);
  }

}
