const createHttpError = require("http-errors");
const { User, Otp } = require("../user/user.model");

async function sendOtpHandler(req, res, next) {
  try {
    const { mobile } = req.body;
    let code = Math.floor(Math.random() * 99999 - 10000) + 10000;
    let user = await User.findOne({
      where: { mobile },
    });
    let otp = null;
    if (!user) {
      user = await User.create({ mobile });
      otp = await Otp.create({
        code,
        expires_in: new Date(Date.now() + 1000 * 60),
        userId: user.id,
      });
      return res.json({
        message: "OTP sent successfully",
        code,
      });
    }

    if (!otp && user) {
      otp = await Otp.findOne({ where: { userId: user?.id } });
      otp.code = code;
      otp.expires_in = new Date(Date.now() + 1000 * 60);
      await otp.save();
    } else {
      throw createHttpError(401, "User not found");
    }

    return res.json({
      message: "OTP sent successfully",
      code,
    });
  } catch (error) {
    next(error);
  }
}

async function checkOtpHandler(req, res, next) {
  try {
    const { mobile, code } = req.body;
    let user = await User.findOne({
      where: { mobile },
      include: {
        model: Otp,
        as: "otp",
      },
    });
    if (!user) {
      throw createHttpError(401, "User not found");
    }

    if (user?.otp?.code !== code) {
      throw createHttpError(401, "Invalid OTP");
    }
    if (user?.otp?.expires_in < new Date()) {
      throw createHttpError(401, "OTP expired");
    }

    return res.json({
      message: "User logged-in successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendOtpHandler,
  checkOtpHandler,
};
