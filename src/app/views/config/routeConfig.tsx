// import { aboutMeetFormId, enterUserNameFormId } from "../lib/constants";

const routeConfig = {
  home: "/",
  setUp: "/setup",
  setUpComplete: "/setup/complete",
  signUp: "signup",
  singIn: "/signin",
  verifyEmail: "/verify",
  allMeet: "/all-meet",

  // meet: (
  //   nextPage: string = aboutMeetFormId,
  //   meetId?: string | null | undefined
  // ): string =>
  //   meetId ? `meet?page=${nextPage}&meetId=${meetId}` : `meet?page=${nextPage}`,

  // setUpStage: (
  //   nextState: string = enterUserNameFormId,
  //   token?: string | null
  // ): string => `setup?state=${nextState}&token=${token}`,
};

export default routeConfig;
