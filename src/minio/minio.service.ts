import { Injectable } from '@nestjs/common';
import { Client, ItemBucketMetadata } from 'minio';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime-types';

@Injectable()
export class MinioService {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: Number(process.env.MINIO_PORT) || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = process.env.MINIO_BUCKET!;
    const fileName = `${uuid()}-${file.originalname}`;

    // Verificar si el bucket existe
    const bucketExists = await this.minioClient.bucketExists(bucket);
    if (!bucketExists) {
      await this.minioClient.makeBucket(bucket, 'us-east-1');
    }

    // Crear opciones de subida con Content-Type
    const metaData: ItemBucketMetadata = {
      'Content-Type':
        mime.lookup(file.originalname) || 'application/octet-stream',
    };

    // Subir archivo con metadatos
    await this.minioClient.putObject(
      bucket,
      fileName,
      file.buffer,
      file.buffer.length,
      metaData,
    );

    // Devolver URL pública
    return `${process.env.MINIO_PUBLIC_URL || 'http://localhost:9000'}/${bucket}/${fileName}`;
  }

  async deleteFile(bucket: string, fileName: string): Promise<void> {
    await this.minioClient.removeObject(bucket, fileName);
  }
}
