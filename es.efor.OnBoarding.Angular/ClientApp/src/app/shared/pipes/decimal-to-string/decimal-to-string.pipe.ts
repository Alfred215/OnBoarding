import { Pipe, PipeTransform } from '@angular/core';
import { ReplacePipe } from '../replace/replace.pipe';

// const SEPARATOR_DECIMAL = ',';
// const SEPARATOR_THOUSAND = '.';

@Pipe({
  name: 'decimalToString'
})
export class DecimalToStringPipe implements PipeTransform {

  constructor(
    public replacePipe: ReplacePipe,
  ) { }

  transform(
    originalText: string | number,
    minDecimals?: number,
    maxDecimals?: number,
    textIfEmpty?: string,
    divideThousands?: boolean,
    separatorDecimal = ',',
    separatorThousand = '.',
  ): string {
    if (textIfEmpty == null) { textIfEmpty = '-'; }
    if (originalText == null) { originalText = ''; }
    if (divideThousands == null) { divideThousands = false; }

    this.checkForErrors(separatorDecimal, separatorThousand);

    const isANumber = originalText != null && originalText.toString().length > 0 && !isNaN( originalText as any);

    if (isANumber) {
      let phStr: string =  originalText.toString() as any;
      let totalDecimals = this.getDecimals(phStr);
      if (maxDecimals == null) { maxDecimals = 5; }
      if (minDecimals == null) { minDecimals = 0; }
      if (minDecimals > maxDecimals) { maxDecimals = minDecimals; }

      if (totalDecimals > maxDecimals) {
        const phNum: number = parseFloat(phStr);
        phStr = phNum.toFixed(maxDecimals);
      }
      phStr = parseFloat(phStr).toString(); // Por si se queda como 490.9400, para quitar esos últimos 00
      totalDecimals = this.getDecimals(phStr);
      if (totalDecimals < minDecimals) {
        const phNum: number = parseFloat(phStr);
        phStr = phNum.toFixed(minDecimals);
      }

      phStr = this.replacePipe.transform(phStr, '.', separatorDecimal);

      if (divideThousands) { phStr = this.separateThousands(phStr, separatorDecimal, separatorThousand); }

      return phStr;
    } else {
      return textIfEmpty || '';
    }
  }

  /**
   * Gets how many decimal digits a stringified number has.
   * @param inputText The number to analyze, passed as a string: "13.12345".
   */
  private getDecimals(inputText: string) {
    let totalDecimals = 0;

    let indexOfComma = inputText.indexOf(',');
    if (indexOfComma < 0) { indexOfComma = inputText.indexOf('.'); }
    if (indexOfComma >= 0) { totalDecimals = inputText.substr(indexOfComma).length - 1; }

    return totalDecimals;
  }

  /**
   * Splits a string every 3 characters from the right (before a decimal)
   * with the given thousandSeparator.
   * @param originalString The string to be transformed
   */
  private separateThousands(originalString: string, separatorDecimal: string, separatorThousand: string) {
    const hasNegative = originalString.indexOf('-') >= 0;
    const hasPositive = originalString.indexOf('+') >= 0;

    if (hasNegative) { originalString = originalString.replace('-', ''); }
    if (hasPositive) { originalString = originalString.replace('+', ''); }

    let decimalPosition = originalString.lastIndexOf(separatorDecimal);
    if (decimalPosition < 0) { decimalPosition = originalString.length; }
    let phStr = originalString.substring(0, decimalPosition);
    // Reverse string:
    const reversed = phStr.split('').reverse().join('');
    // Separate every 3 characters. If less, group them.
    const regex = new RegExp(separatorThousand + '{1,3}', 'g')
    const thousands = reversed.match(regex).map(r => r.split('').reverse().join(''));
    // const thousands = reversed.match(/.{1,3}/g).map(r => r.split('').reverse().join(''));
    // Reverse the string groups and build them into a single string.
    phStr = thousands.reverse().join(separatorThousand);

    // Concat decimals
    if (decimalPosition < (originalString.length - 1)) {
      phStr = phStr.concat(separatorDecimal, originalString.substr(decimalPosition + 1, originalString.length));
    }

    if (hasNegative) { phStr = `-${phStr}`; }
    if (hasPositive) { phStr = `+${phStr}`; }

    return phStr;
  }

  /**
   * Validates the input string and checks for possible errors.
   * Also checks for programming errors.
   * @param originalString The string to be evaluated
   */
  private checkForErrors(separatorDecimal: string, separatorThousand: string) {
    // tslint:disable-next-line: triple-equals
    if (separatorDecimal == separatorThousand) {
      throw new Error(`Thousand separator [ ${separatorThousand} ] cannot be the same as decimal separator [ ${separatorDecimal} ]`);
    }
  }
}
