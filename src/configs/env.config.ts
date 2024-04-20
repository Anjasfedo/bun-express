import { envSchema } from "@schemas";

const ENV = envSchema.parse(process.env);

export default ENV;
