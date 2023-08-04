const userService = require('../services/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const { email, password } = req.body;
      const user_data = await userService.registration(email, password);
      return res.json(user_data);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user_data = await userService.login(email, password);
      return res.json(user_data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { id } = req.body;
      const token = await userService.logout(id);
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refresh_token } = req.body;
      const user_data = await userService.refresh(refresh_token);
      return res.json(user_data);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
