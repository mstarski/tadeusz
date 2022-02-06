export abstract class SchemaModelFactory<Schema, Model> {
  abstract fromSchema(schema: Schema): Model | Promise<Model>;
  abstract fromModel(model: Model): Schema | Promise<Schema>;
}
