import styled from "styled-components";

export const AppContainer = styled.div`
  padding: 20px 2rem;
  text-align: center;
  background-color: #f6f6f6;
  height: 100%;
  overflow-y: scroll;

  @media (max-width: 768px) {
    .app-content {
      padding-top: 30px !important;
    }
  }

  @media (max-width: 1024px) {
    .app-content {
      padding-top: 30px !important;
    }
  }
`;

export const Title = styled.h2`
  color: "#121E32";
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  text-align: left;
`;
