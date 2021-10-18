import fs from 'fs';

export default async (name, data, type, pathDir) => {
  let buffer = Buffer.from(data, 'base64');
  const localPath = `${pathDir}/${name}`;
  if (type !== 'image') {
    buffer = buffer.toString('utf8');
  }
  fs.mkdirSync(pathDir, { recursive: true });
  fs.writeFileSync(localPath, buffer);
  return localPath;
};
