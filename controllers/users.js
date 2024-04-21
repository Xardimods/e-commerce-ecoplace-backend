import { UserModel } from "../models/database/users.js"
import { RoleModel } from "../models/database/roles.js"
import { sendMail } from "../services/mail/nodemailer.js";

export class UserController {
  static async getUser(req, res) {
    res.send(req.user)
  }

  static async createUser(req, res) {
    try {
      const role = await RoleModel.getByName({ roleName: 'customer' });
      if (!role) {
        throw new Error('Rol de customer no encontrado');
      }

      // Agregar el id del rol al cuerpo de la solicitud antes de crear el usuario
      const userData = {
        ...req.body,
        role: role._id,
      };
      const userCreated = await UserModel.createUser(userData);

      const emailContext = {
        title: 'Welcome to Ecoplace!',
        userName: `${userCreated.name} ${userCreated.lastname}`,
        userEmail: userCreated.email,
        userPhone: userCreated.phone,
        userStreet: userCreated.street,
        userCity: userCreated.city,
        userCountry: userCreated.country,
        userZip: userCreated.zip,
        year: new Date().getFullYear(),
      }

      sendMail(req.body.email, "User Created", "register_account", emailContext);

      res.status(201).send(userCreated);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = await UserModel.updateUser(req.user._id, req.body)
      res.json(user);
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  static async deleteUser(req, res) {
    try {
      await UserModel.deleteUser(req.user._id);
      res.send({ message: 'User eliminated succesfull.' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  static async logInUser(req, res) {
    try {
      const { email, password } = req.body;
      const {user, roleName} = await UserModel.logInUser({ email, password })
      if (user) {
        const token = await user.generateAuthToken();
        res.status(200).json({
          message: "Login successful",
          token, // Envía el token como parte de la respuesta
          role: roleName,
          user: {
            email: user.email,
            name: user.name,
            lastname: user.lastname
          },
        });
      } else {
        res.status(400).send("Error authenticated user.");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async logOutUser(req, res) {
    try {
      await UserModel.logOutUser(req.user, req.token);
      res.status(200).send({ message: 'Logged out successfully' })
    } catch (error) {
      res.status(500).send({ message: 'Error logging out', error: error.message })
    }
  }

  static async logAuthAllUser(req, res) {
    try {
      await UserModel.logAuthAllUser(req.user);
      res.status(200).send({ message: 'All sessions have been closed successfully.' })
    } catch (error) {
      res.status(500).send({ message: 'Error closing all sessions.', error: error.message })
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching users', error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = req.params.id; // Asume que el ID viene como parámetro de la URL
      const user = await UserModel.findUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }

  static async adminUpdateUser(req, res) {
    const { id } = req.params; // Obtiene el ID del usuario desde la URL
    const updates = req.body;

    try {
      const updatedUser = await UserModel.adminUpdateUser(id, updates);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

