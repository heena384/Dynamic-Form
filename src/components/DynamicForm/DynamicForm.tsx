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

import {
  formSchema,
  otherChargesSchema,
  productsSchema,
} from "../../schema/formSchema";
import { FieldValues, FormValues, InputFieldOption } from "./DynamicForm.types";
import InputSearch from "../InputField/InputField";
import { DynamicFormContainer } from "./DynamicForm.styles";
import Modal from "../Modal";
import ChargeFields from "./Charges";

const DynamicForm: FC = () => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(
    null
  );

  const [products, setProducts] = useState<FieldValues[]>([]);
  const [otherCharges, setOtherCharges] = useState<FieldValues[]>([]);
  const [isSaveDisable, setIsSaveDisable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await form.validateFields({ validateOnly: true });
        setSubmittable(true);
      } catch {
        setSubmittable(false);
      }
    };

    validateForm();
  }, [form, values, products, otherCharges]);

  const handleSubmit = (values: FormValues) => {
    const fullValues = { ...values, products, otherCharges };
    console.log("Submitted values:", fullValues);
    setSubmittedValues(fullValues);
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

  const renderSubmittedValues = () => {
    return (
      <div>
        {Object.entries(submittedValues || {}).map(([key, value]) => {
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
        })}

        {products?.map((product, index) => (
          <div key={product.id} style={{ marginBottom: "16px" }}>
            <strong>Product {index + 1}:</strong>
            <div style={{ marginLeft: "16px" }}>
              {Object.entries(product).map(([productKey, productValue]) => {
                const productField = productsSchema.find(
                  (f) => f.id === productKey
                );
                if (!productField) return null;

                const productLabel = productField.label || productKey;
                let formattedProductValue;

                if (productField.type === "date") {
                  const dateValue = dayjs(productValue);
                  formattedProductValue = dateValue.isValid()
                    ? dateValue.format("DD/MM/YYYY")
                    : "Invalid Date";
                } else if (productField.type === "switch") {
                  formattedProductValue = productValue ? "Yes" : "No";
                } else {
                  formattedProductValue = productValue;
                }

                return (
                  <div key={productKey} style={{ marginBottom: "4px" }}>
                    <strong>{productLabel}:</strong>
                    <span style={{ marginLeft: "8px" }}>
                      {formattedProductValue}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {otherCharges?.map((otherCharges, index) => (
          <div key={otherCharges.id} style={{ marginBottom: "16px" }}>
            <strong>otherCharges {index + 1}:</strong>
            <div style={{ marginLeft: "16px" }}>
              {Object.entries(otherCharges).map(
                ([otherChargesKey, otherChargesValue]) => {
                  const otherChargesField = otherChargesSchema.find(
                    (f) => f.id === otherChargesKey
                  );
                  if (!otherChargesField) return null;

                  const otherChargesLabel =
                    otherChargesField.label || otherChargesKey;
                  let formattedotherChargesValue;

                  if (otherChargesField.type === "date") {
                    const dateValue = dayjs(otherChargesValue);
                    formattedotherChargesValue = dateValue.isValid()
                      ? dateValue.format("DD/MM/YYYY")
                      : "Invalid Date";
                  } else if (otherChargesField.type === "switch") {
                    formattedotherChargesValue = otherChargesValue
                      ? "Yes"
                      : "No";
                  } else {
                    formattedotherChargesValue = otherChargesValue;
                  }

                  return (
                    <div key={otherChargesKey} style={{ marginBottom: "4px" }}>
                      <strong>{otherChargesLabel}:</strong>
                      <span style={{ marginLeft: "8px" }}>
                        {formattedotherChargesValue}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

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

        <Form.Item>
          <ChargeFields
            value={products}
            onChange={setProducts}
            form={form}
            schema={productsSchema}
            chargeTitle="Product"
            setIsSaveDisabled={setIsSaveDisable}
          />{" "}
        </Form.Item>

        <Form.Item>
          <ChargeFields
            value={otherCharges}
            onChange={setOtherCharges}
            schema={otherChargesSchema}
            chargeTitle="Other"
            form={form}
            setIsSaveDisabled={setIsSaveDisable}
          />{" "}
        </Form.Item>
        <div className="button-row">
          <Divider />
          <Form.Item className="button-container">
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable || isSaveDisable}
            >
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
