export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }
  
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          listIds: [3]
        })
      });
  
      const raw = await response.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        data = { raw };
      }

      console.log('BREVO STATUS:', response.status);
      console.log('BREVO RESPONSE:', data);
  
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
  
      return res.status(200).json(data);
  
    } catch (err) {
      console.error('WAITLIST ERROR:', err);
      return res.status(500).json({
        error: err.message,
        stack: String(err)
      });
    }
  }