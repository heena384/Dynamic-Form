import React, { FC, useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Select,
  Divider,
  DatePicker,
  Switch,
} from "antd";
import dayjs from "dayjs";
import { SaveOutlined } from "@ant-design/icons";

import { formSchema } from "../../schema/formSchema";
import {
  FieldValues,
  FormValues,
  InputFieldOption,
  SelectFieldOption,
} from "./DynamicForm.types";
import InputSearch from "../InputField/InputField";
import { DynamicFormContainer } from "./DynamicForm.styles";
import Modal from "../Modal";

const DynamicForm: FC = () => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null
  );

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const handleSubmit = (values: FormValues) => {
    console.log("Submitted values:", values);
    setSubmittedValues(values);
    setShowSuccessModal(true);
  };

  const handleSelectChange = (fieldId: string, value: string | string[]) => {
    form.setFieldsValue({ [fieldId]: value });
  };

  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  const getFields = (field: FieldValues) => {
    if (field.type === "searchable" || field.type === "input") {
      const options: InputFieldOption[] = (field.options || []).filter(
        (opt): opt is InputFieldOption => "id" in opt && "name" in opt
      );

      return (
        <InputSearch
          field={field}
          options={options}
          value={form.getFieldValue(field.id)}
          onChange={(value) => form.setFieldsValue({ [field.id]: value })}
          type={field.type}
        />
      );
    } else if (field.type === "select") {
      const options: SelectFieldOption[] = (field.options || []).map(
        (opt: any) => ({
          label: opt.label || opt.name || "",
          value: opt.value || opt.name || "",
        })
      );

      return (
        <Select
          defaultValue=""
          style={{ width: "100%" }}
          options={options}
          onChange={(value) => handleSelectChange(field.id, value)}
        />
      );
    } else if (field.type === "date") {
      return (
        <DatePicker
          style={{ width: "100%" }}
          value={form.getFieldValue(field.id)}
          format="DD/MM/YYYY"
          onChange={(date) => form.setFieldsValue({ [field.id]: date })}
        />
      );
    } else if (field.type === "switch") {
      return (
        <Switch
          onChange={(checked) => form.setFieldsValue({ [field.id]: checked })}
        />
      );
    }
    return null;
  };

  return (
    <DynamicFormContainer>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          {formSchema.map((field) => (
            <Col
              span={6}
              md={6}
              sm={24}
              xs={24}
              key={field.id}
              className="field-column"
            >
              <Form.Item
                name={field.id}
                label={field.label}
                rules={[
                  {
                    required: field.required,
                    message: `${field.label} is required`,
                  },
                  ...(field.inputField === "string"
                    ? [
                        {
                          pattern: /^[A-Za-z\s@~`!@#$%^&*()_=+';:"/?><.,-]*$/,
                          message: "Field does not accept numbers",
                        },
                      ]
                    : []),
                  ...(field.inputField === "number"
                    ? [
                        {
                          pattern: /^\d+$/,
                          message: "Field accepts numbers only",
                        },
                      ]
                    : []),
                ]}
              >
                {getFields(field)}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <div className="button-row">
          <Divider />
          <Form.Item className="button-container">
            <Button type="primary" htmlType="submit" disabled={!submittable}>
              <SaveOutlined /> Save
            </Button>
            <Button style={{ marginLeft: "8px" }} htmlType="reset">
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
      {showSuccessModal && (
        <Modal
          show={showSuccessModal}
          onClose={toggleSuccessModal}
          title="Form Submitted Succesfully!"
        >
          <div>
            <h4>Submitted Values:</h4>
            <div className="values">
              {Object.entries(submittedValues || {}).map(([key, value]) => {
                const field = formSchema.find((f) => f.id === key);

                const label = field?.label || key;

                if (!field?.id) {
                  return;
                }

                let formattedValue;
                if (field?.type === "date") {
                  const dateValue = dayjs(value);
                  formattedValue = dateValue.isValid()
                    ? dateValue.format("DD/MM/YYYY")
                    : "Invalid Date";
                } else if (Array.isArray(value)) {
                  formattedValue = value.join(", ");
                } else if (field?.type === "switch") {
                  formattedValue = value ? "Yes" : "No";
                } else {
                  formattedValue = value;
                }

                return (
                  <div key={key} style={{ marginBottom: "8px" }}>
                    <strong>{label}:</strong>
                    <span style={{ marginLeft: "8px" }}>{formattedValue}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
    </DynamicFormContainer>
  );
};

export default DynamicForm;
