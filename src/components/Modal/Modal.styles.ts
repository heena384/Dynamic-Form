import styled from "styled-components";
import { Modal as AntdModal } from "antd";

import { iconClose } from "../../assets/icons";

export const ModalContainer = styled(AntdModal)`
  .ant-modal-content {
    background: #fff;
    padding: 12px;
    border: 2px solid #fff;
    border-radius: 10px;

    .ant-modal-header {
      border: 0;
      text-align: center;
      font-weight: 400;
      font-size: 16px;
      color: #202c40;
    }

    .ant-modal-close {
      background: url("${iconClose}") center/1em auto no-repeat;
      position: absolute;
      right: 16.8px;
      top: 16.8px;
      opacity: 1;
      outline: none;
      z-index: 1;

      &:hover {
        color: #ff8282;
      }
      &:focus {
        box-shadow: none;
      }
    }

    .ant-modal-body {
      margin-top: 10px;
      padding-top: 0;

      .values {
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 10px;
        max-height: 410px;
        overflow-y: scroll;
      }
      .button-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        .close-btn {
          margin-top: 10px;
          display: flex;
          width: 50%;
        }
      }
    }
  }
`;
