// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/delete-image/route.ts

// import { NextResponse } from 'next/server';
// import cloudinary from 'cloudinary';

// // Initialize Cloudinary with your Cloud Name, API Key, and API Secret
// cloudinary.v2.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
// });

// export async function POST(req: Request) {
//   try {
//     const { public_id } = await req.json();

//     if (!public_id) {
//       return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
//     }

//     const result = await cloudinary.v2.uploader.destroy(public_id);

//     if (result.result === 'ok') {
//       return NextResponse.json({ message: 'Image deleted successfully' });
//     } else {
//       return NextResponse.json({ error: 'Failed to delete image' }, { status: 400 });
//     }
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message || 'An error occurred while deleting the image' }, { status: 500 });
//   }
// }




/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/delete-media/route.ts

import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Initialize Cloudinary with your Cloud Name, API Key, and API Secret
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { public_id, resource_type = 'image' } = await req.json();

    if (!public_id) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
    }

    const result = await cloudinary.v2.uploader.destroy(public_id, {
      resource_type,
    });

    if (result.result === 'ok') {
      return NextResponse.json({ message: 'Media deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to delete media' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An error occurred while deleting the media' },
      { status: 500 }
    );
  }
}
