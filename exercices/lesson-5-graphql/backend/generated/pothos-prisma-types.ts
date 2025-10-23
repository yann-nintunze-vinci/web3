/* eslint-disable */
import type { Prisma, User, Transfer, Expense } from "C:\\Users\\yannn\\web3\\exercices\\lesson-5-graphql\\backend\\generated\\prisma/index.js";
import type { PothosPrismaDatamodel } from "@pothos/plugin-prisma";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "paidExpenses" | "participatedExpenses" | "transfersOut" | "transfersIn";
        ListRelations: "paidExpenses" | "participatedExpenses" | "transfersOut" | "transfersIn";
        Relations: {
            paidExpenses: {
                Shape: Expense[];
                Name: "Expense";
                Nullable: false;
            };
            participatedExpenses: {
                Shape: Expense[];
                Name: "Expense";
                Nullable: false;
            };
            transfersOut: {
                Shape: Transfer[];
                Name: "Transfer";
                Nullable: false;
            };
            transfersIn: {
                Shape: Transfer[];
                Name: "Transfer";
                Nullable: false;
            };
        };
    };
    Transfer: {
        Name: "Transfer";
        Shape: Transfer;
        Include: Prisma.TransferInclude;
        Select: Prisma.TransferSelect;
        OrderBy: Prisma.TransferOrderByWithRelationInput;
        WhereUnique: Prisma.TransferWhereUniqueInput;
        Where: Prisma.TransferWhereInput;
        Create: {};
        Update: {};
        RelationName: "source" | "target";
        ListRelations: never;
        Relations: {
            source: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            target: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Expense: {
        Name: "Expense";
        Shape: Expense;
        Include: Prisma.ExpenseInclude;
        Select: Prisma.ExpenseSelect;
        OrderBy: Prisma.ExpenseOrderByWithRelationInput;
        WhereUnique: Prisma.ExpenseWhereUniqueInput;
        Where: Prisma.ExpenseWhereInput;
        Create: {};
        Update: {};
        RelationName: "payer" | "participants";
        ListRelations: "participants";
        Relations: {
            payer: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            participants: {
                Shape: User[];
                Name: "User";
                Nullable: false;
            };
        };
    };
}
export function getDatamodel(): PothosPrismaDatamodel { return JSON.parse("{\"datamodel\":{\"models\":{\"User\":{\"fields\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"name\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"email\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":true,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"bankAccount\",\"isRequired\":false,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Expense\",\"kind\":\"object\",\"name\":\"paidExpenses\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PayerExpenses\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Expense\",\"kind\":\"object\",\"name\":\"participatedExpenses\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ParticipantExpenses\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Transfer\",\"kind\":\"object\",\"name\":\"transfersOut\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserTransfersSource\",\"relationFromFields\":[],\"isUpdatedAt\":false},{\"type\":\"Transfer\",\"kind\":\"object\",\"name\":\"transfersIn\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserTransfersTarget\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Transfer\":{\"fields\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"amount\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"date\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"sourceId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"targetId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"source\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserTransfersSource\",\"relationFromFields\":[\"sourceId\"],\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"target\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"UserTransfersTarget\",\"relationFromFields\":[\"targetId\"],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]},\"Expense\":{\"fields\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"id\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":true,\"isUpdatedAt\":false},{\"type\":\"DateTime\",\"kind\":\"scalar\",\"name\":\"date\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":true,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"String\",\"kind\":\"scalar\",\"name\":\"description\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Float\",\"kind\":\"scalar\",\"name\":\"amount\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"Int\",\"kind\":\"scalar\",\"name\":\"payerId\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"payer\",\"isRequired\":true,\"isList\":false,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"PayerExpenses\",\"relationFromFields\":[\"payerId\"],\"isUpdatedAt\":false},{\"type\":\"User\",\"kind\":\"object\",\"name\":\"participants\",\"isRequired\":true,\"isList\":true,\"hasDefaultValue\":false,\"isUnique\":false,\"isId\":false,\"relationName\":\"ParticipantExpenses\",\"relationFromFields\":[],\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueIndexes\":[]}}}}"); }