import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided.' },
        { status: 400 }
      );
    }

    // 1. --- Google Drive API Authentication ---
    const serviceAccountJsonString = process.env.GDRIVE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJsonString) {
      console.error(
        'GDRIVE_SERVICE_ACCOUNT_JSON is not set in environment variables.'
      );
      return NextResponse.json(
        {
          message:
            'Server configuration error: Missing service account credentials.',
        },
        { status: 500 }
      );
    }

    let credentials;
    try {
      credentials = JSON.parse(serviceAccountJsonString);
    } catch (error) {
      console.error('Failed to parse GDRIVE_SERVICE_ACCOUNT_JSON:', error);
      return NextResponse.json(
        {
          message:
            'Server configuration error: Invalid service account JSON format.',
        },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // 2. --- Prepare file for upload ---
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const readableFileStream = Readable.from(fileBuffer);

    const folderId = process.env.GDRIVE_FOLDER_ID;
    const fileMetadata: any = {
      name: file.name,
    };
    if (folderId) {
      fileMetadata.parents = [folderId];
    }

    const media = {
      mimeType: file.type,
      body: readableFileStream,
    };

    // 3. --- Upload file to Google Drive ---
    const driveResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink, webContentLink, mimeType', // Specify fields you want in the response
    });

    if (driveResponse.status !== 200) {
      console.error(
        'Google Drive API Error - Non-200 Response:',
        driveResponse.status,
        driveResponse.statusText,
        driveResponse.data
      );
      return NextResponse.json(
        {
          message: 'Failed to upload to Google Drive.',
          details: driveResponse.data || driveResponse.statusText,
        },
        { status: driveResponse.status }
      );
    }

    // 4. --- Return success response ---
    return NextResponse.json(driveResponse.data, { status: 200 });
  } catch (error: any) {
    console.error('API Route Error:', error);

    if (error.isGaxiosError) {
      // gaxios is the HTTP client googleapis uses
      const gaxiosError = error as any;
      console.error('Google API GaxiosError Code:', gaxiosError.code);
      console.error('Google API GaxiosError Message:', gaxiosError.message);
      console.error(
        'Google API GaxiosError Errors:',
        gaxiosError.response?.data?.error
      );
      return NextResponse.json(
        {
          message: 'Google Drive API request failed.',
          details:
            gaxiosError.response?.data?.error?.message || gaxiosError.message,
          code: gaxiosError.code,
        },
        { status: gaxiosError.code || 500 }
      );
    }

    // General error
    return NextResponse.json(
      {
        message: 'An unexpected error occurred during file upload.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
