import {
    PutObjectCommand,
    S3Client,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'; // Importing from the correct package

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME; // Ensure you use the NEXT_PUBLIC version for client-side access
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

        // Upload the image to S3
        await s3.send(
            new PutObjectCommand({
                Bucket,
                Key: `${Date.now()}_${file.name}`, // Store with a unique name
                Body,
                ContentType: file.type,
            })
        );

        // Generate a signed URL for the uploaded image
        const imgUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
                Bucket,
                Key: `${Date.now()}_${file.name}`,
            }),
            { expiresIn: 3600 } // 1 hour expiration
        );

        return new Response(
            JSON.stringify({ message: 'OK', url: imgUrl }), // Send back the image URL
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
