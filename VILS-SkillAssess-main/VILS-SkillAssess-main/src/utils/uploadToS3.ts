export const uploadFileToS3 = async ({
    file,
    url,
    fields,
    type,
    objectName,
}: {
    file: Blob;
    url: string;
    fields: {
        [key: string]: string;
    };
    type: 'AUDIO' | 'VIDEO';
    objectName: string;
}) => {
    const formData = new FormData();

    // Append fields to the form data
    for (const key in fields) {
        formData.append(key, fields[key]);
    }

    // Append the file to the form data
    formData.append('file', file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        const bucketName = type === 'AUDIO' ? 'studentpro-audio' : 'studentpro-video';
        if (response.status === 204) {
            const objectUrl = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${objectName}`;
            return objectUrl;
        } else {
            console.log(response.status);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
