# @owsas/image-to-b64

A module to convert images to b64 that also helps fetching them from the netwrok

## Installation

```sh
npm install --save @owsas/image-to-b64
```

## Usage

```js
import { ImageToB64 } from '@owsas/image-to-b64';

async function process() {
  const photoBuffer = await ImageToB64.fetchFromUrl('https://test.com/a.png');
  const base64 = ImageToB64.toBase64(photoBuffer);
  console.log(base64); // image/png;base64,AbCDEfGH...
}

process();
```

## API
```ts

type IFileTypeResponse = 'image/png' | 'image/jpg' | 'image/gif';

export class ImageToB64 {
  /**
   * Gets the response from a GET request to an url
   * @param url
   */
  public static fetchFromUrl(url: string): Promise<Buffer>;

  /**
   * Converts a buffer to base64 only data
   * @param buffer
   */
  public static toBase64OnlyData(buffer: Buffer): string;

  /**
   * Converts a buffer a to base64 with the type in the beginning
   * Ex: `image/png;base64,ABCD..`;
   * @param buffer
   * @param encodingOrUrl
   */
  public static toBase64(buffer: Buffer, encodingOrUrl: string): string;

  /**
   * Gets the type
   * @param input
   */
  public static getTypeForInput(input: string): IFileTypeResponse | '';
}
```


## Dev mode

Clone this repo, and start adding your code in the `index.ts` file.  
When you are done, write the tests in the `index.test.ts` file. For testing, this repo works with [Jest](https://facebook.github.io/jest/).

Once you finished, you can publish your module to npm with `npm publish`. This will compile your Typescript code
and send it to npm.

Make sure to change the name of the package in `package.json`

## Dev Features
* Testing with Jest
* Linting out of the box (checks the style of your code), with TSLint
* Build, prepublish and other scripts to help you to develop
* Works with Typescript: Static typing for your JS Applications, reducing amount of runtime errors
* Coverage out of the box, thanks to Jest
* Uses deterministic module resolving, with Yarn

## Credits

Developed by Juan Camilo Guarín Peñaranda,  
Otherwise SAS, Colombia  
2017

## License 

MIT.

## Support us on Patreon
[![patreon](./repo/patreon.png)](https://patreon.com/owsas)
