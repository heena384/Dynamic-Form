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
import { FieldValues, FormValues, InputFieldOption } from "./DynamicForm.types";
import InputSearch from "../InputField/InputField";
import { DynamicFormContainer } from "./DynamicForm.styles";
import Modal from "../Modal";

const DynamicForm: FC = () => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null
  );

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

  const handleFieldChange = (fieldId: string, value: any) => {
    form.setFieldsValue({ [fieldId]: value });
  };

  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  const renderField = (field: FieldValues) => {
    switch (field.type) {
      case "searchable":
      case "input":
        return (
          <InputSearch
            field={field}
            options={(field.options || []).filter(
              (opt): opt is InputFieldOption => "id" in opt && "name" in opt
            )}
            value={form.getFieldValue(field.id)}
            onChange={(value) => handleFieldChange(field.id, value)}
            type={field.type}
          />
        );
      case "select":
        return (
          <Select
            style={{ width: "100%" }}
            options={(field.options || []).map((opt: any) => ({
              label: opt.label || opt.name || "",
              value: opt.value || opt.name || "",
            }))}
            onChange={(value) => handleFieldChange(field.id, value)}
          />
        );
      case "date":
        return (
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            value={form.getFieldValue(field.id)}
            onChange={(date) => handleFieldChange(field.id, date)}
          />
        );
      case "switch":
        return (
          <Switch
            checked={form.getFieldValue(field.id)}
            onChange={(checked) => handleFieldChange(field.id, checked)}
          />
        );
      default:
        return null;
    }
  };

  const renderSubmittedValues = () =>
    Object.entries(submittedValues || {}).map(([key, value]) => {
      const field = formSchema.find((f) => f.id === key);
      if (!field?.id) return null;

      const label = field.label || key;
      let formattedValue;

      if (field.type === "date") {
        const dateValue = dayjs(value);
        formattedValue = dateValue.isValid()
          ? dateValue.format("DD/MM/YYYY")
          : "Invalid Date";
      } else if (Array.isArray(value)) {
        formattedValue = value.join(", ");
      } else if (field.type === "switch") {
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
    });

  return (
    <DynamicFormContainer>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          {formSchema.map((field) => (
            <Col
              key={field.id}
              span={6}
              md={6}
              sm={24}
              xs={24}
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
                {renderField(field)}
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
          title="Form Submitted Successfully!"
        >
          <div>
            <h4>Submitted Values:</h4>
            <div className="values">{renderSubmittedValues()}</div>
          </div>
        </Modal>
      )}
    </DynamicFormContainer>
  );
};

export default DynamicForm;
