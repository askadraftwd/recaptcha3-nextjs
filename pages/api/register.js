const register = async (req, res) => {
  const SECRET_KEY = 0x4AAAAAAAYXmPG032fOSHWmDUB1fambP3s;

  const { name, email, recaptchaResponse } = req.body;

  const verifyUrl = `https://challenges.cloudflare.com/turnstile/v0/siteverify=${SECRET_KEY}&response=${recaptchaResponse}`;

  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });

    const recaptchaJson = await recaptchaRes.json();

    res.status(200).json({ name, email, ...recaptchaJson });
  } catch (e) {
    res.status(400).json(e.error);
  }
};

export default register;
