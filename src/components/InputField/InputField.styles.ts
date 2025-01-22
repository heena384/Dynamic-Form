import styled from "styled-components";

export const InputSearchContainer = styled.div`
  .ant-btn-variant-solid {
    background-color: #fff;
  }

  /* Ensure the hover on .ant-input-outlined affects the sibling .ant-input-group-addon */
  .ant-input {
    border-radius: 5px;
    border-right: 0;
    &:hover {
      border-right: 1px solid #4096ff;
    }
  }

  .ant-input-group-wrapper-status-error {
    .ant-input-group-addon {
      border: 1px solid #ff4d4f !important;
    }
  }

  .ant-input-search-button {
    border-color: #d9d9d9;
    border-left: 0;
    height: 39px;

    .anticon {
      color: #d9d9d9;
    }

    &:hover {
      background-color: #d9d9d9 !important;

      .anticon {
        color: #fff;
      }
    }
  }
`;
