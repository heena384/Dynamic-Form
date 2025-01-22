import React, { FC, useEffect, useState } from "react";
import { Form, Button, Row, Col, Select, Divider } from "antd";

import { formSchema } from "../../schema/formSchema";
import {
  FieldValues,
  FormValues,
  InputFieldOption,
  SelectFieldOption,
} from "./DynamicForm.types";
import InputSearch from "../InputField/InputField";
import { DynamicFormContainer } from "./DynamicForm.styles";
import { SaveOutlined } from "@ant-design/icons";
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
          style={{ width: 200 }}
          options={options}
          onChange={(value) => handleSelectChange(field.id, value)}
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
                          pattern: /^[A-Z@~`!@#$%^&*()_=+';:"/?><.,-]*$/i,
                          message: "Field does not accept numbers",
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
              {Object.entries(submittedValues || {}).map(([key, value]) => (
                <div key={key} style={{ marginBottom: "8px" }}>
                  <strong>{key}:</strong>
                  <span style={{ marginLeft: "8px" }}>
                    {JSON.stringify(value, null, 2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </DynamicFormContainer>
  );
};

export default DynamicForm;
