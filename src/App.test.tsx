import "regenerator-runtime/runtime";
import { render, screen } from "@testing-library/react";
import * as services from "./services/GithubRepoService";
import App from "./App";

jest.mock("./services/GithubRepoService");

describe("App:", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it("renders without crashing", async () => {
    const mResult = [
      {
        id: 1,
        node_id: "MDEwOlJlcG9zaXRvcnkx",
        name: "grit",
        full_name: "mojombo/grit",
        private: false,
        owner: {
          login: "mojombo",
          id: 1,
          node_id: "MDQ6VXNlcjE=",
          avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/mojombo",
          html_url: "https://github.com/mojombo",
          type: "User",
          site_admin: false,
        },
        html_url: "https://github.com/mojombo/grit",
        description:
          "**Grit is no longer maintained. Check out libgit2/rugged.** Grit gives you object oriented read/write access to Git repositories via Ruby.",
        fork: false,
        url: "https://api.github.com/repos/mojombo/grit",
      },
    ];
    (services.getGithubRepo as jest.Mock).mockResolvedValue(mResult);
    render(<App />);
    const matched = await screen.findByText("https://github.com/mojombo/grit");
    expect(matched).toBeTruthy();
  });
});
