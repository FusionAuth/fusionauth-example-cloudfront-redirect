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
                'location': { "value": 'https://www.example.com/us' },
              },
            };
        } else if (country === 'GB') {
            return {
              statusCode: 302,
              statusDescription: 'Found',
              headers: {
                'location': { "value": 'https://www.example.com/gb' },
              },
            };
        } else {
            return {
              statusCode: 302,
              statusDescription: 'Not Found',
              headers: {
                'location': { "value": 'https://www.example.com' },
              },
            };
        }
    }
    catch(err) {
        return {
          statusCode: 302,
          statusDescription: 'cloudfront-viewer-country - Not Found',
          headers: {
            'location': { "value": 'https://www.example.com' },
          },
        };
    }
}