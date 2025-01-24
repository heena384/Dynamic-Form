import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Select,
  Divider,
  DatePicker,
  Switch,
  Input,
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
  const [totalRates, setTotalRates] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const values = Form.useWatch([], form);

  const calculateSum = useCallback((data: any[], key: string): number => {
    return data.reduce((sum, item) => {
      if (Array.isArray(item[key])) {
        return sum + calculateSum(item[key], key);
      }
      return sum + (item[key] || 0);
    }, 0);
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const productRates = calculateSum(products, "rate");
      const productTaxes = calculateSum(products, "taxes");
      const otherRates = calculateSum(otherCharges, "otherRate");
      const otherTaxes = calculateSum(otherCharges, "otherTaxes");

      setTotalRates(productRates + otherRates);
      setTotalTaxes(productTaxes + otherTaxes);
      setGrandTotal(productRates + productTaxes + otherRates + otherTaxes);
    };

    calculateTotals();
  }, [products, otherCharges, calculateSum]);

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
    const totalsField = {
      subTotal: totalRates,
      totalTaxes: totalTaxes,
      total: grandTotal,
    };
    const fullValues = { ...values, products, otherCharges, totalsField };
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
          if (
            key === "totalsField" &&
            typeof value === "object" &&
            value !== null
          ) {
            const getFieldkey = (key: string) => {
              let fieldKey = "";
              if (key == "subTotal") {
                fieldKey = "Sub Total";
              } else if (key == "totalTaxes") {
                fieldKey = "Taxes";
              } else {
                fieldKey = "Total";
              }

              return fieldKey;
            };

            return (
              <div key={key} style={{ marginBottom: "16px" }}>
                <strong>Totals:</strong>
                <div style={{ marginLeft: "16px" }}>
                  {Object.entries(value).map(([fieldKey, fieldValue]: any) => (
                    <div key={fieldKey} style={{ marginBottom: "4px" }}>
                      <strong>{getFieldkey(fieldKey)}:</strong>
                      <span style={{ marginLeft: "8px" }}>{fieldValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

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
            <strong>Other Charges {index + 1}:</strong>
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

        <Row gutter={16} className="total-fields-row">
          <Col span={8}>
            <Form.Item label="Sub Total">
              <Input
                id="subTotal"
                value={totalRates}
                readOnly
                style={{ width: "100%" }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Taxes">
              <Input
                id="totalTaxes"
                value={totalTaxes}
                readOnly
                style={{ width: "100%" }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Total">
              <Input
                id="total"
                value={grandTotal}
                readOnly
                style={{ width: "100%" }}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
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
