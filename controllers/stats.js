import { Sale } from '../models/database/sales.js';
import { Order } from '../models/database/orders.js';
import { Product } from '../models/database/products.js';
import { User } from '../models/database/users.js';
import { Category } from '../models/database/categories.js';

export class StatsController{
  static async getSalesCount(req, res){
    try {
        const count = await Sale.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales count', error: error.message });
    }
  };

  static async getOrdersCount(req, res){
    try {
        const count = await Order.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders count', error: error.message });
    }
  };

  static async getProductsCount(req, res){
    try {
        const count = await Product.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products count', error: error.message });
    }
  };

  static async getUsersCount(req, res){
    try {
        const count = await User.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users count', error: error.message });
    }
  };

  static async getCategoriesCount (req, res){
    try {
        const count = await Category.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories count', error: error.message });
    }
  };
}









