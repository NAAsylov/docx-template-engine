require('dotenv').config();

const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');
const UserDto = require('../dtos/user-dto');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует.`);
    }

    const hash_password = await bcrypt.hash(password, 4);

    const user = await UserModel.create({
      email,
      password: hash_password,
    });

    const userDto = new UserDto(user);
    const tokens = this.generateTokens({ ...userDto });

    await user.update({ ...tokens });

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }

    const is_pass_equals = await bcrypt.compare(password, user.password);
    if (!is_pass_equals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = this.generateTokens({ ...userDto });

    await UserModel.update({ ...tokens }, { where: { id: userDto.id } });

    return { ...tokens, user: userDto };
  }

  async logout(user_id) {
    const user = UserModel.findOne({ where: { id: user_id } });

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким id не найден');
    }

    await UserModel.update({ access_token: null, refresh_token: null }, { where: { id: user_id } });

    return { access_token: null, refresh_token: null };
  }

  async refresh(refresh_token) {
    if (!refresh_token) {
      throw ApiError.UnauthorizedError();
    }

    const user_data = this.validateRefreshToken(refresh_token);
    const token_from_db = UserModel.findOne({ where: { refresh_token } });
    if (!user_data || !token_from_db) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findOne({ where: { id: user_data.id } });
    const userDto = new UserDto(user);
    const tokens = this.generateTokens({ ...userDto });

    user.update({ ...tokens });

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    return await UserModel.findAll();
  }

  generateTokens(payload) {
    return {
      access_token: jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }),
      refresh_token: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES }),
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      console.error('Error validateAccessToken', error);

      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      console.error('Error validateRefreshToken', error);

      return null;
    }
  }
}

module.exports = new UserService();
