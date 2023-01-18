import GithubRepo from "./containers/GithubRepo";
import styled from "styled-components";

const StyledAppContainer = styled.div`
  max-height: 100vh;
`;

const App = () => {
  return (
    <StyledAppContainer>
      <GithubRepo />
    </StyledAppContainer>
  );
};

export default App;
