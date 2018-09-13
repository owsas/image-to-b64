import * as fs from 'fs';
import * as path from 'path';
import * as superagent from 'superagent';
import { ImageToB64 } from '../src';

describe('#fetchFromUrl', () => {
  test('should bring the body of the response', async () => {
    const expected = {
      body: 'test',
    };

    const spy = jest.spyOn(superagent, 'get');
    spy.mockImplementationOnce(async () => expected);

    const response = await ImageToB64.fetchFromUrl('testurl');
    expect(response).toEqual(expected.body);
  });
});

describe('#toBase64OnlyData', () => {
  test('should return a string in base 64', () => {
    const buffer = fs.readFileSync(path.join(__dirname, 'image.jpeg'));
    expect(ImageToB64.toBase64OnlyData(buffer)).toEqual(buffer.toString('base64'));
  });
});

describe('#toBase64', () => {
  test('should return a string in base 64 data url', () => {
    const buffer = fs.readFileSync(path.join(__dirname, 'image.jpeg'));

    const result = ImageToB64.toBase64(buffer, 'jpg');

    expect(result).toEqual(`image/jpg;base64,${buffer.toString('base64')}`);
  });
});

describe('#getTypeForInput', () => {
  test('png', () => {
    expect(ImageToB64.getTypeForInput('data:image/png')).toEqual('image/png');
    expect(ImageToB64.getTypeForInput('abc.png')).toEqual('image/png');
    expect(ImageToB64.getTypeForInput('PnG')).not.toEqual('image/png');
  });

  test('jpe?g', () => {
    expect(ImageToB64.getTypeForInput('data:image/jpg')).toEqual('image/jpg');
    expect(ImageToB64.getTypeForInput('data:image/jpeg')).toEqual('image/jpg');
    expect(ImageToB64.getTypeForInput('abc.jpg')).toEqual('image/jpg');
    expect(ImageToB64.getTypeForInput('test.jpeg')).toEqual('image/jpg');
    expect(ImageToB64.getTypeForInput('JPeG')).not.toEqual('image/jpg');
  });

  test('png', () => {
    expect(ImageToB64.getTypeForInput('data:image/gif')).toEqual('image/gif');
    expect(ImageToB64.getTypeForInput('test.gif')).toEqual('image/gif');
    expect(ImageToB64.getTypeForInput('GiF')).not.toEqual('image/gif');
  });

  test('other types', () => {
    expect(ImageToB64.getTypeForInput('data:image/unknown')).toEqual('');
    expect(ImageToB64.getTypeForInput('test.doc')).toEqual('');
  });
});
