async function handler(event) {
    const request = event.request;
    const headers = request.headers;
    
    try {
        const country = headers['cloudfront-viewer-country'].value;
    
        if (country === 'US') {
            return {
              statusCode: 302,
              statusDescription: 'Found',
              headers: {
                'location': { "value": 'https://support.fusionauth.io/admin' },
              },
            };
        } else if (country === 'GB') {
            return {
              statusCode: 302,
              statusDescription: 'Found',
              headers: {
                'location': { "value": 'https://7355-131-226-35-36.ngrok-free.app/admin' },
              },
            };
        } else {
            return {
              statusCode: 302,
              statusDescription: 'Not Found',
              headers: {
                'location': { "value": 'https://www.google.com' },
              },
            };
        }
    }
    catch(err) {
        return {
          statusCode: 302,
          statusDescription: 'cloudfront-viewer-country - Not Found',
          headers: {
            'location': { "value": 'https://www.google.com' },
          },
        };
    }
}