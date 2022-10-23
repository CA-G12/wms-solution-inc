import { SearchUser } from '../interfaces/SearchUserInterface';
import User from '../models/UserModel';

export default class UserQuery {
  getUser = ({ filter, attributes }: SearchUser) =>
    User.findOne({ where: filter, attributes: attributes, raw: true });
}
