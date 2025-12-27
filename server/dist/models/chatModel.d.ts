import mongoose from "mongoose";
export interface IChat {
    participants: mongoose.Types.ObjectId[];
    messages: mongoose.Types.ObjectId[];
}
export declare const Chat: mongoose.Model<IChat, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IChat, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IChat & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IChat, mongoose.Model<IChat, any, any, any, mongoose.Document<unknown, any, IChat, any, mongoose.DefaultSchemaOptions> & IChat & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, IChat>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IChat, mongoose.Document<unknown, {}, IChat, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IChat & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    participants?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], IChat, mongoose.Document<unknown, {}, IChat, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IChat & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    messages?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], IChat, mongoose.Document<unknown, {}, IChat, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IChat & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IChat>, IChat>;
//# sourceMappingURL=chatModel.d.ts.map