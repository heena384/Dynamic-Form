import React, { FC, useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  DatePicker,
  InputNumber,
  Button,
  Select,
  Switch,
  Form,
  message,
  Checkbox,
} from "antd";
import {
  DeleteFilled,
  PlusOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import { Title } from "../../../pages/App.styles";
import { ChargesFormContainer } from "../DynamicForm.styles";

const { Option } = Select;

interface Field {
  id: string;
  label: string;
  type: string;
  options?: { id: number; name: string }[];
  required: boolean;
}

interface Charge {
  id: string;
  [key: string]: any;
}

interface ChargeFieldsProps {
  value: Charge[];
  onChange: any;
  form: any;
  chargeTitle: string;
  schema: any;
  setIsSaveDisabled: any;
}

const ChargeFields: FC<ChargeFieldsProps> = ({
  value,
  onChange,
  chargeTitle,
  schema: ChargeSchema,
  form,
  setIsSaveDisabled,
}) => {
  const schema = ChargeSchema;

  const [charges, setCharges] = useState<Charge[]>(value);
  const [isCopyChecked, setIsCopyChecked] = useState(false);

  useEffect(() => {
    if (charges.length == 0) {
      handleAdd();
    }
  }, []);

  const handleAdd = () => {
    const newCharge = { id: `${Date.now()}` };
    const updatedCharges = [...charges, newCharge];
    setCharges(updatedCharges);
    onChange(updatedCharges);
    form.validateFields({ validateOnly: true });
  };

  const handleDelete = (id: string) => {
    if (chargeTitle == "Product" && charges.length == 1) {
      message.error("At least one product charges must exist.");
      return;
    }
    const updatedCharges = charges.filter((charges) => charges.id !== id);
    setCharges(updatedCharges);
    onChange(updatedCharges);
    form.validateFields({ validateOnly: true });

    if (charges.length == 0) {
      setIsSaveDisabled(false);
    }
  };

  const handleChange = (id: string, field: string, value: any) => {
    const updatedCharges = charges.map((charges) =>
      charges.id === id ? { ...charges, [field]: value } : charges
    );
    setCharges(updatedCharges);
    onChange(updatedCharges);

    if (isCopyChecked && ["billOfLanding", "pickupDate"].includes(field)) {
      const firstCharge = updatedCharges[0];
      const syncedCharges = updatedCharges.map((charge) => ({
        ...charge,
        billOfLanding: firstCharge.billOfLanding,
        pickupDate: firstCharge.pickupDate,
      }));
      setCharges(syncedCharges);
      onChange(syncedCharges);
    }
  };

  const handleCheckboxChange = (e: any) => {
    const checked = e.target.checked;
    setIsCopyChecked(checked);

    if (checked && charges.length > 1) {
      const firstCharge = charges[0];
      const updatedCharges = charges.map((charge) => ({
        ...charge,
        billOfLanding: firstCharge.billOfLanding,
        pickupDate: firstCharge.pickupDate,
      }));

      setCharges(updatedCharges);
      onChange(updatedCharges);
    }
  };

  const renderField = (field: Field, charges: Charge) => {
    switch (field.type) {
      case "input":
        return (
          <Input
            placeholder={field.label}
            value={charges[field.id]}
            onChange={(e) => handleChange(charges.id, field.id, e.target.value)}
          />
        );
      case "searchable":
        return (
          <Select
            placeholder={field.label}
            value={charges[field.id]}
            onChange={(value) => handleChange(charges.id, field.id, value)}
            style={{ width: "100%" }}
          >
            {field.options?.map((option) => (
              <Option key={option.id} value={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
        );
      case "switch":
        return (
          <Switch
            checked={charges[field.id]}
            onChange={(checked) => handleChange(charges.id, field.id, checked)}
          />
        );
      case "date":
        return (
          <DatePicker
            style={{ width: "100%" }}
            value={charges[field.id]}
            onChange={(date) => handleChange(charges.id, field.id, date)}
          />
        );
      case "number":
        return (
          <InputNumber
            placeholder={field.label}
            value={charges[field.id]}
            onChange={(value) => handleChange(charges.id, field.id, value)}
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
            onChange={(value) => handleChange(charges.id, field.id, value)}
          />
        );
      default:
        return null;
    }
  };

  const renderChargeRow = (charges: Charge) => (
    <Row key={charges.id} gutter={16} align="middle" className="charges-row">
      {schema.map((field: any) => (
        <Form.Item
          name={[charges.id, field.id]}
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
          {" "}
          <Col key={field.id} span={4}>
            {renderField(field, charges)}
          </Col>
        </Form.Item>
      ))}
      <Col span={3}>
        <div className="button-wrapper">
          <Button
            type="dashed"
            className="action-btn"
            icon={<DeleteFilled />}
            onClick={() => handleDelete(charges.id)}
          />
          <Button
            type="dashed"
            className="action-btn"
            onClick={handleAdd}
            icon={<PlusSquareFilled />}
          ></Button>
        </div>
      </Col>
    </Row>
  );

  return (
    <ChargesFormContainer>
      <Row>
        <Col span={12}>
          <Title>{chargeTitle} charges</Title>
        </Col>
        <Col span={12} className="copy-checkbox">
          {chargeTitle == "Product" && (
            <Checkbox
              onChange={handleCheckboxChange}
              disabled={charges.length == 1}
            >
              Copy Bol and datetime
            </Checkbox>
          )}
        </Col>
      </Row>
      {charges.map(renderChargeRow)}
      {charges.length == 0 && (
        <Button
          type="dashed"
          style={{ width: "100%" }}
          onClick={handleAdd}
          icon={<PlusOutlined />}
        >
          Add {chargeTitle}
        </Button>
      )}
    </ChargesFormContainer>
  );
};

export default ChargeFields;
