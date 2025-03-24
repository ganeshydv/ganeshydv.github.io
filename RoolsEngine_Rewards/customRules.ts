import { Rule } from "rools";

export class CustomRule extends Rule {
  badge: string;
  point: number;
  constructor(options, user?) {
    try {
      options.then = async (facts) => {

        console.log("implement your custom logic here");
        console.log("USER: ", facts.user.id);


        let userData = await user.findOne({
          where: { userId: facts.user.id },
        });
        if (userData) {
          console.log("user already exists..........");
          console.log("USER: ", userData);
        } else {
          console.log("saving user..........");
          await user.save({ userId: facts.user.id });
        }
        console.log("USER: ", facts.user.id);

        // this.badge = options.badge;
        // this.point = options.point;
        console.log("USER: ", facts.user.id, this.badge);
        console.log("USER: ", facts.user.id, this.point);
      };
    } catch (e) {
      console.log(e);
    }
    super(options);
    this.badge = options.badge;
    this.point = options.point;
  }
}
