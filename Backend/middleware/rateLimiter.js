import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit(req.ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    // ✅ Must call next() here if allowed
    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    // ✅ Ensure next() is called even if something goes wrong
    next();
  }
};

export default rateLimiter;
