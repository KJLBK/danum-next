import {
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';

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
        console.log(file);
        await s3.send(
            new PutObjectCommand({
                Bucket,
                Key: file.name, // 저장시 넣고 싶은 파일 이름
                Body,
                ContentType: file.type,
            })
        );

        return new Response(
            JSON.stringify({ message: 'OK' }),
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
