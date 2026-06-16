export default async function handler(req, res) {

    const response = await fetch(
      'https://api.brevo.com/v3/account',
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY
        }
      }
    );
  
    const data = await response.text();
  
    return res.status(response.status).send(data);
  }