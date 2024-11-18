import {
    PutObjectCommand,
    S3Client,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const Bucket = process.env.AWS_BUCKET_NAME; // S3 버킷 이름
const CloudFrontDomain = process.env.CLOUDFRONT_DOMAIN; // CloudFront 도메인

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// 이미지 저장
export async function POST(req, res) {
    try {
        const formData = await req.formData();
        const file = formData.get('img');
        const Body = await file.arrayBuffer();

        // 업로드할 이미지의 고유 키 생성
        const key = `${Date.now()}_${file.name}`;

        // 이미지를 S3에 업로드
        await s3.send(
            new PutObjectCommand({
                Bucket,
                Key: key,
                Body,
                ContentType: file.type,
            }),
        );

        // CloudFront URL 생성
        const cloudFrontUrl = `https://${CloudFrontDomain}/${key}`;

        return new Response(
            JSON.stringify({
                message: 'OK',
                url: cloudFrontUrl, // CloudFront URL 반환
                key,
            }),
            { status: 200 },
        );
    } catch (error) {
        console.error('Error uploading image:', error);
        return new Response(
            JSON.stringify({ message: 'Error' }),
            { status: 500 },
        );
    }
}
