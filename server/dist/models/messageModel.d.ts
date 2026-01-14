import mongoose from "mongoose";
export interface IMessage {
    senderId: mongoose.Types.ObjectId | string;
    receiverId: mongoose.Types.ObjectId | string;
    message: string;
}
export declare const Message: mongoose.Model<IMessage, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IMessage, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<IMessage, mongoose.Model<IMessage, any, any, any, mongoose.Document<unknown, any, IMessage, any, mongoose.DefaultSchemaOptions> & IMessage & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, IMessage>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IMessage, mongoose.Document<unknown, {}, IMessage, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    senderId?: mongoose.SchemaDefinitionProperty<string | mongoose.Types.ObjectId, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    receiverId?: mongoose.SchemaDefinitionProperty<string | mongoose.Types.ObjectId, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    message?: mongoose.SchemaDefinitionProperty<string, IMessage, mongoose.Document<unknown, {}, IMessage, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<IMessage & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IMessage>, IMessage>;
//# sourceMappingURL=messageModel.d.ts.map