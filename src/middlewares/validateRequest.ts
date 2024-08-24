import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

// const validateRequest = (schema: AnyZodObject) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const parsedBody = await schema.parseAsync({
//       body: req.body,
//     });

//     req.body = parsedBody.body;

//     next();
//   });
// };
// export default validateRequest;

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    // validation check
    //if everything allright next() ->
    await schema.parseAsync({
      body: req.body,
    });

    next();
  });
};

export default validateRequest;
