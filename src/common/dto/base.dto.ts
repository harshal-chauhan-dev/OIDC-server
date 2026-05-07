import { z } from "zod";

export default class BaseDto {
  protected static schema: z.ZodTypeAny;

  static validate<T>(
    this: { schema: z.ZodType<T> },
    data: unknown
  ) {
    const result = this.schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.map(
        (err) => `${err.path.join(".")} ${err.message}`
      );

      return {
        errors,
        value: null,
      };
    }

    return {
      errors: null,
      value: result.data,
    };
  }
}