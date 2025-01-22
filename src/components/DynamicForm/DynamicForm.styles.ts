import styled from "styled-components";

export const DynamicFormContainer = styled.div`
  .ant-form-item-control-input-content {
    display: flex;
  }

  .ant-form-item-explain-error,
  .ant-select-selection-item {
    text-align: left;
  }

  label {
    color: #121e32;
  }

  .ant-col {
    font-family: Arial, Helvetica, sans-serif;
  }

  .ant-divider-horizontal {
    position: absolute;
    left: 0;
    margin-top: 0;
  }

  .button-row {
    .button-container {
      padding-top: 30px;

      .ant-form-item-control-input-content {
        justify-content: flex-end;
      }
    }
  }

  @media (max-width: 1341px) and (min-width: 768px) {
    .field-column {
      max-width: 50%;

      .ant-input-search-button {
        height: 39.59px;
      }
    }
  }
`;
