import {
    PutObjectCommand,
    S3Client,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const CloudFrontDomain =
    process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN; // CloudFront 도메인을 환경 변수로 추가

const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId:
            process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey:
            process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

// 이미지 저장
export async function POST(req, res) {
    try {
        const formData = await req.formData();
        const file = formData.get('img');
        const Body = await file.arrayBuffer();

        // Generate a unique key for the uploaded image
        const key = `${Date.now()}_${file.name}`;

        // Upload the image to S3
        await s3.send(
            new PutObjectCommand({
                Bucket,
                Key: key, // Use the generated key
                Body,
                ContentType: file.type,
            })
        );

        // Generate a signed URL for the uploaded image from CloudFront
        const cloudFrontUrl = `https://${CloudFrontDomain}/${key}`;

        // Generate a signed URL with a long expiration time (e.g., 1 day)
        const imgUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
                Bucket,
                Key: key,
            }),
            { expiresIn: 604800 } // 7 days expiration
        );

        return new Response(
            JSON.stringify({
                message: 'OK',
                url: imgUrl, // 여전히 S3 URL의 signed URL
                cloudFrontUrl, // CloudFront URL
                key,
            }), // Send back the image URL and key
            { status: 200 }
        );
    } catch (error) {
        console.error('Error uploading image:', error);
        return new Response(
            JSON.stringify({ message: 'Error' }),
            { status: 500 }
        );
    }
}
