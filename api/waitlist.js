export default async function handler(req, res) {
  return res.status(200).json({
    hasKey: !!process.env.BREVO_API_KEY
  });
}
