import { ZodError, ZodSchema } from "zod";

export const validateSchema = <T>(data: unknown, schema: ZodSchema) => {
 try {
  schema.parse(data);
  return data as T;
 } catch (err: unknown) {
    if (err instanceof ZodError) {
        console.log(err);
    }
 }
};
