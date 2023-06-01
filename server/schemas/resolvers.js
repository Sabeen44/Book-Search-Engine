const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

//he schema specifies exactly which queries and mutations are available for clients to execute.

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // check if users exist
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
};
