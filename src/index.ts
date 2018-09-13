import * as superagent from 'superagent';

type IFileTypeResponse = 'image/png' | 'image/jpg' | 'image/gif';

export class ImageToB64 {
  /**
   * Gets the response from a GET request to an url
   * @param url
   */
  public static fetchFromUrl(url: string): Promise<Buffer> {
    return superagent.get(url).then(r => r.body);
  }

  /**
   * Converts a buffer to base64 only data
   * @param buffer
   */
  public static toBase64OnlyData(buffer: Buffer): string {
    return buffer.toString('base64');
  }

  /**
   * Converts a buffer a to base64 with the type in the beginning
   * Ex: `image/png;base64,ABCD..`;
   * @param buffer
   * @param encodingOrUrl
   */
  public static toBase64(buffer: Buffer, encodingOrUrl: string): string {
    const type = ImageToB64.getTypeForInput(encodingOrUrl);
    const b64Data = ImageToB64.toBase64OnlyData(buffer);
    return `${type};base64,${b64Data}`;
  }

  /**
   * Gets the type
   * @param input
   */
  public static getTypeForInput(input: string): IFileTypeResponse | '' {
    if (/png/.test(input)) {
      return 'image/png';
    }

    if (/jpe?g/.test(input)) {
      return 'image/jpg';
    }

    if (/gif/.test(input)) {
      return 'image/gif';
    }

    return '';
  }
}
