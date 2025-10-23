import SchemaBuilder from "../../graphql/builder";
import * as userRepository from "./userRepository";

const augmentSchema = (builder: typeof SchemaBuilder) => {
  const UserRef = builder.prismaObject("User", {
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
      email: t.exposeString("email"),
      bankAccount: t.exposeString("bankAccount"),
      paidExpenses: t.relation("paidExpenses"),
      participatedExpenses: t.relation("participatedExpenses"),
      transfersOut: t.relation("transfersOut"),
      transfersIn: t.relation("transfersIn"),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      user: t.field({
        type: UserRef,
        args: {
          id: t.arg.int({ required: true }),
        },
        resolve: async (_root, args, _ctx, _info) => {
          return userRepository.getUser(args.id as number);
        },
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      createUser: t.field({
        type: UserRef,
        args: {
          name: t.arg.string({ required: true }),
          email: t.arg.string({ required: true }),
          bankAccount: t.arg.string({ required: false }),
        },
        resolve: async (_parent, args, _context, _info) => {
          const { name, email, bankAccount } = args;
          return userRepository.createUser({
            name,
            email,
            bankAccount: bankAccount ?? undefined,
          });
        },
      }),
    }),
  });
};

export default augmentSchema;
