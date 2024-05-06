module.exports = {
  inputs: {
    email: {
      type: 'string',
      required: true,
    },
    displayName: {
      type: 'string',
    },
  },

  async fn(inputs) {
    const email = inputs.email.toLowerCase();
    let user = await sails.helpers.users.getOne({ ssoGoogleEmail: email });
    // Default SSO login
    if (user) {
      return user;
    }
    user = await sails.helpers.users.getOne({ email });
    // First time SSO login
    if (user) {
      const updatedValues = {
        ssoGoogleEmail: email,
      };
      user = await sails.helpers.users.updateOne(user, updatedValues, {}); // TODO: {} - needed for updateOne - fix it

      return user;
    }
    // Register new user

    const newValues = {
      email,
      ssoGoogleEmail: email,
      name: inputs.displayName || email.split('@')[0],
    };
    user = await sails.helpers.users.createOne(newValues).intercept('emailAlreadyInUse', 'emailAlreadyInUse');

    if (user) {
      return user;
    }
    return null;
  },
};
