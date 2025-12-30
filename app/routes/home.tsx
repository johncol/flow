import { Tasks } from "~/pages/tasks/tasks";
import type { Route } from "./+types/home";

const title = "Flow | Task management made simple";
const description =
  "Welcome to Flow! The task management app that makes life simpler.";

export const meta = ({}: Route.MetaArgs) => {
  return [{ title }, { name: "description", content: description }];
};

const Home = () => {
  return <Tasks />;
};
export default Home;
