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

export const ChargesFormContainer = styled.div`
  .button-wrapper {
    display: flex;
    gap: 10px;

    .action-btn {
      width: 100%;
    }
  }

  .charges-row {
    margin: 0px 0px 16px 0px !important;
  }

  .ant-input-number-outlined {
    width: 100%;
  }

  .ant-col {
    padding: 0px 8px 0px 0px;
    width: 100%;
    max-width: 100%;
  }

  .ant-form-item-control-input-content {
    display: flex;
    flex-direction: column;
  }

  .ant-select-selector,
  .ant-picker-outlined,
  .ant-input {
    min-width: 200px;
  }
`;
